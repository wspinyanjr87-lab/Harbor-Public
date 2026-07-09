# Harbor Family HQ

A premium dark navy and champagne gold family command center for meals, groceries, schedules, memories, and household rhythm.

Harbor is the public-safe family planner product layer. It is **not** Grace-HQ, not the private Grace source brain, and not an internal command system.

## Current Product

```text
Harbor Family HQ / Harbor Family Planner Lite
```

The current `meal-planner` branch contains the Next.js app version of the Superdesign Harbor Family HQ dashboard.

## What Is Implemented

| Route | Purpose | Status |
| --- | --- | --- |
| `/` | Harbor Home dashboard | Implemented |
| `/calendar` | Family calendar view | Implemented |
| `/planner` | Meal planner / recipe browser | Implemented |
| `/grocery` | Grocery list builder | Implemented |
| `/memories` | Memory gallery | Implemented |
| `/api/status` | Starter/live mode status | Implemented |

The previous Superdesign static HTML concepts have been translated into real React/Next pages using the existing app stack.

## Core Features

- Harbor Home with welcome banner, quick actions, today's rhythm, what's next, meal/grocery/memory snapshots
- Calendar with month grid, event color legend, today's agenda, and household availability status
- Meal Planner with recipe cards, search/filter shell, weekly table, ingredients, and chef's tip panel
- Grocery List with categorized items, purchased state styling, estimated total, stock level, add-item panel, and quick suggestion
- Memories with coastal banner, filters, add-memory action, and hover-reveal gallery cards
- Shared Harbor shell for sidebar navigation, mobile header, account panel, faith anchor card, and verse footer

## Design System

### Colors

| Token | Value | Use |
| --- | --- | --- |
| Navy Deep | `#020617` | main background |
| Navy Sidebar | `#010411` | sidebar/footer background |
| Gold Primary | `#D4AF37` | headings, icons, active states |
| Gold Soft | `#B5942B` | hover and secondary gold |
| Glass Background | `rgba(255,255,255,0.035)` | cards |
| Glass Border | `rgba(212,175,55,0.15)` | subtle borders |

### Typography

- Headings / brand: `Crimson Pro`
- Body / UI: `Plus Jakarta Sans`

These are imported in `app/globals.css`.

### Shared Utilities

- `.harbor-serif` for headings and display text
- `.harbor-glass` for glass cards
- `.harbor-checkbox` for gold grocery checkboxes

## Main App Structure

```text
app/
  page.tsx                 # Harbor Home
  calendar/page.tsx        # Calendar view
  planner/page.tsx         # Meal planner
  grocery/page.tsx         # Grocery list
  memories/page.tsx        # Memory gallery
  api/status/route.ts      # app status endpoint

components/
  harbor/HarborShell.tsx   # shared sidebar/header/footer layout
  home/HomeBannerRotator.tsx

supabase/
  schema.sql
  rls-notes.sql

docs/
  deployment/meal-planner-launch-checklist.md
  friend-sample-test.md
  product/harbor-product-lanes.md
  supabase-setup.md
```

## Local Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build Check

```bash
npm run build
```

GitHub Actions runs `Harbor Build Check` on the `meal-planner` branch.

## Vercel Setup

Use:

```text
Repository: wspinyanjr87-lab/Harbor-Public
Branch: meal-planner
Framework: Next.js
Install command: npm install
Build command: npm run build
Output directory: leave default
```

Starter-data mode can run without live Supabase or Stripe values.

Set this for clarity:

```env
NEXT_PUBLIC_HARBOR_SAMPLE_MODE=true
NEXT_PUBLIC_APP_URL=<vercel-url-after-created>
```

Leave these blank until live storage and billing are ready:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Data Boundary

Harbor gets its own future Supabase project and public-safe schema.

Do not connect:

- Grace-HQ private data
- private Grace keys
- internal command dashboards
- private family source material that does not belong in a public product repo

## Roadmap

1. Refactor Home into `HarborShell` so all five pages share the same layout.
2. Replace placeholder sample data with Harbor-safe starter data files.
3. Add responsive sidebar drawer for mobile navigation.
4. Connect Harbor-only Supabase workspace/auth.
5. Keep billing and AI planner disabled until rules and usage limits are defined.

## License

License details will be finalized before public release.
