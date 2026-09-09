import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { getPortfolioProjects } from "@/lib/github";

export async function Projects() {
  const { projects, isLive } = await getPortfolioProjects();

  return (
    <section id="projects" className="section projects-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Systems, not assignments."
          />
          {!isLive ? (
            <p className="font-mono text-xs text-[var(--muted)]">
              GitHub is temporarily unreachable — showing cached data.
            </p>
          ) : null}
        </div>

        {projects.length > 0 ? (
          <div className="mt-12 grid gap-px border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <p className="mt-12 font-mono text-sm text-[var(--muted)]">
            No public projects to show yet.
          </p>
        )}
      </Container>
    </section>
  );
}
