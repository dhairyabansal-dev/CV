import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Private CRM",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <main className="section !border-t-0">
      <Container>
        <p className="terminal-text">private_workspace / crm</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Portfolio CRM</h1><p className="mt-3 text-sm text-[var(--muted)]">Review incoming project enquiries and meeting requests.</p></div>
          <a href="/" className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)]">← View public portfolio</a>
        </div>
        <AdminDashboard />
      </Container>
    </main>
  );
}
