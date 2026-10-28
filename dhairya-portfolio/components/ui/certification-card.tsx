import type { Certification } from "@/types/portfolio";

export interface CertificationCardProps {
  certification: Certification;
  index?: number;
}

export function CertificationCard({
  certification,
  index = 0,
}: CertificationCardProps) {
  return (
    <article className="group border border-[var(--border)] bg-[var(--panel)] p-6 transition-colors hover:border-[var(--accent)] sm:p-8">
      <header className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <p className="terminal-text">
            {String(index + 1).padStart(2, "0")} / {certification.issuer}
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">
            {certification.title}
          </h3>
          <p className="mt-2 font-mono text-sm text-[var(--muted)]">
            {certification.organization}
          </p>
        </div>
        <span className="shrink-0 border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--accent)]">
          {certification.issuedDate}
        </span>
      </header>
      {certification.description ? (
        <p className="mt-5 leading-7 text-[var(--muted)]">
          {certification.description}
        </p>
      ) : null}
      {certification.skills?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {certification.skills.map((skill) => (
            <span
              key={skill}
              className="border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--muted)]"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}
      {certification.credentialId ? (
        <p className="mt-5 break-all font-mono text-xs text-[var(--muted)]">
          Credential ID: {certification.credentialId}
        </p>
      ) : null}
      {certification.credentialUrl ? (
        <a
          className="mt-5 inline-flex font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)] underline underline-offset-4 hover:text-[var(--foreground)]"
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View credential ↗
        </a>
      ) : null}
    </article>
  );
}
