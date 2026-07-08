# Harbor Public Boundary

Status: **Harbor-Public architecture doctrine**

Source cleaned from the legacy Grace doc `docs/migration/harbor-agent-public-integration.md`. This version keeps the Harbor boundary model and removes old staging language.

## Core Definition

Harbor is Grace's public release and integration boundary.

Grace stays private. Harbor receives only the approved, public-safe parts that are ready to become products, workflows, or user-facing features.

```text
Grace-HQ = private command brain, source system, Builder, agents, memory, and admin tools
Harbor-Public = public release boundary, product packaging layer, and deployment target
Watcher-Research = private research, opportunity scouting, market signals, and experiments
```

## Harbor's Job

Harbor owns the public integration layer.

| Responsibility | Meaning |
| --- | --- |
| Public release boundary | Only Harbor-facing code should deploy publicly. |
| Public-safe filtering | No Grace-HQ internals, Swarm internals, private memory, agent experiments, or raw research leaks into public releases. |
| Product packaging | Harbor turns approved Grace functionality into usable public/family products. |
| Deployment readiness | Harbor-Public is the only repo that should connect to deployment when ready. |
| User-facing clarity | Harbor features should make sense to a normal family or customer without exposing internal Grace machinery. |

## Golden Deployment Rule

```text
Only Harbor-Public connects to Vercel or public deployment.
```

Grace-HQ stays private.

Watcher-Research stays private.

The legacy mixed `grace` repo does not deploy.

## Public-Safe Promotion Rule

A feature can move into Harbor only if it passes every check below:

- It is public-safe.
- It does not expose Grace-HQ.
- It does not expose Swarm internals.
- It does not expose private memory or personal data.
- It does not require internal agent tools to function.
- It has a clear user-facing purpose.
- It can run without the legacy mixed Grace root app.
- It can be explained as a Harbor product feature, not as a Grace internal system.

If it fails any check, it stays in Grace-HQ, Watcher-Research, or the old archived Grace repo.

## Harbor Subchains

Harbor may eventually manage public-safe subchains such as:

```text
Harbor Family Planner
Harbor Recipes
Harbor Grocery
Harbor Calendar
Harbor Household
Harbor Onboarding
Harbor Support
```

These are lanes under Harbor, not separate products by default. Each lane must remain public-safe and easy to explain.

## Private Systems Excluded from Harbor V1

Harbor V1 must not include:

- Grace-HQ command brain
- Swarm internals
- Pattern Scout internals
- private family memory
- raw finance data or finance ledgers
- raw receipt-reader intelligence
- cron automation that has not been reviewed
- internal agent commands
- repo-write tools
- secret or credential handling
- experimental UI/lab code

## Harbor Feature Promotion Packet

Before a feature moves into Harbor, create a promotion packet:

```text
Feature name:
Problem solved:
Target user:
Source in Grace-HQ or old Grace:
Public-safe behavior:
Private behavior excluded:
Data touched:
APIs needed:
Files/modules needed:
Tests/build checks:
Rollback plan:
Approved by William: yes/no
```

No packet, no promotion.

## Current Harbor Direction

The first Harbor product lane is:

```text
Harbor Family Planner Lite
```

Its public-safe starting scope may include:

- family dashboard/home
- meal planner
- grocery list
- basic calendar/planner
- recipe cards or snapshots
- household checklist
- simple settings

Anything sensitive, agent-heavy, private, experimental, or unclear stays out of Harbor V1.

## Stop Condition

If a feature is unclear, label it:

```text
REVIEW FIRST
```

Then do not move it into Harbor until William approves it.

## Decision

Keep this file as Harbor-Public's clean boundary doctrine.

Do not migrate the old legacy Harbor integration doc as-is. The old file can stay in the legacy repo until archive/deletion.