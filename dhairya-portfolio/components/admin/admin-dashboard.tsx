"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Status = "new" | "reviewing" | "approved" | "declined" | "completed";
type Inquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organization: string | null;
  type: "service" | "meeting";
  subject: string;
  message: string;
  preferred_date: string | null;
  meeting_format: string | null;
  status: Status;
};

const statuses: Status[] = ["new", "reviewing", "approved", "declined", "completed"];

export function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/inquiries", { cache: "no-store" });
      if (response.status === 401) {
        window.location.assign("/admin/login");
        return;
      }
      const result = (await response.json()) as { inquiries?: Inquiry[]; error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to load enquiries.");
      setInquiries(result.inquiries ?? []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const visible = useMemo(
    () => filter === "all" ? inquiries : inquiries.filter((item) => item.status === filter),
    [filter, inquiries],
  );

  async function updateStatus(id: string, status: Status) {
    setUpdating(id);
    setError("");
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to update status.");
      setInquiries((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to update status.");
    } finally {
      setUpdating("");
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div><p className="terminal-text">inquiry_pipeline</p><h2 className="mt-2 text-2xl font-semibold">Enquiries <span className="font-mono text-sm text-[var(--muted)]">({inquiries.length})</span></h2></div>
        <div className="flex gap-2"><button className="button button--secondary" onClick={() => void load()} disabled={loading}>Refresh</button><button className="button button--secondary" onClick={() => void signOut()}>Sign out</button></div>
      </div>
      <div className="flex flex-wrap items-center gap-3 py-5">
        <label className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]" htmlFor="inquiry-filter">Filter</label>
        <select id="inquiry-filter" className="form-control !w-auto !min-w-40" value={filter} onChange={(event) => setFilter(event.target.value as "all" | Status)}>
          <option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <span className="text-xs text-[var(--muted)]">Latest 100 enquiries</span>
      </div>
      {error && <p role="alert" className="mb-5 border border-red-500/30 p-3 text-sm text-red-400">{error}</p>}
      {loading ? <p className="py-12 text-sm text-[var(--muted)]">Loading enquiries...</p> :
        visible.length === 0 ? <p className="border border-[var(--border)] p-8 text-sm text-[var(--muted)]">No enquiries found for this filter.</p> :
        <div className="space-y-4">{visible.map((item) => (
          <article key={item.id} className="border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="terminal-text">{item.type === "meeting" ? "MEETING REQUEST" : "PROJECT ENQUIRY"} · {new Date(item.created_at).toLocaleString()}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.subject}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.name}{item.organization ? ` · ${item.organization}` : ""} · <a className="text-[var(--accent)] hover:underline" href={`mailto:${item.email}`}>{item.email}</a></p>
              </div>
              <label className="min-w-36"><span className="sr-only">Enquiry status</span><select aria-label={`Status for ${item.subject}`} className="form-control" value={item.status} disabled={updating === item.id} onChange={(event) => void updateStatus(item.id, event.target.value as Status)}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
            </div>
            {(item.preferred_date || item.meeting_format) && <p className="mt-4 text-xs text-[var(--muted)]">Preferred date: {item.preferred_date || "Not specified"} · Format: {item.meeting_format || "Not specified"}</p>}
            <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-[var(--foreground)]">{item.message}</p>
          </article>
        ))}</div>}
    </div>
  );
}
