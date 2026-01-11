-- Create Posts Table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'draft', -- 'draft' or 'published'
  pinned boolean not null default false,
  category text not null default 'update',
  tags text[] not null default '{}'::text[],
  published_at timestamptz,
  title_ru text not null,
  title_kz text not null,
  excerpt_ru text,
  excerpt_kz text,
  cover_url text,
  content_ru_md text not null,
  content_kz_md text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.posts enable row level security;

-- Policies

-- 1. Public can VIEW only PUBLISHED posts
create policy "Posts: anyone can view published"
  on public.posts for select
  using (status = 'published');

-- 2. Admins (Authenticated) can VIEW ALL (drafts included)
create policy "Posts: auth can view all"
  on public.posts for select
  to authenticated
  using (true);

-- 3. Admins (Authenticated) can INSERT
create policy "Posts: auth can insert"
  on public.posts for insert
  to authenticated
  with check (true);

-- 4. Admins (Authenticated) can UPDATE
create policy "Posts: auth can update"
  on public.posts for update
  to authenticated
  using (true);

-- 5. Admins (Authenticated) can DELETE
create policy "Posts: auth can delete"
  on public.posts for delete
  to authenticated
  using (true);

-- Auto-update updated_at timestamp (reusing existing function if available, or creating new trigger)
-- Assuming 'update_updated_at_column' function exists from initial schema.
-- If not, simple trigger:
create or replace function update_posts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_posts_updated_at
  before update on public.posts
  for each row
  execute function update_posts_updated_at();
