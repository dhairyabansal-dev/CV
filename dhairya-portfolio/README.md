# Dhairya Bansal — Portfolio & Professional Portal

A Next.js portfolio for FinTech, quantitative finance, data analytics, and software systems, with a professional services catalogue and request portal.

## Professional portal

- `/services` — service catalogue.
- `/book` — meeting requests and project enquiries.
- `/api/requests` — validated server-side enquiry intake.
- `/admin/login` and `/admin` — private CRM for reviewing enquiries and updating their status.
- `supabase/schema.sql` — database table, narrow grants, and row-level security.

## Connect Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Copy `.env.example` to `.env.local`.
4. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Project Settings → API.
5. Add those same variables to Vercel Project Settings → Environment Variables, then redeploy.
6. Until Supabase is configured, public submissions cannot be stored and the form displays a direct-email fallback.

Use only the anon/publishable key in this app. Never add a service-role key to Vercel for this feature or expose one in client-side code.

## Configure the CRM administrator

1. Create the administrator account in Supabase Authentication.
2. In Supabase's user management/admin tooling, set the account's **app metadata** to include `{"role":"admin"}`. Do not set this in user-editable metadata.
3. Sign in at `/admin/login` using that Supabase Auth account.
4. The server validates the Supabase user on CRM requests. The session token is held in an HttpOnly, SameSite=Strict cookie; inquiry reads and status changes use that user's JWT and are additionally restricted by database RLS.
5. The CRM shows the latest 100 enquiries. Statuses are `new`, `reviewing`, `approved`, `declined`, and `completed`.

The login and public form include same-origin checks and best-effort per-instance throttling. The in-memory throttle is not a global rate limiter across serverless instances; add a shared edge/database limiter before high-volume production use.

Meeting requests are not confirmed bookings. Confirm date/time manually by email. Automated email notifications and calendar event creation are not configured.

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
