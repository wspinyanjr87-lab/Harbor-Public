# Harbor Portfolio Boundary

Status: **Harbor-HQ portfolio boundary doctrine**

Harbor-HQ is the Harbor business portfolio headquarters. It manages public-safe product direction, portfolio boundaries, release planning, and product repository links.

## Core Separation

```text
Grace-HQ = private command brain, source system, Builder, agents, memory, and admin tools
Watcher-Research = private research, opportunity scouting, market signals, and experiments
Harbor-HQ = Harbor portfolio headquarters and coordination layer
Harbor-Family-Planner = standalone family planner product repository
Harbor-Reception = standalone restaurant reception product repository
```

## Ownership Rules

| Area | Owner |
| --- | --- |
| Private source brain | Grace-HQ |
| Research and scouting | Watcher-Research |
| Harbor portfolio strategy | Harbor-HQ |
| Family planner product code/deployment | Harbor-Family-Planner |
| Reception product code/deployment | Harbor-Reception |

## Golden Boundary Rule

Harbor-HQ coordinates the Harbor portfolio. Each Harbor product repository owns its own product code, deployment, data boundary, workflow, and release cycle.

Do not place private Grace data, family memory, credentials, secrets, raw Watcher research, or internal automation into Harbor product repositories.

## Migration Note

The old Harbor public release role has been split into:

- `Harbor-HQ` for portfolio headquarters and coordination docs
- `Harbor-Family-Planner` for the family planner product
- `Harbor-Reception` for the restaurant reception product

The original source branches remain preserved in Harbor-HQ until William approves cleanup.