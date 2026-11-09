import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { hasAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Local Lead Desk",
  description: "A browser-local lead tracker for portfolio enquiries.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");

  return (
    <>
      <Navigation />
      <main className="section !border-t-0">
        <Container>
          <p className="terminal-text">personal_workspace / local_storage</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Lead desk</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                A private, browser-local CRM for tracking conversations, project enquiries and follow-ups.
              </p>
            </div>
            <a href="/" className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)]">
              ← View portfolio
            </a>
          </div>
          <AdminDashboard />
        </Container>
      </main>
      <Footer />
    </>
  );
}
