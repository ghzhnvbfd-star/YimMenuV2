-- Run this in Supabase SQL Editor. Create admin users manually in Authentication.
create extension if not exists pgcrypto;

create table if not exists public.components (
  id text primary key,
  name text not null,
  type text not null default 'Community resource',
  status text not null default 'unknown' check (status in ('operational','maintenance','outage','unknown')),
  description text not null default '',
  url text not null default '',
  icon text not null default 'code',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'ANNOUNCEMENT',
  date date not null default current_date,
  title text not null,
  body text not null,
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.components enable row level security;
alter table public.news enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Public can read status/news. Only authenticated admins can write.
create policy "Public read components" on public.components for select using (true);
create policy "Authenticated manage components" on public.components for all to authenticated using (true) with check (true);
create policy "Public read news" on public.news for select using (true);
create policy "Authenticated manage news" on public.news for all to authenticated using (true) with check (true);

-- Newsletter: allow public insert only; subscribers cannot read the list from the client.
create policy "Public subscribe" on public.newsletter_subscribers for insert to anon, authenticated with check (length(email) <= 320 and position('@' in email) > 1);
-- Do not create a public SELECT policy for newsletter_subscribers.

insert into public.components (id,name,type,status,description,url,icon,sort_order) values
('yim','YimMenuV2.dll','Core component','operational','The main YimMenu component.','https://github.com/YimMenu/YimMenuV2/releases/tag/nightly','code',1),
('fsl','FSL','Save solution','operational','Community resource and documentation.','https://www.unknowncheats.me/forum/grand-theft-auto-v/616977-fsl-local-gtao-saves.html','shield',2),
('xenos','Xenos DLL Injector','Utility','maintenance','External project maintained by its author.','https://github.com/DarthTon/Xenos','terminal',3),
('lua','Lua Scripts','Community scripts','operational','Browse community-maintained Lua repositories.','https://github.com/orgs/YimMenu-Lua/repositories','file',4)
on conflict (id) do nothing;

insert into public.news (category,date,title,body,pinned) values
('ANNOUNCEMENT', current_date, 'Welcome to the new YimHub', 'A refreshed home for component status, useful links and community updates. Check back here for future announcements.', true),
('STATUS', current_date - 3, 'Status information', 'Component statuses are maintained by the site team. Always check the original project page for the latest release details.', false);
