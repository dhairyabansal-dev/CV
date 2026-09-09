import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/lib/portfolio-data";

export function Contact() {
	const { email, github, linkedin } = portfolioData.contact;

	return (
		<section id="contact" className="section">
			<Container>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
					<SectionHeading
						eyebrow="Contact"
						title="Let&apos;s build something difficult."
					/>

					<div className="contact-channels border border-[var(--border)] bg-[var(--panel)]">
						<div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
							<p className="terminal-text">contact_channels</p>
						</div>
						<div className="grid sm:grid-cols-3">
							<a
								className="group border-b border-[var(--border)] p-5 transition-colors hover:bg-[var(--background)] sm:border-b-0 sm:border-r sm:p-6"
								href={`mailto:${email}`}
							>
								<span className="terminal-text">Email</span>
								<span className="mt-3 block break-words font-mono text-sm text-[var(--foreground)] group-hover:text-[var(--accent)]">
									{email}
								</span>
							</a>
							<a
								className="group border-b border-[var(--border)] p-5 transition-colors hover:bg-[var(--background)] sm:border-b-0 sm:border-r sm:p-6"
								href={linkedin}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className="terminal-text">LinkedIn</span>
								<span className="mt-3 block font-mono text-sm text-[var(--foreground)] group-hover:text-[var(--accent)]">
									Connect -&gt;
								</span>
							</a>
							<a
								className="group p-5 transition-colors hover:bg-[var(--background)] sm:p-6"
								href={github}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className="terminal-text">GitHub</span>
								<span className="mt-3 block font-mono text-sm text-[var(--foreground)] group-hover:text-[var(--accent)]">
									Explore -&gt;
								</span>
							</a>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}

