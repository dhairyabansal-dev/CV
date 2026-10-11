import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/lib/case-studies";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return { title: "Work not found" };

  return {
    title: `${study.title} — Dhairya Bansal`,
    description: study.summary,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${study.title} — Dhairya Bansal`,
      description: study.summary,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  return (
    <main>
      <section className="section">
        <Container>
          <Link
            className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
            href="/#selected-work"
          >
            &lt;- Back to selected work
          </Link>

          <header className="mt-8 border-b border-[var(--border)] pb-8">
            <p className="terminal-text">${study.code} // PRIVATE REPOSITORY</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-3 font-mono text-xs text-[var(--muted)]">
              {study.category} · {study.status}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {study.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((technology) => (
                <span
                  key={technology}
                  className="border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--muted)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </header>

          <section className="mt-10 max-w-4xl">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Overview</h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">{study.overview}</p>
          </section>

          <section className="mt-12">
            <p className="terminal-text">SYSTEM FLOW</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              How the pieces fit together
            </h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {study.flow.map((step, index) => (
                <li
                  key={step}
                  className="border border-[var(--border)] bg-[var(--panel)] p-4"
                >
                  <p className="font-mono text-xs text-[var(--accent)]">
                    STEP {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-medium text-[var(--foreground)]">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {study.sections.map((section) => (
              <section key={section.title} className="border-t border-[var(--border)] pt-5">
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-[var(--muted)]">{section.summary}</p>
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
                      <span className="font-mono text-[var(--accent)]" aria-hidden="true">&gt;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside className="mt-12 border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-6">
            <p className="terminal-text">PUBLIC DISCLOSURE</p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--muted)]">
              {study.note}
            </p>
          </aside>

          <div className="mt-10">
            <Link className="button button--secondary" href="/#selected-work">
              Back to portfolio
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
