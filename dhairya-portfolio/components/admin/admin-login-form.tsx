"use client";

import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Sign-in failed.");
      window.location.assign("/admin");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to sign in.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 border border-[var(--border)] bg-[var(--panel)] p-6 sm:p-8">
      <label className="block">
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Administrator email</span>
        <input className="form-control" type="email" name="email" autoComplete="username" required maxLength={320} />
      </label>
      <label className="mt-5 block">
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-[var(--muted)]">Password</span>
        <input className="form-control" type="password" name="password" autoComplete="current-password" required minLength={8} maxLength={256} />
      </label>
      {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
      <button className="button button--primary mt-6 w-full" type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign in securely ↗"}</button>
    </form>
  );
}
