import { cache } from "react";
import type { GitHubProject, GitHubRepository } from "@/types/github";
import { fallbackProjects, findClassification } from "@/lib/project-classification";

const GITHUB_USERNAME = "dhairyabansal-dev";
const GITHUB_API_BASE = "https://api.github.com";

/**
 * How long GitHub data is cached before Next.js revalidates it in the
 * background. GitHub changes should show up on the portfolio without a
 * redeploy, but every visitor hitting the GitHub API directly would risk
 * rate limits — this is the middle ground.
 */
const REVALIDATE_SECONDS = 30 * 60; // 30 minutes

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Optional: raises the rate limit from 60/hr (unauthenticated) to
  // 5,000/hr. Never sent to the client — this file only ever runs on
  // the server (route handlers, server components, generateMetadata).
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Fetches the user's repositories from GitHub. Never throws — callers
 * get an explicit ok/error result so the UI can fall back gracefully
 * instead of crashing the page.
 */
async function fetchRawRepositories(): Promise<
  { ok: true; repos: GitHubRepository[] } | { ok: false; error: string }
> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
      {
        headers: githubHeaders(),
        next: { revalidate: REVALIDATE_SECONDS, tags: ["github-repos"] },
      },
    );

    if (!response.ok) {
      return {
        ok: false,
        error: `GitHub API responded with ${response.status}`,
      };
    }

    const repos = (await response.json()) as GitHubRepository[];
    return { ok: true, repos };
  } catch {
    // Network error, DNS failure, GitHub outage, etc. Intentionally not
    // logging the raw error to any client-visible surface.
    return { ok: false, error: "GitHub is currently unreachable" };
  }
}

/** Humanizes a repo name into a display title, e.g. "roy---os" -> "Roy OS". */
function humanizeRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Generates a short ticker-style code from a repo name when none is configured. */
function generateTicker(name: string): string {
  const words = name.split(/[-_]+/).filter(Boolean);

  if (words.length >= 2) {
    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 4)
      .toUpperCase();
  }

  return name.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase() || "REPO";
}

function mapRepositoryToProject(repo: GitHubRepository): GitHubProject {
  const classification = findClassification(repo.name);

  return {
    id: repo.id,
    repoName: repo.name,
    ticker: classification?.ticker ?? generateTicker(repo.name),
    title: classification?.title ?? humanizeRepoName(repo.name),
    description:
      classification?.description ??
      repo.description ??
      "No description provided yet.",
    category:
      classification?.category ??
      (repo.topics[0]
        ? humanizeRepoName(repo.topics[0])
        : repo.language ?? "Software Project"),
    language: repo.language,
    topics: repo.topics,
    githubUrl: repo.html_url,
    demoUrl: repo.homepage && repo.homepage.trim() !== "" ? repo.homepage : null,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    stars: repo.stargazers_count,
    featured: classification?.featured ?? false,
    source: "github",
  };
}

function sortProjects(projects: GitHubProject[]): GitHubProject[] {
  return [...projects].sort((a, b) => {
    // Featured first, then explicit priority (lower = first), then most
    // recently pushed. Unclassified repos (no priority) sort after
    // classified ones but are still ordered by recency among themselves.
    if (a.featured !== b.featured) return a.featured ? -1 : 1;

    const aPriority = findClassification(a.repoName)?.priority ?? Number.MAX_SAFE_INTEGER;
    const bPriority = findClassification(b.repoName)?.priority ?? Number.MAX_SAFE_INTEGER;
    if (aPriority !== bPriority) return aPriority - bPriority;

    return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
  });
}

export interface PortfolioProjectsResult {
  projects: GitHubProject[];
  /** False if GitHub was unreachable and the static fallback was used. */
  isLive: boolean;
}

/**
 * The single entry point the UI should use to get the portfolio's project
 * list. Wrapped in React's `cache()` so multiple components rendering in
 * the same request (Projects section, GitHub Activity section) share one
 * underlying fetch instead of hitting the API twice per page load.
 */
export const getPortfolioProjects = cache(
  async (): Promise<PortfolioProjectsResult> => {
    const result = await fetchRawRepositories();

    if (!result.ok) {
      return { projects: sortProjects(fallbackProjects), isLive: false };
    }

    const visible = result.repos.filter((repo) => {
      if (repo.fork || repo.private) return false;
      const classification = findClassification(repo.name);
      if (classification?.hidden) return false;
      return true;
    });

    return { projects: sortProjects(visible.map(mapRepositoryToProject)), isLive: true };
  },
);

/**
 * Fetches a single repository by name, already merged with its
 * classification. Returns null if the repo doesn't exist, is private,
 * a fork, or is explicitly hidden — callers should treat that as 404.
 */
export async function getPortfolioProject(
  repoName: string,
): Promise<GitHubProject | null> {
  const { projects } = await getPortfolioProjects();
  return (
    projects.find(
      (project) => project.repoName.toLowerCase() === repoName.toLowerCase(),
    ) ?? null
  );
}

/**
 * Fetches a repository's README as raw markdown (decoded from the
 * base64 GitHub returns). Returns null on any failure — the project
 * detail page renders without a README rather than erroring out.
 */
export async function fetchRepositoryReadme(
  repoName: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      {
        headers: githubHeaders(),
        next: { revalidate: REVALIDATE_SECONDS, tags: [`github-readme-${repoName}`] },
      },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as { content: string; encoding: string };
    if (data.encoding !== "base64") return null;

    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch {
    return null;
  }
}

function pluralize(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}

/** Formats an ISO timestamp as a short relative string, e.g. "2 days ago". */
export function formatRelativeTime(isoDate: string): string {
  if (!isoDate) return "recently";

  const diffSeconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000),
  );

  if (diffSeconds < 60) return "just now";
  if (diffSeconds < 3600) return pluralize(Math.floor(diffSeconds / 60), "minute");
  if (diffSeconds < 86_400) return pluralize(Math.floor(diffSeconds / 3600), "hour");
  if (diffSeconds < 2_592_000) return pluralize(Math.floor(diffSeconds / 86_400), "day");
  if (diffSeconds < 31_536_000) return pluralize(Math.floor(diffSeconds / 2_592_000), "month");
  return pluralize(Math.floor(diffSeconds / 31_536_000), "year");
}
