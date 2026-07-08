import { AppShell } from "@/components/AppShell";

export default function BillingPage() {
  return (
    <AppShell>
      <section className="product-card rounded-[2rem] p-6">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-family-berry">Billing</p>
        <h1 className="mt-2 text-4xl font-black">Plans are parked for V1.</h1>
        <p className="mt-3 max-w-2xl text-black/65">Stripe checkout stays disabled until Harbor storage, auth, and plan limits are ready.</p>
      </section>
    </AppShell>
  );
}
