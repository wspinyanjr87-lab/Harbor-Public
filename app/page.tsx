import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-family-cream px-5 py-10">
      <section className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-family-berry">Harbor Family Planner</p>
          <h1 className="text-5xl font-black tracking-tight md:text-7xl">A calmer way to run the house.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65">Plan meals, build grocery lists, organize schedules, and give every family member the right view from one clean family workspace.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/sample" className="rounded-2xl bg-family-ink px-5 py-3 font-bold text-white">Try sample</Link>
            <Link href="/planner" className="rounded-2xl bg-family-leaf px-5 py-3 font-bold text-white">Open planner</Link>
          </div>
        </div>
        <div className="product-card rounded-[2rem] p-6">
          <div className="rounded-[1.5rem] bg-family-cloud p-5">
            <div className="mb-4 flex items-center justify-between">
              <strong>This Week</strong>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold">$150 budget</span>
            </div>
            <div className="space-y-3">
              {["Meal plan ready", "Grocery list drafted", "Calendar visible", "Family rhythm clearer"].map((item) => <div key={item} className="rounded-2xl bg-white p-4 font-semibold shadow-sm">{item}</div>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
