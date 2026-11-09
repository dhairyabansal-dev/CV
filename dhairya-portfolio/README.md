# Dhairya Bansal — Portfolio & Professional Portal

A Next.js portfolio for FinTech, quantitative finance, data analytics, and software systems, with a services catalogue, email-first enquiry form, and browser-local lead desk.

## Professional portal

- `/services` — service catalogue.
- `/book` — meeting requests and project enquiries.
- The public form validates required fields in the browser and prepares an email draft addressed to the portfolio contact. The visitor must review and press Send in their own email app.
- `/admin` — password-protected personal lead desk with manual lead creation, status tracking, notes, search, filters, and JSON backup import/export.
- The portal does not use Supabase, a database, public enquiry API, or automated email/calendar pipeline.

## Admin setup

Set these server-side environment variables in Vercel (and in `.env.local` for local development):

- `ADMIN_PASSWORD` — a strong private passphrase, at least 16 characters.
- `ADMIN_SESSION_SECRET` — a random signing secret, at least 32 characters. Generate one with `openssl rand -base64 48`.

Do not prefix either variable with `NEXT_PUBLIC_`, commit real values, or send them to the browser. The server verifies the password and issues an eight-hour, HTTP-only, SameSite=Strict session cookie. The admin route redirects to `/admin/login` until both values are configured.

For production use, add a Vercel Firewall rate-limit rule for `POST /api/admin/session` as a further defence against repeated password attempts. The application does not implement a distributed rate limiter.

## Local lead desk limitations

The lead desk stores records only in the current browser profile using localStorage. Records do not sync between devices or visitors, and may be lost if browser data is cleared. Export JSON backups regularly. Public visitors do not write directly into the lead desk; enquiries are received through email and must be entered manually.

The password gate protects the route, not the browser profile itself. Anyone with access to an already-unlocked browser profile may be able to inspect its local records. Do not store highly sensitive information. Meeting requests are requests for manual confirmation, not confirmed calendar bookings.

## Environment

Only the optional server-side `GITHUB_TOKEN` is needed to raise the GitHub API rate limit. The portfolio works without it. The admin password and session secret are required only for `/admin`.

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
