import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const principles = [
	"Learning by building",
	"Independent problem solving",
	"Financial technology",
	"Quantitative systems",
	"Software engineering",
];

export function About() {
	return (
		<section id="about" className="section">
			<Container>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] lg:gap-20">
					<div>
						<SectionHeading
							eyebrow="Operating Principle"
							title="Building at the intersection of finance and systems."
						/>
						<div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-[var(--muted)]">
							<p>
								I&apos;m currently pursuing a BBA in FinTech alongside ACCA,
								while independently building software systems and quantitative
								financial projects outside the classroom. Most of what I know
								comes from building something, hitting a wall, and working
								through it - not from a syllabus.
							</p>
							<p>
								That means solving problems independently, writing financial
								logic, and treating engineering and quantitative finance as one
								connected discipline rather than two separate tracks.
							</p>
						</div>
					</div>

					<aside
						aria-label="Operating principles"
						className="border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-6"
					>
						<p className="terminal-text">operating_principles[]</p>
						<ul className="mt-5 divide-y divide-[var(--border)]">
							{principles.map((principle, index) => (
								<li
									key={principle}
									className="flex items-center gap-4 py-3 font-mono text-sm text-[var(--foreground)] first:pt-0 last:pb-0"
								>
									<span className="text-xs text-[var(--accent)]">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span>{principle}</span>
								</li>
							))}
						</ul>
					</aside>
				</div>
			</Container>
		</section>
	);
}
