# Harbor Meal Planner Launch Checklist

Status: **pre-live branch checklist**

Branch:

```text
meal-planner
```

## Goal

Get Harbor Family Planner Lite ready for the first live Vercel test.

## Preflight

Run locally:

```bash
npm install
npm run build
```

## Required Vercel Settings

Use:

```text
Repository: wspinyanjr87-lab/Harbor-Public
Branch: meal-planner
Framework: Next.js
Build command: npm run build
Install command: npm install
Output directory: leave default
```

## Environment Variables For First Test

Starter-data mode can run without live Supabase or Stripe values.

Set this for clarity:

```env
NEXT_PUBLIC_HARBOR_SAMPLE_MODE=true
NEXT_PUBLIC_APP_URL=<vercel-url-after-created>
```

Leave these blank until live storage is ready:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Routes To Test

```text
/
/sample
/dashboard
/planner
/recipes
/grocery
/calendar
/settings
/billing
/overlays
/api/status
```

## Live Safety Rules

- Do not connect Grace-HQ data.
- Do not reuse private Grace keys.
- Do not enable billing yet.
- Do not enable AI planner yet.
- Keep first Vercel push starter-data only.

## Pass Criteria

- Landing page loads.
- Sample page loads.
- Planner page lets meals change.
- Grocery page calculates from selected meals.
- Calendar page accepts starter events.
- Settings page loads.
- Billing page clearly says plans are parked.
- `/api/status` returns starter mode.

## After First Successful Deploy

1. Screenshot landing, sample, planner, grocery, and status route.
2. Fix any UI breakage.
3. Decide whether to merge `meal-planner` into `main`.
4. Only after that, plan Harbor Supabase setup.
