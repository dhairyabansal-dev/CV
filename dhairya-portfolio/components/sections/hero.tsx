import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { portfolioData } from "@/lib/portfolio-data";

const financeModules = [
  "DCF.VALUATION()",
  "REVENUE.FORECAST()",
  "FINANCIAL.STATEMENTS()",
  "SCENARIO.ANALYSIS()",
  "CREDIT.ANALYSIS()",
  "PORTFOLIO.RISK()",
  "MARKET.DATA()",
  "EXCEL.MODEL()",
];

export function Hero() {
  const { contact, owner } = portfolioData;

  return (
    <section
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-4rem)] items-center py-20 sm:py-28"
      id="home"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-20">
          <div className="hero__content">
            <p className="terminal-text hero__label">dhairya_bansal / finance.log</p>
            <h1
              className="hero__title mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-6xl lg:text-7xl"
              id="hero-title"
            >
              {owner.name}
            </h1>
            <p className="hero__title hero__title--delay mt-5 font-mono text-sm font-medium uppercase tracking-[0.08em] text-[var(--accent)] sm:text-base">
              {owner.title}
            </p>
            <p className="hero__copy mt-8 max-w-2xl text-lg leading-8 text-[var(--foreground)] sm:text-xl">
              {owner.heroDescription}
            </p>
            <p className="hero__copy hero__copy--delay mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
              {owner.supportingDescription}
            </p>
            <div className="hero__actions mt-9 flex flex-wrap gap-3">
              <Button href="#financial-research">Explore Financial Work</Button>
              <Button href="#contact" variant="secondary">
                Discuss a Project
              </Button>
              <Button href={contact.github} variant="secondary">
                GitHub
              </Button>
            </div>
          </div>
          <aside
            aria-label="Financial analysis capabilities"
            className="hero__modules border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <p className="terminal-text">financial toolkit</p>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                research
              </span>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {financeModules.map((module) => (
                <li
                  className="hero__module border border-[var(--border)] px-3 py-2 font-mono text-xs tracking-wide text-[var(--foreground)]"
                  key={module}
                >
                  {module}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
