import { portfolioData } from "@/lib/portfolio-data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
	return (
		<section id="projects" className="section projects-section">
			<Container>
				<SectionHeading
					eyebrow="Featured Projects"
					title="Systems, not assignments."
				/>

				<div className="mt-12 grid gap-px border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
					{portfolioData.projects.map((project, index) => (
						<article
							key={project.ticker}
							className="group flex min-h-full flex-col bg-[var(--background)] p-6 transition-colors hover:bg-[var(--panel)] sm:p-8"
						>
							<header className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
								<div>
									<p className="terminal-text">${project.ticker}</p>
									<h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
										{project.name}
									</h3>
								</div>
								<span className="font-mono text-xs text-[var(--muted)]">
									{String(index + 1).padStart(2, "0")}
								</span>
							</header>

							<p className="mt-6 max-w-xl text-[var(--muted)]">
								{project.description}
							</p>

							<div className="mt-8 grid gap-7 sm:grid-cols-2">
								<div>
									<h4 className="terminal-text">Highlights</h4>
									<ul className="mt-3 space-y-2 font-mono text-sm text-[var(--foreground)]">
										{project.highlights.map((highlight) => (
											<li key={highlight} className="flex gap-2">
												<span className="text-[var(--accent)]" aria-hidden="true">
													&gt;
												</span>
												<span>{highlight}</span>
											</li>
										))}
									</ul>
								</div>

								<div>
									<h4 className="terminal-text">Technologies</h4>
									<ul className="mt-3 flex flex-wrap gap-2">
										{project.technologies.map((technology) => (
											<li
												key={technology}
												className="border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--muted)]"
											>
												{technology}
											</li>
										))}
									</ul>
								</div>
							</div>

							<footer className="mt-auto pt-8">
								{project.repositoryUrl ? (
									<a
										className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]"
										href={project.repositoryUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										View Source -&gt;
									</a>
								) : (
									<p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
										Source link: not configured
									</p>
								)}
							</footer>
						</article>
					))}
				</div>
			</Container>
		</section>
	);
}
