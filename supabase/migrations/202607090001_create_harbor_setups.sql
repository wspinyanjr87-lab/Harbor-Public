create extension if not exists pgcrypto;

create table if not exists harbor_setups (
  id uuid primary key default gen_random_uuid(),
  setup_key text unique not null default 'default',
  household_name text not null,
  primary_email text,
  people jsonb not null default '[]'::jsonb,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function set_harbor_setups_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists harbor_setups_updated_at on harbor_setups;

create trigger harbor_setups_updated_at
before update on harbor_setups
for each row
execute function set_harbor_setups_updated_at();

alter table harbor_setups enable row level security;
