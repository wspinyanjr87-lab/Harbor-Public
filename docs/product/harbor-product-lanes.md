# Harbor Product Lanes

Status: **Harbor product map**

## Core Product

```text
Harbor Family Planner Lite
```

This is Harbor's first core product.

It owns the public family planning lane:

- meal planning
- grocery planning
- calendar rhythm
- family dashboard
- onboarding
- household preferences

## Booster Products

Booster products are not the first core product, but they can help Harbor create revenue, product reach, or customer acquisition.

```text
TikTok Ideas / Creator Studio
future content tools
monetization helpers
product growth tools
```

## TikTok Ideas / Creator Studio

Current classification:

```text
Harbor booster product
```

It should not be deleted.

It is not part of Harbor Family Planner Lite's first live push, but it can become a Harbor booster lane later.

Potential future lane name:

```text
Harbor Creator Studio
```

## Boundary

```text
Harbor-HQ = portfolio headquarters for customer-facing Harbor product and revenue lanes
Watcher-Research = signals, scoring, opportunity research
Grace-HQ = private source brain and internal command layer
```

TikTok Ideas touches research, but it is shaped like a product app, so it belongs under the Harbor umbrella, not inside Watcher-Research.

## Current Decision

```text
Harbor-HQ coordinates product lanes. Standalone product repositories now own implementation:
  Harbor-Family-Planner = Harbor Family Planner Lite
  Harbor-Reception = Harbor Reception

  booster products:
    TikTok Ideas / Creator Studio
    future content tools
    monetization helpers
    product growth tools
```

Keep TikTok Ideas parked as its own repo for now.

Do not merge parked experiments into Harbor product repositories until they have a clear owner, clean build, and live test path.
