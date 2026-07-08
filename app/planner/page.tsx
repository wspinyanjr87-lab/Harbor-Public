import { AppShell } from "@/components/AppShell";
import { HarborWorkspace } from "@/components/HarborWorkspace";

export default function PlannerPage() {
  return (
    <AppShell>
      <HarborWorkspace initialTab="Meals" />
    </AppShell>
  );
}
