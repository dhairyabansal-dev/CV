import type { FinancialProject } from "@/types/portfolio";
import { FinanceProjectCard } from "@/components/ui/finance-project-card";

export interface FinanceProjectsProps {
  projects?: FinancialProject[];
}

export function FinanceProjects({ projects = [] }: FinanceProjectsProps) {
  return (
    <section id="financial-projects" className="space-y-6">
      <div>
        <p className="text-sm font-medium opacity-60">FINANCE & VALUATION</p>
        <h2 className="text-3xl font-semibold">DCF & Equity Research</h2>
        <p className="mt-2 max-w-2xl opacity-70">
          Financial modelling, valuation and equity analysis projects, with the
          corresponding LinkedIn project work available directly from each card.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <FinanceProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
