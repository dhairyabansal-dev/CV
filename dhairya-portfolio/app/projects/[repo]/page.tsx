import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/container";
import { formatRelativeTime, fetchRepositoryReadme, getPortfolioProject } from "@/lib/github";

interface ProjectPageProps {
  params: Promise<{ repo: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { repo } = await params;
  const project = await getPortfolioProject(repo);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Dhairya Bansal`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.repoName}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { repo } = await params;
  const project = await getPortfolioProject(repo);

  if (!project) {
    notFound();
  }

  const readme = await fetchRepositoryReadme(project.repoName);

  return (
    <main>
      <section className="section">
        <Container>
          <Link
            className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
            href="/#projects"
          >
            &lt;- Back to projects
          </Link>

          <header className="mt-8 border-b border-[var(--border)] pb-8">
            <p className="terminal-text">${project.ticker}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 font-mono text-xs text-[var(--muted)]">
              {project.category}
              {project.language ? ` · ${project.language}` : ""}
              {" · "}
              Updated {formatRelativeTime(project.pushedAt)}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {project.description}
            </p>

            {project.topics.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <li
                    key={topic}
                    className="border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--muted)]"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                className="button button--primary"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              {project.demoUrl ? (
                <a
                  className="button button--secondary"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              ) : null}
            </div>
          </header>

          {readme ? (
            <article className="readme prose prose-invert mt-10 max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
            </article>
          ) : (
            <p className="mt-10 font-mono text-sm text-[var(--muted)]">
              No README available for this repository.
            </p>
          )}
        </Container>
      </section>
    </main>
  );
}
