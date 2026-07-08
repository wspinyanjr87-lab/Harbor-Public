# Harbor Public

Public release repo for Harbor.

Harbor is the public release layer for approved Grace products.

## Rule

Only public-safe product work belongs here.

## First product candidate

Harbor Family Planner Lite.

## Meal Planner Branch

Branch: `meal-planner`

This branch carries the clean Harbor Family Planner move from the old `harbor-family-planner` project.

## Product Purpose

Harbor helps households plan meals, groceries, schedules, and household rhythm from one simple workspace.

This is not Grace-HQ. This is not the private Grace system. This is only the public-safe family planner product.

## Local Run

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/sample` | Safe sample/tester flow |
| `/dashboard` | Family dashboard |
| `/planner` | Weekly meal planner |
| `/recipes` | Recipe library |
| `/grocery` | Grocery list builder |
| `/calendar` | Family schedule |
| `/settings` | Family members, roles, preferences |
| `/billing` | Subscription placeholder |
| `/overlays` | First-run UX overlay preview |
| `/api/status` | Starter/live mode status |

## Current Live-Push Status

Starter-data mode is ready for click-through testing.

Before production launch:

1. Create fresh Harbor Supabase project.
2. Add Harbor-only environment values.
3. Run `supabase/schema.sql`.
4. Wire auth and workspace ownership.
5. Add row security policies.
6. Keep billing and AI features disabled until configured.
