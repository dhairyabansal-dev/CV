"use client";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { portfolioData } from "@/lib/portfolio-data";
export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const ids = ["home", ...portfolioData.navigation.map((item) => item.href.slice(1))];
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: "-18% 0px -65% 0px", threshold: [0,0.25,0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]"><Container className="flex min-h-16 items-center gap-4">
    <a aria-label="Dhairya Bansal home" className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--accent)] font-mono text-xs font-semibold tracking-[0.12em] text-[var(--accent)]" href="/#home">DB</a>
    <nav aria-label="Primary navigation" className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)] sm:justify-center">
      {portfolioData.navigation.map((item) => { const id=item.href.slice(1); const active=activeSection===id; return <a aria-current={active?"location":undefined} className={["navigation-link shrink-0 transition-colors hover:text-[var(--accent)]",active?"navigation-link--active":""].filter(Boolean).join(" ")} href={item.href} key={item.href}>{item.label}</a>; })}
      <a className="navigation-link shrink-0 transition-colors hover:text-[var(--accent)]" href="/services">Services</a>
      <a className="navigation-link shrink-0 transition-colors hover:text-[var(--accent)]" href="/book">Meet / Hire</a>
    </nav>
    <a className="shrink-0 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[var(--foreground)] hover:text-[var(--accent)]" href="/book">Let&apos;s talk ↗</a>
  </Container></header>;
}
