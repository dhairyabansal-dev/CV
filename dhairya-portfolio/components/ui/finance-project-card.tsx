import type { FinancialProject } from "@/types/portfolio";

export interface FinanceProjectCardProps {
  project: FinancialProject;
}

export function FinanceProjectCard({ project }: FinanceProjectCardProps) {
  return (
    <article className="rounded-2xl border p-6 space-y-4">
      <div>
        <p className="text-sm font-medium opacity-60">{project.ticker}</p>
        <h3 className="text-xl font-semibold">{project.company}</h3>
        <p className="mt-1 opacity-70">{project.title}</p>
      </div>

      {project.description && <p className="text-sm opacity-80">{project.description}</p>}

      {project.analysisAreas.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.analysisAreas.map((area) => (
            <span key={area} className="rounded-full border px-3 py-1 text-xs">
              {area}
            </span>
          ))}
        </div>
      )}

      {project.linkedinUrl && (
        <a
          href={project.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
        >
          View LinkedIn Project →
        </a>
      )}
    </article>
  );
}
