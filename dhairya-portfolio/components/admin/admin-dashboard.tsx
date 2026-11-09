"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";

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
const MAX_IMPORT_BYTES = 2_000_000;
const MAX_IMPORT_LEADS = 1_000;

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setLeads(parsed.filter(isLead));
      }
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [leads, ready]);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return leads
      .filter((lead) => (filter === "all" || lead.status === filter) &&
        (!query || [lead.name, lead.email, lead.organization, lead.subject, lead.message]
          .some((value) => value.toLowerCase().includes(query))))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [filter, leads, search]);

  const count = (status: Status) => leads.filter((lead) => lead.status === status).length;

  function addLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const lead: Lead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: value("name"),
      email: value("email"),
      organization: value("organization"),
      type: value("type") as Lead["type"],
      subject: value("subject"),
      message: value("message"),
      preferredDate: value("preferredDate"),
      meetingFormat: value("meetingFormat"),
      status: "new",
      notes: "",
    };

    setLeads((current) => [lead, ...current]);
    form.reset();
    setShowForm(false);
  }

  function update(id: string, patch: Partial<Lead>) {
    setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, ...patch } : lead));
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `portfolio-crm-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
  }

  async function importBackup(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    try {
      if (file.size > MAX_IMPORT_BYTES) throw new Error("Backup files must be 2 MB or smaller.");
      const parsed: unknown = JSON.parse(await file.text());
      if (!Array.isArray(parsed) || parsed.length > MAX_IMPORT_LEADS || !parsed.every(isLead)) {
        throw new Error("This backup is invalid or contains too many records.");
      }

      setLeads((current) => {
        const importedIds = new Set(parsed.map((lead: Lead) => lead.id));
        return [...parsed, ...current.filter((lead) => !importedIds.has(lead.id))];
      });
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to import backup.");
    } finally {
      input.value = "";
    }
  }

  async function logout() {
    setLogoutError("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "DELETE",
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Sign-out failed.");
      window.location.assign("/admin/login");
    } catch {
      setLogoutError("Unable to sign out. Close this browser session and try again.");
    }
  }

  if (!ready) return <p className="mt-10 text-sm text-[var(--muted)]">Opening your local workspace...</p>;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <p className="terminal-text">local_workspace / no_cloud_sync</p>
          <h2 className="mt-2 text-2xl font-semibold">
            Lead desk <span className="font-mono text-sm text-[var(--muted)]">({leads.length})</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="button button--primary" onClick={() => setShowForm((value) => !value)}>
            + Add lead
          </button>
          <button className="button button--secondary" onClick={exportBackup} disabled={!leads.length}>
            Export backup
          </button>
          <button className="button button--secondary" onClick={() => fileRef.current?.click()}>
            Import backup
          </button>
          <button className="button button--secondary" onClick={logout}>Sign out</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={importBackup}
          />
        </div>
      </div>

      {logoutError && <p role="alert" className="mt-4 text-sm text-red-400">{logoutError}</p>}
      {storageError && (
        <p role="alert" className="mt-4 border border-red-400/40 p-4 text-sm leading-6 text-red-300">
          Browser storage is unavailable or full. Changes may not be saved; export a backup and free browser storage.
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {statuses.map((status) => (
          <div key={status} className="border border-[var(--border)] bg-[var(--panel)] p-4">
            <p className="terminal-text">{status}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{count(status)}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <form onSubmit={addLead} className="mt-7 border border-[var(--accent)]/50 bg-[var(--panel)] p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">Create a lead</h3>
            <button type="button" className="font-mono text-xs text-[var(--muted)]" onClick={() => setShowForm(false)}>
              Close
            </button>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Name" name="name" required maxLength={120} />
            <Field label="Email" name="email" type="email" required maxLength={254} />
            <Field label="Organization" name="organization" maxLength={160} />
            <label className="block">
              <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">Lead type</span>
              <select className="form-control" name="type">
                <option value="service">Project enquiry</option>
                <option value="meeting">Meeting</option>
              </select>
            </label>
            <Field label="Subject" name="subject" required maxLength={160} />
            <Field label="Preferred date" name="preferredDate" type="date" maxLength={32} />
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">Meeting format</span>
            <select name="meetingFormat" className="form-control">
              <option>No preference</option>
              <option>Google Meet</option>
              <option>Phone</option>
              <option>In person</option>
            </select>
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">Brief / context</span>
            <textarea className="form-control" name="message" rows={4} required minLength={10} maxLength={5000} />
          </label>
          <button className="button button--primary mt-5" type="submit">Save lead locally</button>
        </form>
      )}

      <div className="flex flex-col gap-3 py-6 sm:flex-row">
        <input
          className="form-control"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name, email, company or project..."
          aria-label="Search leads"
        />
        <select
          className="form-control sm:!w-48"
          value={filter}
          onChange={(event) => setFilter(event.target.value as "all" | Status)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="border border-dashed border-[var(--border)] p-10 text-center">
          <p className="text-lg font-medium">Your lead desk is clear.</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Add a lead manually, or import a previous CRM backup. Public enquiries arrive through your email app.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((lead) => (
            <article key={lead.id} className="border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="terminal-text">
                    {lead.type === "meeting" ? "MEETING" : "PROJECT"} · {new Date(lead.createdAt).toLocaleString()}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{lead.subject}</h3>
                  <p className="mt-1 break-words text-sm text-[var(--muted)]">
                    {lead.name}{lead.organization ? ` · ${lead.organization}` : ""} ·{" "}
                    <a className="text-[var(--accent)] hover:underline" href={`mailto:${lead.email}`}>
                      {lead.email}
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="form-control !w-auto"
                    value={lead.status}
                    onChange={(event) => update(lead.id, { status: event.target.value as Status })}
                    aria-label={`Status for ${lead.subject}`}
                  >
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                  <button
                    className="font-mono text-xs text-red-400 hover:underline"
                    onClick={() => {
                      if (window.confirm("Delete this lead from this browser?")) {
                        setLeads((current) => current.filter((item) => item.id !== lead.id));
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {lead.message && <p className="mt-4 whitespace-pre-wrap text-sm leading-7">{lead.message}</p>}
              {(lead.preferredDate || lead.meetingFormat) && (
                <p className="mt-3 text-xs text-[var(--muted)]">
                  Preferred date: {lead.preferredDate || "Flexible"} · Format: {lead.meetingFormat || "Not specified"}
                </p>
              )}
              <label className="mt-5 block">
                <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">
                  Internal notes (saved only in this browser)
                </span>
                <textarea
                  className="form-control"
                  rows={2}
                  value={lead.notes}
                  maxLength={5000}
                  onChange={(event) => update(lead.id, { notes: event.target.value })}
                  placeholder="Follow-up, scope, next action..."
                />
              </label>
            </article>
          ))}
        </div>
      )}

      <p className="mt-8 border-t border-[var(--border)] pt-5 text-xs leading-6 text-[var(--muted)]">
        Local-only storage: leads and notes stay in this browser profile. They do not sync across devices, reach the public website, or survive clearing browser data. Export backups regularly. This dashboard requires the server-side admin password, but browser-local records are still accessible to anyone who can use this signed-in browser profile.
      </p>
    </div>
  );
}

function isLead(value: unknown): value is Lead {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Lead>;
  const isText = (field: unknown, maxLength: number, required = false) =>
    typeof field === "string" && field.length <= maxLength && (!required || field.trim().length > 0);

  return isText(item.id, 128, true) &&
    isText(item.createdAt, 40, true) && Number.isFinite(Date.parse(item.createdAt ?? "")) &&
    isText(item.name, 120, true) &&
    isText(item.email, 254, true) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email ?? "") &&
    isText(item.organization, 160) &&
    (item.type === "service" || item.type === "meeting") &&
    isText(item.subject, 160, true) &&
    isText(item.message, 5000, true) &&
    isText(item.preferredDate, 32) &&
    isText(item.meetingFormat, 80) &&
    statuses.includes(item.status as Status) &&
    isText(item.notes, 5000);
}

function Field({
  label,
  name,
  required,
  type = "text",
  maxLength,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      <input className="form-control" name={name} type={type} required={required} maxLength={maxLength} />
    </label>
  );
}
