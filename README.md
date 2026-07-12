# Harbor HQ

Harbor-HQ is the Harbor business portfolio headquarters.

It coordinates public-safe Harbor product strategy, boundaries, release planning, and portfolio documentation. It is not the private Grace source brain and it is not a single product deployment repo.

## Portfolio Architecture

```text
Watcher-Research
    -> Grace-HQ
    -> Harbor-HQ
    -> Harbor-Family-Planner
    -> Harbor-Reception
```

## Product Repositories

- Harbor Family Planner: https://github.com/wspinyanjr87-lab/Harbor-Family-Planner
- Harbor Reception: https://github.com/wspinyanjr87-lab/Harbor-Reception

## Harbor-HQ Role

Harbor-HQ manages the Harbor business portfolio. Each product repository owns its own product code, deployment, data boundary, workflow, and release cycle.

Harbor-HQ may contain portfolio docs, product lane planning, boundary doctrine, migration notes, and public-safe coordination materials.

## Boundaries

- Grace-HQ remains the private command/source brain.
- Watcher-Research scouts and researches.
- Harbor-HQ coordinates Harbor portfolio strategy.
- Harbor-Family-Planner owns the family planner product.
- Harbor-Reception owns the restaurant reception product.

Do not put private Grace data, family memory, credentials, secrets, or internal automation into Harbor product repos.

## Current Migration Sources

Original Harbor product branches are still preserved here and have not been deleted:

- `Harbor-Family-Planner`
- `harbor-reception-desk-phase-1`

These source branches were migrated into standalone product repositories as `main`.
