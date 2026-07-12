# Harbor Reception

Harbor Reception is an independent Harbor product repository for restaurant reception, reservation intake, lead handling, and front-desk workflow support.

This repository owns its own product code, deployment boundary, data boundary, workflow, and release cycle.

## Portfolio Position

```text
Watcher-Research -> Grace-HQ -> Harbor-HQ -> Harbor-Reception
```

- `Harbor-HQ` is the Harbor business portfolio headquarters.
- `Harbor-Reception` is the standalone restaurant reception product.
- Private Grace data, family memory, credentials, and internal automation do not belong in this repository.

## Phase 1 Foundation

This product branch contains the first working product shell:

- Responsive restaurant operations dashboard
- AI host online and paused state
- Reservation board
- Manual reservation creation
- Calls, guest, lead, and activity metrics
- Recent reception activity feed
- Mobile and desktop layouts

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build Check

```bash
npm install
npm run build
```

## Deployment Boundary

The Vercel project for this product should connect to:

```text
Repository: wspinyanjr87-lab/Harbor-Reception
Branch: main
Framework: Next.js
Install command: npm install
Build command: npm run build
Output directory: default
```

## Next Build Targets

1. Supabase restaurant, menu, reservation, and customer tables
2. Restaurant onboarding and profile editor
3. Menu knowledge manager
4. Website chat endpoint and embeddable widget
5. Twilio and OpenAI voice integration
6. Authentication and multi-restaurant tenancy

## Safety

- Do not add Grace-HQ private source data.
- Do not add Watcher-Research scouting data.
- Do not commit credentials, API keys, Supabase service keys, Stripe keys, OpenAI keys, family memory, or private browser data.
- Keep product work public-safe and product-owned.

