import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/lib/portfolio-data";

export function BuildLog() {
	return (
		<section id="build-log" className="section">
			<Container>
				<div className="flex flex-col gap-8 border-y border-[var(--border)] py-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12 sm:py-12">
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
			</Container>
		</section>
	);
}
