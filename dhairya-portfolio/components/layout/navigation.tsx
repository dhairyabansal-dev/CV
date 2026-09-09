"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { portfolioData } from "@/lib/portfolio-data";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = [
      "home",
      ...portfolioData.navigation.map((item) => item.href.slice(1)),
    ];
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              firstEntry.boundingClientRect.top -
              secondEntry.boundingClientRect.top,
          );

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
            (() => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
            <a
              aria-current={isActive ? "location" : undefined}
              className={[
                "navigation-link shrink-0 transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)]",
                isActive ? "navigation-link--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
              );
            })()
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
