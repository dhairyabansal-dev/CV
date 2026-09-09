import { Container } from "@/components/ui/container";
import { portfolioData } from "@/lib/portfolio-data";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]">
      <Container className="flex min-h-16 items-center gap-4">
        <a
          aria-label="Dhairya Bansal home"
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--accent)] font-mono text-xs font-semibold tracking-[0.12em] text-[var(--accent)]"
          href="#home"
        >
          DB
        </a>
        <nav
          aria-label="Primary navigation"
          className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)] sm:justify-center"
        >
          {portfolioData.navigation.map((item) => (
            <a
              className="shrink-0 transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="shrink-0 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
          href={portfolioData.contact.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </Container>
    </header>
  );
}
