import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/lib/portfolio-data";

export function Education() {
	return (
		<section id="education" className="section">
			<Container>
				<SectionHeading
					eyebrow="Education"
					title="Finance, financial systems, technology."
				/>

				<div className="mt-12 grid gap-4 lg:grid-cols-2">
					{portfolioData.education.map((entry, index) => (
						<article
							key={`${entry.program}-${entry.institution}`}
							className="group border border-[var(--border)] bg-[var(--panel)] p-6 transition-colors hover:border-[var(--accent)] sm:p-8"
						>
							<header className="flex items-start justify-between gap-5 border-b border-[var(--border)] pb-5">
								<div>
									<p className="terminal-text">Program {String(index + 1).padStart(2, "0")}</p>
									<h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
										{entry.program}
									</h3>
								</div>
								<span className="shrink-0 border border-[var(--border)] px-2 py-1 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)]">
									{entry.status}
								</span>
							</header>

							<p className="mt-5 font-mono text-sm text-[var(--foreground)]">
								{entry.institution}
							</p>
							{entry.expectedGraduation ? (
								<p className="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
									Expected graduation: {entry.expectedGraduation}
								</p>
							) : null}
							<p className="mt-6 leading-7 text-[var(--muted)]">
								{entry.description}
							</p>
						</article>
					))}
				</div>
			</Container>
		</section>
	);
}
