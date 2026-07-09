create extension if not exists pgcrypto;

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'starter',
  grocery_budget_cents integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid,
  name text not null,
  role text not null default 'viewer',
  avatar_emoji text default 'home',
  created_at timestamptz not null default now()
);

create table if not exists recipes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  title text not null,
  meal_type text not null,
  budget_level text not null default 'low',
  prep_minutes integer not null default 30,
  ingredients jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists meal_plan_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  recipe_id uuid references recipes(id) on delete set null,
  day_of_week text not null,
  meal_type text not null,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists grocery_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  category text,
  estimated_cost_cents integer not null default 0,
  checked boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists calendar_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  title text not null,
  starts_at timestamptz,
  assigned_to uuid references members(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists memory_notes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists notification_preferences (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  meal_planning_enabled boolean not null default true,
  grocery_enabled boolean not null default true,
  today_enabled boolean not null default true,
  dinner_enabled boolean not null default true,
  memories_enabled boolean not null default false,
  created_at timestamptz not null default now()
);

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
