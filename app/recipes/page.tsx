import { AppShell } from "@/components/AppShell";
import { HarborWorkspace } from "@/components/HarborWorkspace";

export default function RecipesPage() {
  return (
    <AppShell>
      <HarborWorkspace initialTab="Meals" />
    </AppShell>
  );
}
