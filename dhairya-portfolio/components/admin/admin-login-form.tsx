"use client";

import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({ password }),
      });
      const result: { error?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.error ?? "Unable to sign in. Please try again.");
        return;
      }

      window.location.assign("/admin");
    } catch {
      setError("The sign-in service could not be reached. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 border border-[var(--border)] bg-[var(--panel)] p-6 sm:p-8">
      <label className="block">
        <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">
          Admin password
        </span>
        <input
          className="form-control"
          type="password"
          name="password"
          autoComplete="current-password"
          minLength={16}
          maxLength={1024}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your private admin password"
        />
      </label>

      {error && <p role="alert" className="mt-4 text-sm leading-6 text-red-400">{error}</p>}

      <button className="button button--primary mt-6 w-full" type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Unlock lead desk"}
      </button>
      <p className="mt-5 text-xs leading-6 text-[var(--muted)]">
        Your password is checked on the server and is never saved in browser storage.
      </p>
    </form>
  );
}
