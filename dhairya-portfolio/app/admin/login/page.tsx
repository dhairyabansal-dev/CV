import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Sign In",
  description: "Private sign-in for the portfolio lead desk.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <>
      <Navigation />
      <main className="section !border-t-0">
        <Container>
          <div className="mx-auto max-w-xl">
            <p className="terminal-text">personal_workspace / authentication_required</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Lead desk sign in</h1>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              This private area is available only after the server-side admin password has been configured.
            </p>
            <AdminLoginForm />
            <a href="/" className="mt-6 inline-flex font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)]">
              ← Return to portfolio
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
