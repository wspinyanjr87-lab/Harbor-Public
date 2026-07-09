-- Harbor row security notes
-- Run only after auth and workspace membership rules are wired.
-- Keep this separate until we verify the first Harbor Supabase project.

-- alter table workspaces enable row level security;
-- alter table members enable row level security;
-- alter table recipes enable row level security;
-- alter table meal_plan_items enable row level security;
-- alter table grocery_items enable row level security;
-- alter table calendar_items enable row level security;
-- alter table memory_notes enable row level security;
-- alter table notification_preferences enable row level security;
-- alter table harbor_setups enable row level security;

-- Policy goal:
-- A signed-in user should only read or change rows for workspaces where they are a member.
-- Server-side setup calls may handle owner creation.
