-- Add promo_1plus1 to Tabs
alter table public.tabs 
add column if not exists promo_1plus1 boolean not null default false;
