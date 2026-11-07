import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/lib/portfolio-data";

const services = [
  {
    number: "01",
    title: "Financial Forecasting",
    description:
      "Excel-based revenue, cost, and profitability projections built around documented assumptions and transparent formulas.",
    deliverables: ["Forecast workbook", "Assumption sheet", "Scenario review"],
  },
  {
    number: "02",
    title: "Company Valuation",
    description:
      "Company-level financial analysis and DCF valuation, with valuation assumptions, sensitivity analysis, and interpretation of model outputs.",
    deliverables: ["DCF model", "Valuation summary", "Sensitivity analysis"],
  },
  {
    number: "03",
    title: "Business & Financial Analysis",
    description:
      "Structured analysis of business performance, financial ratios, credit or operating drivers, and the implications for decisions.",
    deliverables: ["Analysis workbook", "KPI summary", "Findings & limitations"],
  },
  {
    number: "04",
    title: "Research & Reporting",
    description:
      "Clear reports that explain the research question, supporting data, analytical approach, findings, assumptions, and limitations.",
    deliverables: ["Written report", "Supporting tables", "Key findings"],
  },
];

export function FinancialResearch() {
  return (
    <section id="financial-research" className="section">
      <Container>
        <SectionHeading
          eyebrow="Finance / Excel / Business Analysis"
          title="Financial research, built from the numbers."
          description="My primary focus is financial modelling, company valuation, business analysis, and research reporting. The company studies below show the scope of my independent analysis; detailed workbooks and assumptions should be reviewed before relying on any valuation output."
        />

        <div className="mt-10 grid gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.number}
              className="bg-[var(--panel)] p-5 sm:p-6"
            >
              <p className="font-mono text-xs text-[var(--accent)]">
                {service.number} / SERVICE
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-[var(--border)] pt-4">
                {service.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex gap-2 font-mono text-xs text-[var(--foreground)]"
                  >
                    <span className="text-[var(--accent)]" aria-hidden="true">
                      &gt;
                    </span>
                    {deliverable}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="terminal-text">Selected Company Research</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Company valuation & equity analysis
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
            Independent research studies covering financial statements, valuation
            methods, scenarios, and sensitivity. Estimates depend on the
            assumptions and valuation date; they are not investment advice.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {portfolioData.financialProjects.map((project, index) => (
            <article
              key={project.id}
              className="border border-[var(--border)] bg-[var(--panel)] p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[var(--accent)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-[var(--accent)]">
                    {project.ticker}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold">
                    {project.company}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {project.title}
                  </p>
                </div>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.analysisAreas.map((area) => (
                  <span
                    key={area}
                    className="border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--foreground)]"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <p className="mt-5 border-t border-[var(--border)] pt-4 font-mono text-xs text-[var(--muted)]">
                Independent research study · assumptions and source data available for review
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border border-[var(--border)] bg-[var(--panel)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-semibold">Have a financial analysis requirement?</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Open to clearly scoped forecasting, valuation, business analysis,
              and research assignments.
            </p>
          </div>
          <a
            className="button button--primary shrink-0"
            href={`mailto:${portfolioData.contact.email}?subject=Financial%20Analysis%20Project`}
          >
            Discuss a Project
          </a>
        </div>
      </Container>
    </section>
  );
}
