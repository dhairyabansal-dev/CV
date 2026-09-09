import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/lib/portfolio-data";
import { formatRelativeTime, getPortfolioProjects } from "@/lib/github";

const ACTIVITY_LIMIT = 4;

export async function BuildLog() {
  const { projects, isLive } = await getPortfolioProjects();
  const latest = [...projects]
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
    .slice(0, ACTIVITY_LIMIT);

  return (
    <section id="build-log" className="section">
      <Container>
        <div className="flex flex-col gap-8 border-b border-[var(--border)] pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12 sm:pb-12">
          <div>
            <SectionHeading eyebrow="Build Log" title="The work is public." />
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Projects, experiments, prototypes, and systems are continuously
              being built and improved.
            </p>
          </div>
          <a
            className="inline-flex shrink-0 items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore GitHub -&gt;
          </a>
        </div>

        {latest.length > 0 ? (
          <div className="pt-10 sm:pt-12">
            <p className="terminal-text">
              GitHub // Activity
              {!isLive ? " (cached)" : ""}
            </p>
            <ul className="mt-5 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {latest.map((project) => (
                <li key={project.id}>
                  <a
                    className="flex flex-wrap items-center justify-between gap-2 py-4 transition-colors hover:text-[var(--accent)]"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-3 font-mono text-sm">
                      <span className="text-[var(--accent)]">${project.ticker}</span>
                      <span className="text-[var(--foreground)]">
                        {project.repoName}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-[var(--muted)]">
                      updated {formatRelativeTime(project.pushedAt)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
