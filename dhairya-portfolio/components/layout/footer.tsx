import { Container } from "@/components/ui/container";
import { portfolioData } from "@/lib/portfolio-data";

export function Footer() {
	const { github, linkedin } = portfolioData.contact;

	return (
		<footer className="border-t border-[var(--border)] py-6">
			<Container className="flex flex-col gap-4 font-mono text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
				<p>
					{portfolioData.owner.name} - Built with Next.js
				</p>
				<nav aria-label="Footer navigation" className="flex gap-5 uppercase tracking-[0.08em]">
					<a
						className="transition-colors hover:text-[var(--accent)]"
						href={github}
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					<a
						className="transition-colors hover:text-[var(--accent)]"
						href={linkedin}
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
				</nav>
			</Container>
		</footer>
	);
}

