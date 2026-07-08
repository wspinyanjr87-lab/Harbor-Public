import { AppShell } from "@/components/AppShell";

const overlays = ["Welcome", "Family Setup", "Food Preferences", "Weekly Plan", "Grocery Review", "Today"];

export default function OverlaysPage() {
  return (
    <AppShell>
      <section className="product-card rounded-[2rem] p-6">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-family-berry">Onboarding</p>
        <h1 className="mt-2 text-4xl font-black">First-run overlay path</h1>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {overlays.map((item, index) => <div key={item} className="rounded-2xl bg-family-cloud p-4"><div className="text-xs font-black uppercase text-black/45">Step {index + 1}</div><div className="text-xl font-black">{item}</div></div>)}
        </div>
      </section>
    </AppShell>
  );
}
