import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "CRM sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="section !border-t-0">
      <Container>
        <p className="terminal-text">private_workspace / authentication</p>
        <div className="mx-auto mt-10 max-w-lg">
          <h1 className="text-4xl font-semibold tracking-tight">CRM sign in</h1>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">This area is restricted to the portfolio administrator. Use the administrator account configured in Supabase Auth.</p>
          <AdminLoginForm />
          <Link href="/" className="mt-6 inline-block font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)]">← Return to portfolio</Link>
        </div>
      </Container>
    </main>
  );
}
