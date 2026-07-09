import HarborShell from "@/components/harbor/HarborShell";
import HarborSetupForm from "@/components/harbor/HarborSetupForm";

export default function SettingsPage() {
  return (
    <HarborShell active="home">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-10 lg:py-12">
        <HarborSetupForm />
      </div>
    </HarborShell>
  );
}
