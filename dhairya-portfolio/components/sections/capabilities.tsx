import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/lib/portfolio-data";

function getCommandName(title: string) {
	const commandNames: Record<string, string> = {
		"Finance & Quant": "finance",
		"Software Engineering": "engineering",
		"Data & Intelligent Systems": "systems",
		"FinTech & Blockchain": "fintech",
	};

	return commandNames[title] ?? title.split(" ")[0].toLowerCase();
}

export function Capabilities() {
	return (
		<section id="capabilities" className="section">
			<Container>
				<SectionHeading
					eyebrow="System Capabilities"
					title="What I actually work with."
				/>

				<div className="mt-12 grid gap-4 md:grid-cols-2">
					{portfolioData.capabilities.map((category, index) => (
						<article
							key={category.title}
							className="capability-module border border-[var(--border)] bg-[var(--panel)] p-5 transition-[background-color,border-color,transform] hover:border-[var(--accent)] sm:p-6"
						>
							<header className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
								<div>
									<p className="capability-module__command font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
										${getCommandName(category.title)} --list
									</p>
									<h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
										{category.title}
									</h3>
								</div>
								<span className="font-mono text-xs text-[var(--muted)]">
									{String(index + 1).padStart(2, "0")}
								</span>
							</header>

							<ul className="mt-5 space-y-3 font-mono text-sm text-[var(--foreground)]">
								{category.capabilities.map((capability) => (
										<li key={capability} className="capability-module__skill flex gap-3">
										<span className="text-[var(--accent)]" aria-hidden="true">
											&gt;
										</span>
										<span>{capability}</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</Container>
		</section>
	);
}
