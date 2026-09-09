import Link from "next/link";
import type { GitHubProject } from "@/types/github";
import { formatRelativeTime } from "@/lib/github";

export interface ProjectCardProps {
  project: GitHubProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card group flex min-h-full flex-col bg-[var(--background)] p-6 transition-[background-color,border-color,transform] hover:bg-[var(--panel)] sm:p-8">
      <header className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <p className="project-card__ticker terminal-text">${project.ticker}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-[var(--muted)]">
            {project.category}
          </p>
        </div>
        <span className="project-card__status flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
          <span aria-hidden="true">●</span>
          {String(index + 1).padStart(2, "0")}
        </span>
      </header>

      <p className="mt-6 max-w-xl text-[var(--muted)]">{project.description}</p>

      {project.topics.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.topics.slice(0, 6).map((topic) => (
            <li
              key={topic}
              className="border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--muted)]"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}

      <footer className="project-card__action mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
        <p className="font-mono text-xs text-[var(--muted)]">
          {project.language ? `${project.language} · ` : ""}
          Updated {formatRelativeTime(project.pushedAt)}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source -&gt;
          </a>
          {project.demoUrl ? (
            <a
              className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo -&gt;
            </a>
          ) : null}
          <Link
            className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
            href={`/projects/${project.repoName}`}
          >
            Details -&gt;
          </Link>
        </div>
      </footer>
    </article>
  );
}
