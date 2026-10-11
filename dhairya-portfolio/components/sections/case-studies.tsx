import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { caseStudies } from "@/lib/case-studies";

export function CaseStudies() {
  return (
    <section id="selected-work" className="section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Selected Private Work"
            title="The code stays private. The engineering doesn't have to be invisible."
          />
          <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
            Product context, system design, trade-offs, and validation goals —
            without exposing proprietary repositories or sensitive configuration.
          </p>
        </div>

        <div className="mt-10 grid gap-px border border-[var(--border)] bg-[var(--border)] lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <article
              key={study.slug}
              className="flex min-h-full flex-col bg-[var(--background)] p-6 transition-colors hover:bg-[var(--panel)] sm:p-8"
            >
              <header className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
                <div>
                  <p className="terminal-text">${study.code}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                    {study.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                    {study.category}
                  </p>
                </div>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </header>

              <p className="mt-6 text-[var(--muted)]">{study.summary}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {study.stack.slice(0, 6).map((technology) => (
                  <li
                    key={technology}
                    className="border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--muted)]"
                  >
                    {technology}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                <span className="font-mono text-xs text-[var(--muted)]">
                  <span className="mr-2 text-[var(--accent)]" aria-hidden="true">●</span>
                  {study.status}
                </span>
                <Link
                  className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
                  href={`/work/${study.slug}`}
                >
                  Case study -&gt;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
