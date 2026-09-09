import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/lib/portfolio-data";

export function CurrentlyBuilding() {
	return (
		<section id="building" className="section">
			<Container>
				<SectionHeading
					eyebrow="Currently Building"
					title="What&apos;s on the bench right now."
					description="Not a finished skills list - this is what&apos;s actively being explored, tested, and pushed on."
				/>

				<ol className="mt-12 grid gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-5">
					{portfolioData.currentlyBuilding.map((item, index) => (
						<li
							key={item}
							className="group flex min-h-40 flex-col justify-between bg-[var(--background)] p-5 transition-colors hover:bg-[var(--panel)] sm:p-6"
						>
							<span className="font-mono text-xs text-[var(--accent)]">
								0{index + 1} / ACTIVE
							</span>
							<span className="mt-8 font-mono text-sm leading-6 text-[var(--foreground)]">
								{item}
							</span>
						</li>
					))}
				</ol>
			</Container>
		</section>
	);
}
