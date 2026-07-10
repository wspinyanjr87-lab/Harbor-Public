# Harbor Digital Employee Foundation

## Decision

Harbor will expose product operations through digital employees, not through a loose collection of agents.

The employee is the accountable unit. Models, prompts, APIs, automations, and agents remain internal implementation details.

## Harbor's role

Harbor is the public-safe release and product operations layer for work approved by Grace.

Harbor may receive approved promotion packets, operate public-safe product workflows, collect public-safe metrics, and return release results to Grace. Harbor must never depend on Grace's private memory, family data, hidden credentials, or unrestricted internal tools.

## Initial workforce

### Product Operations Manager
Owns the public-safe work queue, assigns approved work, monitors blocked releases, and reports status to Grace.

### Release Coordinator
Validates promotion packets, prepares release checklists, coordinates deployment steps, and records release evidence.

### Product Support Specialist
Handles approved customer-safe support workflows, drafts responses, categorizes issues, and escalates anything outside policy.

### Quality Assurance Specialist
Runs acceptance checks, verifies public-safe data boundaries, records defects, and blocks unsafe or incomplete releases.

### Performance Analyst
Tracks product-safe usage, reliability, funnel, and customer feedback metrics and returns summarized results to Grace.

## Required employee contract

Every Harbor employee must define:

- stable identity, job title, department, and manager;
- mission and concrete responsibilities;
- public-safe data and tool permissions;
- approved triggers and work order types;
- standard operating procedures;
- approval policy and reversible-action limits;
- acceptance checks and release gates;
- performance metrics;
- escalation and rollback rules;
- status, version, and audit metadata.

## Work order lifecycle

```text
received_from_grace -> validated -> assigned -> in_progress
                    -> awaiting_approval | qa_review | blocked
                    -> released | rejected | rolled_back
                    -> measured -> reported_to_grace -> archived
```

## Promotion packet gate

Harbor work may begin only when a valid Grace promotion packet includes:

- packet identifier and explicit approval;
- product scope and public-safe requirements;
- approved assets and content;
- acceptance criteria;
- data classification and prohibited data;
- deployment constraints;
- rollback plan;
- owner and escalation destination;
- release metric expectations.

Missing or ambiguous packets are returned to Grace rather than guessed at.

## Permission rules

Harbor employees may:

- use explicitly approved public-safe product data;
- draft and execute reversible release operations within policy;
- run acceptance checks;
- collect public-safe operational metrics;
- create support drafts and issue summaries;
- escalate defects, privacy risks, and unclear requirements.

Harbor employees may not:

- read Grace private memory or family records;
- access Watcher raw research unless included in an approved packet;
- increase their own permissions;
- deploy outside an approved promotion packet;
- make financial, legal, privacy, or irreversible decisions without approval;
- silently change product scope.

## Performance metrics

Measure outcomes rather than activity:

- release success rate;
- acceptance-check pass rate;
- rollback frequency;
- defect escape rate;
- support resolution quality;
- time blocked awaiting a decision;
- product reliability;
- customer-safe satisfaction signals;
- accuracy and timeliness of reports to Grace.

## Escalation triggers

Stop and escalate when:

- promotion packet requirements conflict;
- private or family data appears in Harbor inputs;
- an action is irreversible or outside approved authority;
- acceptance checks fail;
- deployment state is uncertain;
- customer requests cross policy, legal, financial, privacy, or safety boundaries;
- rollback cannot be guaranteed.

## Interface language

Use Workforce, Employees, Departments, Work Orders, Release Queue, Approval Queue, Quality Gates, Escalations, Audit Trail, and Performance. The customer sees reliable jobs being completed, not a stage full of wandering bots.
