-- Run in the Supabase SQL Editor.
-- Public visitors may submit; only users with app_metadata.role = 'admin' may read/update.
create table if not exists public.inquiries (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null check(char_length(name) between 2 and 100),
 email text not null, organization text,
 type text not null check(type in ('service','meeting')),
 subject text not null, message text not null,
 preferred_date date, meeting_format text,
 status text not null default 'new' check(status in ('new','reviewing','approved','declined','completed'))
);
alter table public.inquiries enable row level security;
drop policy if exists "Anyone can submit an inquiry" on public.inquiries;
create policy "Anyone can submit an inquiry" on public.inquiries for insert to anon,authenticated with check(status='new');
drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries" on public.inquiries for select to authenticated using((auth.jwt()->'app_metadata'->>'role')='admin');
drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Admins can update inquiries" on public.inquiries for update to authenticated using((auth.jwt()->'app_metadata'->>'role')='admin') with check((auth.jwt()->'app_metadata'->>'role')='admin');
create index if not exists inquiries_created_at_idx on public.inquiries(created_at desc);
create index if not exists inquiries_status_idx on public.inquiries(status);
