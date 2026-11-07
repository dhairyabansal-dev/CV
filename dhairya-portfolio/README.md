# Dhairya Bansal — Portfolio & Professional Portal

A Next.js portfolio for FinTech, quantitative finance, data analytics, and software systems, with a services catalogue, email-first enquiry form, and browser-local lead desk.

## Professional portal

- `/services` — service catalogue.
- `/book` — meeting requests and project enquiries.
- The public form validates required fields in the browser and prepares an email draft addressed to the portfolio contact. The visitor must press Send in their own email app.
- `/admin` — personal lead desk with manual lead creation, status tracking, notes, search, filters, and JSON backup import/export.
- No Supabase, database, server-side enquiry endpoint, external auth, or automated email/calendar pipeline is required.

## Local lead desk limitations

The lead desk stores its records in the current browser profile using localStorage. Records do not sync between devices or visitors, and may be lost if browser storage is cleared. Export JSON backups regularly. Public visitors do not write directly into the lead desk; enquiries are received through email and can then be entered manually.

The `/admin` route is not protected by server-side authentication. It is intended as a personal tool on a trusted device, not as a secure multi-user CRM. Do not store highly sensitive information in it.

## Environment

Only the optional server-side `GITHUB_TOKEN` is needed to raise the GitHub API rate limit. The portfolio works without it.

## GitHub-driven projects

Public, non-fork repositories under `dhairyabansal-dev` are pulled live from the GitHub REST API. `lib/github.ts` is the data layer.

- `lib/project-classification.ts` contains optional per-repository overrides.
- GitHub fetches are cached for 30 minutes.
- Static project data is used if GitHub is unavailable.
- `/projects/[repo]` renders repository READMEs.
- Optional `GITHUB_TOKEN` raises the API limit and remains server-only.

## Local development

```bash
cd dhairya-portfolio
npm install
npm run lint
npm run build
npm run dev
```
