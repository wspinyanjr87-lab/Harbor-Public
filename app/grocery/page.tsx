import { AppShell } from "@/components/AppShell";
import { HarborWorkspace } from "@/components/HarborWorkspace";

export default function GroceryPage() {
  return (
    <AppShell>
      <HarborWorkspace initialTab="Grocery" />
    </AppShell>
  );
}
