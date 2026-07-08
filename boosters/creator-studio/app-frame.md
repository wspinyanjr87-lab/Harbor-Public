# Creator Studio App Frame

Captured from the old `tiktokideas` repo before cleanup.

## Original Home Route

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/discover");
}
```

## Original Shell Concept

```text
Dark creator workspace
Sidebar navigation
Top status bar
Local StudioProvider state
Mock connectors
Mock generation jobs
Mock monthly content plan
```

## Original Navigation

```text
/discover
/monetization
/integrations
/studio
/results
```

## Original Studio State

The app used a local React Context provider with:

- connectors
- selected connector
- uploaded reference URL
- prompt
- job status
- content plan
- generation jobs
- connector connect/disconnect actions
- mock plan generation
- mock media generation
- reset workspace

## Original Product Promise

```text
Discover winning content, connect creative MCP tools, and generate content plans.
```

## Harbor Rewrite Target

Future Harbor route:

```text
/creator-studio
```

Future internal product sections:

```text
/creator-studio/discover
/creator-studio/monetization
/creator-studio/integrations
/creator-studio/studio
/creator-studio/results
```

## Live Safety

Keep this lane mock-first until Harbor decides:

- customer audience
- pricing
- connector policy
- API usage limits
- generation cost caps
- publishing rules
