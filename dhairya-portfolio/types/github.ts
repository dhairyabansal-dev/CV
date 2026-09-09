/**
 * Subset of the GitHub REST API repository shape that the portfolio
 * actually uses. Keeping this narrow (rather than typing the entire
 * GitHub response) avoids coupling the app to fields we never read.
 *
 * Reference: GET /users/{username}/repos
 */
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
  fork: boolean;
  private: boolean;
  visibility?: string;
}

/**
 * Manually authored presentation metadata for a repository. This is the
 * "curation layer" on top of GitHub — it never duplicates the repo's
 * description/content, only how it should be displayed.
 *
 * Keyed by repository name (case-insensitive) in
 * `lib/project-classification.ts`.
 */
export interface ProjectClassification {
  /** Alternate repo names this classification should also match. */
  aliases?: string[];
  /** Ticker-style code shown as $CODE, e.g. "ROY". */
  ticker?: string;
  /** Override display title instead of the humanized repo name. */
  title?: string;
  /** Override/short-form description instead of the GitHub description. */
  description?: string;
  /** Category label, e.g. "Quantitative Finance". */
  category?: string;
  /** Lower sorts first. Repos without a classification sort last. */
  priority?: number;
  /** Pin to the featured set regardless of GitHub stats. */
  featured?: boolean;
  /** Exclude entirely from the public portfolio. */
  hidden?: boolean;
}

/**
 * A GitHub repository merged with its (optional) classification —
 * this is what the UI actually renders.
 */
export interface GitHubProject {
  id: number;
  /** Raw repo name, used for routing (/projects/[repo]) and matching. */
  repoName: string;
  ticker: string;
  title: string;
  description: string;
  category: string;
  language: string | null;
  topics: string[];
  githubUrl: string;
  demoUrl: string | null;
  updatedAt: string;
  pushedAt: string;
  stars: number;
  featured: boolean;
  /** Whether this came from a live GitHub fetch or the static fallback. */
  source: "github" | "fallback";
}
