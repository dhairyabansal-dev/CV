"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type Status = "new" | "reviewing" | "approved" | "declined" | "completed";
type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  organization: string;
  type: "service" | "meeting";
  subject: string;
  message: string;
  preferredDate: string;
  meetingFormat: string;
  status: Status;
  notes: string;
};
const STORAGE_KEY = "dhairya-portfolio-local-crm-v1";
const statuses: Status[] = ["new", "reviewing", "approved", "declined", "completed"];

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setLeads(parsed.filter(isLead));
      }
    } catch { /* A corrupt local backup should not prevent the workspace opening. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads, ready]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => (filter === "all" || lead.status === filter) &&
      (!q || [lead.name, lead.email, lead.organization, lead.subject, lead.message].some((value) => value.toLowerCase().includes(q))))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [filter, leads, search]);

  const count = (status: Status) => leads.filter((lead) => lead.status === status).length;

  function addLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const lead: Lead = {
      id: crypto.randomUUID(), createdAt: new Date().toISOString(),
      name: value("name"), email: value("email"), organization: value("organization"),
      type: value("type") as Lead["type"], subject: value("subject"), message: value("message"),
      preferredDate: value("preferredDate"), meetingFormat: value("meetingFormat"),
      status: "new", notes: "",
    };
    setLeads((current) => [lead, ...current]);
    event.currentTarget.reset();
    setShowForm(false);
  }

  function update(id: string, patch: Partial<Lead>) {
    setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, ...patch } : lead));
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `portfolio-crm-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click(); URL.revokeObjectURL(url);
  }

  async function importBackup(event: FormEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!Array.isArray(parsed) || !parsed.every(isLead)) throw new Error("This backup file is not valid.");
      setLeads((current) => [...parsed, ...current.filter((lead) => !parsed.some((item: Lead) => item.id === lead.id))]);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to import backup.");
    }
    event.currentTarget.value = "";
  }

  if (!ready) return <p className="mt-10 text-sm text-[var(--muted)]">Opening your local workspace...</p>;

  return <div className="mt-10">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
      <div><p className="terminal-text">local_workspace / no_cloud_sync</p><h2 className="mt-2 text-2xl font-semibold">Lead desk <span className="font-mono text-sm text-[var(--muted)]">({leads.length})</span></h2></div>
      <div className="flex flex-wrap gap-2">
        <button className="button button--primary" onClick={() => setShowForm((value) => !value)}>+ Add lead</button>
        <button className="button button--secondary" onClick={exportBackup} disabled={!leads.length}>Export backup</button>
        <button className="button button--secondary" onClick={() => fileRef.current?.click()}>Import backup</button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={importBackup} />
      </div>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {(["new", "reviewing", "approved", "declined", "completed"] as Status[]).map((status) => <div key={status} className="border border-[var(--border)] bg-[var(--panel)] p-4"><p className="terminal-text">{status}</p><p className="mt-2 text-2xl font-semibold tabular-nums">{count(status)}</p></div>)}
    </div>

    {showForm && <form onSubmit={addLead} className="mt-7 border border-[var(--accent)]/50 bg-[var(--panel)] p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3"><h3 className="text-xl font-semibold">Create a lead</h3><button type="button" className="font-mono text-xs text-[var(--muted)]" onClick={() => setShowForm(false)}>Close</button></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Name" name="name" required /><Field label="Email" name="email" type="email" required /><Field label="Organization" name="organization" />
        <label className="block"><span className="field-label">Lead type</span><select className="form-control" name="type"><option value="service">Project enquiry</option><option value="meeting">Meeting</option></select></label>
        <Field label="Subject" name="subject" required /><Field label="Preferred date" name="preferredDate" type="date" />
      </div>
      <label className="mt-4 block"><span className="field-label">Meeting format</span><select name="meetingFormat" className="form-control"><option>No preference</option><option>Google Meet</option><option>Phone</option><option>In person</option></select></label>
      <label className="mt-4 block"><span className="field-label">Brief / context</span><textarea className="form-control" name="message" rows={4} required /></label>
      <button className="button button--primary mt-5" type="submit">Save lead locally</button>
    </form>}

    <div className="flex flex-col gap-3 py-6 sm:flex-row">
      <input className="form-control" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, company or project..." aria-label="Search leads" />
      <select className="form-control sm:!w-48" value={filter} onChange={(event) => setFilter(event.target.value as "all" | Status)} aria-label="Filter by status"><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select>
    </div>

    {visible.length === 0 ? <div className="border border-dashed border-[var(--border)] p-10 text-center"><p className="text-lg font-medium">Your lead desk is clear.</p><p className="mt-2 text-sm text-[var(--muted)]">Add a lead manually, or import a previous CRM backup. Public enquiries arrive through your email app.</p></div> :
      <div className="space-y-4">{visible.map((lead) => <article key={lead.id} className="border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0"><p className="terminal-text">{lead.type === "meeting" ? "MEETING" : "PROJECT"} · {new Date(lead.createdAt).toLocaleString()}</p><h3 className="mt-2 text-xl font-semibold">{lead.subject}</h3>
            <p className="mt-1 break-words text-sm text-[var(--muted)]">{lead.name}{lead.organization ? ` · ${lead.organization}` : ""} · <a className="text-[var(--accent)] hover:underline" href={`mailto:${encodeURIComponent(lead.email)}`}>{lead.email}</a></p>
          </div>
          <div className="flex items-center gap-2"><select className="form-control !w-auto" value={lead.status} onChange={(event) => update(lead.id, { status: event.target.value as Status })} aria-label={`Status for ${lead.subject}`}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select><button className="font-mono text-xs text-red-400 hover:underline" onClick={() => { if (window.confirm("Delete this lead from this browser?")) setLeads((current) => current.filter((item) => item.id !== lead.id)); }}>Delete</button></div>
        </div>
        {lead.message && <p className="mt-4 whitespace-pre-wrap text-sm leading-7">{lead.message}</p>}
        {(lead.preferredDate || lead.meetingFormat) && <p className="mt-3 text-xs text-[var(--muted)]">Preferred date: {lead.preferredDate || "Flexible"} · Format: {lead.meetingFormat || "Not specified"}</p>}
        <label className="mt-5 block"><span className="field-label">Internal notes (saved only in this browser)</span><textarea className="form-control" rows={2} value={lead.notes} onChange={(event) => update(lead.id, { notes: event.target.value })} placeholder="Follow-up, scope, next action..." /></label>
      </article>)}</div>}

    <p className="mt-8 border-t border-[var(--border)] pt-5 text-xs leading-6 text-[var(--muted)]">Local-only storage: leads and notes stay in this browser profile. They do not sync across devices, reach the public website, or survive clearing browser data. Export backups regularly. This page is not protected by server-side authentication; use it only on a trusted device.</p>
  </div>;
}

function isLead(value: unknown): value is Lead {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Lead>;
  return typeof item.id === "string" && typeof item.createdAt === "string" &&
    typeof item.name === "string" && typeof item.email === "string" &&
    typeof item.subject === "string" && typeof item.message === "string" &&
    ["service", "meeting"].includes(item.type ?? "") &&
    statuses.includes(item.status as Status) && typeof item.notes === "string";
}

function Field({ label, name, required, type = "text" }: { label: string; name: string; required?: boolean; type?: string }) {
  return <label className="block"><span className="field-label">{label}</span><input className="form-control" name={name} type={type} required={required} /></label>;
}
