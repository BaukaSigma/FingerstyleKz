-- Enable UUID
create extension if not exists "uuid-ossp";

-- Define Tables
create table if not exists public.settings (
  id uuid primary key default '00000000-0000-0000-0000-000000000000'::uuid,
  telegram_username text not null default 'fingerstyle_kz',
  whatsapp_phone_e164 text not null default '77000000000',
  instagram_url text,
  tiktok_url text,
  youtube_url text,
  support_note_kz text,
  support_note_ru text,
  constraint settings_singleton check (id = '00000000-0000-0000-0000-000000000000'::uuid)
);

create table if not exists public.tabs (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  code text unique,
  title_kz text not null,
  title_ru text,
  artist_kz text,
  artist_ru text,
  description_kz text,
  description_ru text,
  difficulty text default 'medium',
  price_kzt int not null default 1000,
  youtube_embed_url text,
  formats jsonb default '["PDF"]'::jsonb,
  tuning text,
  capo int,
  tempo_bpm int,
  tags jsonb default '[]'::jsonb,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.settings enable row level security;
alter table public.tabs enable row level security;

-- Policies
create policy "Settings: anyone can view"
  on public.settings for select
  using (true);

create policy "Settings: auth can update"
  on public.settings for update
  to authenticated
  using (true);

create policy "Tabs: anyone can view published"
  on public.tabs for select
  using (is_published = true);

create policy "Tabs: auth can view all"
  on public.tabs for select
  to authenticated
  using (true);

create policy "Tabs: auth can insert"
  on public.tabs for insert
  to authenticated
  with check (true);

create policy "Tabs: auth can update"
  on public.tabs for update
  to authenticated
  using (true);

create policy "Tabs: auth can delete"
  on public.tabs for delete
  to authenticated
  using (true);

-- Seed Settings
insert into public.settings (id, telegram_username, whatsapp_phone_e164)
values ('00000000-0000-0000-0000-000000000000', 'fingerstyle_kz', '77000000000')
on conflict (id) do nothing;
