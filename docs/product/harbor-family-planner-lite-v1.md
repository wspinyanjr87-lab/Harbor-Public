# Harbor Family Planner Lite V1

Status: **first sellable Harbor product plan**

This is Harbor-HQ's working product plan for Harbor Family Planner Lite V1.

## Product Idea

Harbor Family Planner Lite is the first public-safe product candidate carved out of the Grace ecosystem.

It should be a clean, simple family planner that other families can use without seeing private Grace-HQ systems, internal agents, private memory, or internal automation.

## Product Promise

```text
Harbor helps families keep meals, groceries, and schedules in one clean place without needing a complicated app setup.
```

## Why This Product First

- It uses the strongest existing Grace Family work.
- It is easier to make public-safe than all of Grace.
- It avoids selling Grace herself.
- It can become useful quickly.
- It gives Grace a first product lane while Grace-HQ stays private.

## V1 Scope

### Include

- Home dashboard
- Meal planner
- Grocery list
- Basic calendar/planner
- Recipe cards or recipe snapshots
- Household checklist
- Simple settings
- Family-safe onboarding copy

### Exclude from V1

- Grace-HQ command systems
- Grace Brain routes
- Swarm systems
- Pattern Scout
- Launch Vault
- private memory bridge
- private ledgers
- photo memory
- internal command executor
- repo-write tools
- deployment automation beyond Harbor itself

## V1 Harbor Lanes

Harbor can manage these public-safe lanes:

| Lane | Purpose | V1 status |
| --- | --- | --- |
| Harbor Meals | Meal planning and recipe cards. | Include |
| Harbor Grocery | Grocery list and store grouping. | Include |
| Harbor Calendar | Basic family planning. | Include simple version |
| Harbor Household | Household checklist or inventory-lite. | Include simple checklist first |
| Harbor Settings | Public-safe local settings. | Include |
| Harbor Memory | Product-safe preferences only. | Later |
| Harbor Receipts | Receipt review. | Later, review first |
| Harbor Budget | Simple household budgeting. | Later, review first |

## Public-Safe Data Model

V1 should prefer simple product state:

```text
recipes
mealPlan
groceryItems
calendarItems
householdTasks
settings
```

Avoid direct private Grace memory in V1.

## Suggested V1 Packaging

| Tier | What buyer gets | Notes |
| --- | --- | --- |
| Free preview | Screenshots, demo, or limited static planner. | Builds trust. |
| Lite | Basic planner app/template. | First sellable product. |
| Plus later | More automation, recipe packs, extra layouts. | Add after V1 works. |
| Family setup later | Optional guided setup. | Only if heavily templated or outsourced. |

## Build Path

1. Grace Builder designs the product spec.
2. William approves V1 scope.
3. Copy or rebuild only public-safe family planner code into Harbor-HQ.
4. Remove Grace naming from public UI where needed.
5. Remove private memory, private ledger, photo, and internal-agent dependencies.
6. Build locally.
7. Test with household-style sample data.
8. Package for sale.
9. Connect deployment only to `Harbor-HQ` when ready.

## Acceptance Checklist

Before Harbor Family Planner Lite V1 can ship:

- [ ] Product runs without Grace-HQ routes.
- [ ] Product does not expose private memory.
- [ ] Product does not expose Swarm or internal-agent systems.
- [ ] Product does not require private ledger data.
- [ ] Product does not require internal scheduled jobs.
- [ ] Product builds independently.
- [ ] Product has clean public name and copy.
- [ ] Product has demo/sample data.
- [ ] Product has rollback plan.

## First Promotion Packet

```text
Feature name: Harbor Family Planner Lite V1
Problem solved: Family meal, grocery, and schedule coordination.
Target user: Busy families who need a simple shared planner.
Source in Grace: Root Grace Family app and Family modules, reviewed before use.
Public-safe behavior: Meal planning, recipes, grocery lists, simple calendar, household checklist.
Private behavior excluded: Grace-HQ, private memory, agents, Swarm, private ledgers, photo memory.
Data touched: Product-local planner/grocery/recipe/settings state.
APIs needed: Public-safe Harbor-local routes only.
Tests/build checks: Harbor package build, no old root/HQ imports after final migration.
Rollback plan: Revert Harbor migration commit and keep source in Grace-HQ or old Grace archive.
Approved by William: pending
```

## Stop Condition

If a required feature needs private Grace memory, private ledger data, photos, agent commands, HQ routes, repo-write tools, or unclear ownership, it is not part of V1.

Label it:

```text
REVIEW FIRST
```

Then keep it out of Harbor until William approves it.

