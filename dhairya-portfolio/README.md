# Dhairya Bansal — Portfolio & Professional Portal

A Next.js portfolio for FinTech, quantitative finance, data analytics, and software systems, with a professional services catalogue and request portal.

## Professional portal setup

The public site includes:
- /services — service catalogue and project enquiry entry points.
- /book — meeting requests and freelance/project enquiries.
- /api/requests — validated server-side intake endpoint.
- supabase/schema.sql — database table and row-level security policies for inquiry storage.

### Connect Supabase

1. Create a Supabase project.
2. Open the SQL Editor and run supabase/schema.sql.
3. Copy .env.example to .env.local.
4. Set SUPABASE_URL and SUPABASE_ANON_KEY from Project Settings → API.
5. Add the same variables to Vercel Project Settings → Environment Variables, then redeploy.
6. Until Supabase is configured, the form shows a clear setup message and direct email fallback.

Use only the anon/publishable key on the public request endpoint. Never add a service-role key to this website or expose it in client-side code.

Meeting requests are requests, not confirmed calendar bookings. Confirm a date and time personally by email before treating a meeting as scheduled.

## GitHub-driven projects

Public, non-fork repositories under dhairyabansal-dev are pulled live from the GitHub REST API and shown in the Projects and Build Log sections. lib/github.ts is the data layer.

- lib/project-classification.ts contains optional per-repository overrides.
- GitHub fetches are cached for 30 minutes.
- Static project data is used if GitHub is unavailable.
- /projects/[repo] renders repository READMEs.
- Optional GITHUB_TOKEN raises the API limit and remains server-only.

## Local development

    cd dhairya-portfolio
    npm install
    npm run dev

Run npm run lint and npm run build before merging. Deployments are managed by the connected Vercel project.
