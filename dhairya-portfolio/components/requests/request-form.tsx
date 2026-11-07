"use client";

import { useState, type FormEvent } from "react";

type RequestType = "meeting" | "service";
const CONTACT_EMAIL = "dhairyabansal090@gmail.com";

export function RequestForm({ initialType, initialSubject }: { initialType: RequestType; initialSubject: string }) {
  const [type, setType] = useState<RequestType>(initialType);
  const [opened, setOpened] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const subject = value("subject") || (type === "meeting" ? "Meeting request" : "Project enquiry");
    const lines = [
      type === "meeting" ? "MEETING REQUEST" : "PROJECT ENQUIRY",
      "",
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Organization: ${value("organization") || "Not provided"}`,
      `Subject: ${subject}`,
      ...(type === "meeting" ? [`Preferred date: ${value("preferredDate") || "Flexible"}`, `Meeting format: ${value("meetingFormat") || "No preference"}`] : []),
      "",
      type === "meeting" ? "Agenda / context:" : "Project brief:",
      value("message"),
      "",
      "Sent from the portfolio contact form.",
    ];
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
    setOpened(true);
  }

  return <form onSubmit={submit} className="border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-8">
    <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-6">
      <button type="button" onClick={() => { setType("meeting"); setOpened(false); }} className={`button ${type === "meeting" ? "button--primary" : "button--secondary"}`}>Meeting request</button>
      <button type="button" onClick={() => { setType("service"); setOpened(false); }} className={`button ${type === "service" ? "button--primary" : "button--secondary"}`}>Project enquiry</button>
    </div>
    {opened && <div role="status" className="mt-5 border border-[var(--accent)]/40 p-4 text-sm leading-6">
      <p className="font-medium text-[var(--accent)]">Your email app should open with the request drafted.</p>
      <p className="mt-1 text-[var(--muted)]">Review the message and press Send in your email app. Nothing is transmitted or stored by this website.</p>
    </div>}
    <div className="grid gap-5 pt-6 sm:grid-cols-2">
      <Field label="Your name" name="name" required placeholder="Full name" />
      <Field label="Work email" name="email" type="email" required placeholder="you@company.com" />
      <Field label="Organization (optional)" name="organization" placeholder="Company / institution" />
      <Field label={type === "meeting" ? "Meeting topic" : "Service required"} name="subject" required defaultValue={initialSubject} placeholder={type === "meeting" ? "What would you like to discuss?" : "Which service are you interested in?"} />
    </div>
    {type === "meeting" && <div className="mt-5 grid gap-5 sm:grid-cols-2">
      <Field label="Preferred date (optional)" name="preferredDate" type="date" />
      <label className="block"><span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">Meeting format</span><select name="meetingFormat" className="form-control"><option>Google Meet</option><option>Phone</option><option>In person</option><option>No preference</option></select></label>
    </div>}
    <label className="mt-5 block"><span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">{type === "meeting" ? "Agenda / context" : "Project brief"}</span>
      <textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder={type === "meeting" ? "A few points you would like to cover..." : "Describe the problem, expected deliverables, data availability, and timeline..."} className="form-control resize-y" />
    </label>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-xs text-xs leading-5 text-[var(--muted)]">This opens an email draft; it does not create a booking or send anything automatically.</p>
      <button className="button button--primary" type="submit">Prepare email ↗</button>
    </div>
  </form>;
}

function Field({ label, name, required, placeholder, type = "text", defaultValue }: { label: string; name: string; required?: boolean; placeholder?: string; type?: string; defaultValue?: string }) {
  return <label className="block"><span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">{label}</span><input className="form-control" name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} /></label>;
}
