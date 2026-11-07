-- Run in the Supabase SQL Editor.
-- Public visitors can insert enquiries only. Admins authenticate with Supabase Auth
-- and must have app_metadata.role = 'admin' (never use user_metadata for authorization).

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 320),
  organization text check (organization is null or char_length(organization) <= 120),
  type text not null check (type in ('service', 'meeting')),
  subject text not null check (char_length(subject) between 2 and 160),
  message text not null check (char_length(message) between 10 and 5000),
  preferred_date date,
  meeting_format text check (meeting_format is null or meeting_format in ('Google Meet', 'Phone', 'In person', 'No preference')),
  status text not null default 'new' check (status in ('new', 'reviewing', 'approved', 'declined', 'completed'))
);

alter table public.inquiries enable row level security;

drop policy if exists "Anyone can submit an inquiry" on public.inquiries;
create policy "Anyone can submit an inquiry"
  on public.inquiries for insert to anon
  with check (status = 'new');

drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries"
  on public.inquiries for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Admins can update inquiries"
  on public.inquiries for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Remove broad defaults and grant only the columns used by the public form/admin UI.
revoke all on public.inquiries from anon, authenticated;
grant insert (name, email, organization, type, subject, message, preferred_date, meeting_format)
  on public.inquiries to anon;
grant select (id, created_at, name, email, organization, type, subject, message, preferred_date, meeting_format, status)
  on public.inquiries to authenticated;
grant update (status) on public.inquiries to authenticated;

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);
