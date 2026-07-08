# Harbor Supabase Setup

Harbor is prepared for Supabase, but it can run without keys using starter data.

Create a fresh Supabase project for Harbor.

## Current Mode

Before keys are added, Harbor runs in starter mode.

Check:

```text
/api/status
```

Expected starter response:

```json
{
  "dataMode": "starter",
  "readyForLiveData": false
}
```

## Local Setup Later

Create this file locally:

```text
.env.local
```

Add the Harbor Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Never commit `.env.local`.

## Vercel Setup Later

In Vercel:

1. Open the Harbor project.
2. Go to Settings.
3. Go to Environment Variables.
4. Add the Harbor values.
5. Redeploy.

## Database Setup

Run this SQL in the Harbor Supabase project:

```text
supabase/schema.sql
```

That creates:

- workspaces
- members
- recipes
- meal_plan_items
- grocery_items
- calendar_items
- memory_notes
- notification_preferences

## Security Step

Row security notes are here:

```text
supabase/rls-notes.sql
```

Add the policies after login and workspace membership are wired.

## Data Boundary

Grace-HQ stays private. Harbor gets its own product database.
