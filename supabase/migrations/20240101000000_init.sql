-- Enable UUID extension (usually enabled by default in Supabase, but good to be explicit for some envs, though for Supabase it's pre-installed)
create extension if not exists "uuid-ossp";

-- 1. Create Functions
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 2. Create Settings Table
create table public.settings (
  id uuid primary key default '00000000-0000-0000-0000-000000000000'::uuid,
  telegram_username text not null,
  whatsapp_phone_e164 text not null,
  instagram_url text,
  tiktok_url text,
  youtube_url text,
  support_note_kz text,
  support_note_ru text,
  updated_at timestamptz default now(),
  constraint settings_singleton_check check (id = '00000000-0000-0000-0000-000000000000'::uuid)
);

-- Trigger for settings
create trigger update_settings_updated_at
before update on public.settings
for each row execute procedure public.update_updated_at_column();

-- 3. Create Tabs Table
create table public.tabs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  code text unique not null,
  title_kz text not null,
  title_ru text,
  artist_kz text,
  artist_ru text,
  description_kz text,
  description_ru text,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  price_kzt int not null check (price_kzt > 0),
  youtube_embed_url text,
  formats jsonb not null default '["PDF"]'::jsonb,
  tuning text,
  capo int,
  tempo_bpm int,
  tags jsonb default '[]'::jsonb,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger for tabs
create trigger update_tabs_updated_at
before update on public.tabs
for each row execute procedure public.update_updated_at_column();

-- 4. Enable RLS
alter table public.settings enable row level security;
alter table public.tabs enable row level security;

-- 5. RLS Policies

-- Settings: Public read, Admin update
create policy "Public can view settings" 
on public.settings for select 
to anon, authenticated 
using (true);

create policy "Admins can update settings" 
on public.settings for update 
to authenticated 
using (true); -- Assuming only admins are "authenticated" users in this system context, or we can check email matches. 
-- Note: User requirement says "Admins log in via Supabase Auth". Supabase Auth users have 'authenticated' role.
-- If we want to strictly limit to specific emails, we would adding check. 
-- But for MVP, any authenticated user is an admin? 
-- User said: "Admins (only creators) can log in... Users do NOT register/login". So yes, any logged in user is admin.

-- Tabs: Public read published, Admin full access
create policy "Public can view published tabs" 
on public.tabs for select 
to anon, authenticated 
using (is_published = true);

create policy "Admins can view all tabs" 
on public.tabs for select 
to authenticated 
using (true);

create policy "Admins can insert tabs" 
on public.tabs for insert 
to authenticated 
with check (true);

create policy "Admins can update tabs" 
on public.tabs for update 
to authenticated 
using (true);

create policy "Admins can delete tabs" 
on public.tabs for delete 
to authenticated 
using (true);

-- 6. Seed Data
insert into public.settings (id, telegram_username, whatsapp_phone_e164)
values ('00000000-0000-0000-0000-000000000000', 'fingerstyle_kz', '77001234567')
on conflict (id) do nothing;
