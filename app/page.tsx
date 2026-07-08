import Link from "next/link";

const weekPreview = [
  {
    day: "Monday",
    meal: "Sheet Pan Chicken Tacos",
    grocery: "8 grocery items",
    rhythm: "Practice at 6:00"
  },
  {
    day: "Tuesday",
    meal: "Cheesy Chicken Rice Bake",
    grocery: "4 grocery items",
    rhythm: "School reminder"
  },
  {
    day: "Wednesday",
    meal: "Spaghetti Meat Sauce Night",
    grocery: "Pantry check",
    rhythm: "Easy night"
  }
];

const painPoints = [
  "What are we eating tonight?",
  "Do we already have that?",
  "What is happening tomorrow?",
  "Who needs to be where?"
];

const steps = [
  {
    title: "Pick meals",
    text: "Choose simple meals your family will actually eat."
  },
  {
    title: "Build the list",
    text: "Harbor turns the week into a grocery list you can review before shopping."
  },
  {
    title: "See the week",
    text: "Meals, groceries, and family rhythm stay visible without another messy notebook."
  }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-family-cream text-family-ink">
      <section className="relative px-5 py-8 md:py-14">
        <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-family-honey/30 blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-family-berry/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-family-berry shadow-sm">
              Harbor Family Planner
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Dinner, groceries, and the weekly chaos in one calm place.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
              Harbor helps families plan meals, build shopping lists, and keep the week visible without turning home life into another job.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sample" className="rounded-2xl bg-family-ink px-6 py-3 font-black text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5">
                Try the sample week
              </Link>
              <Link href="/planner" className="rounded-2xl bg-white px-6 py-3 font-black text-family-ink shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5">
                Open planner
              </Link>
            </div>
            <p className="mt-4 text-sm font-semibold text-black/45">Starter preview: no account, no billing, no private data.</p>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-2xl shadow-family-berry/10 backdrop-blur">
            <div className="rounded-[1.5rem] bg-family-cloud p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-family-leaf">This week</p>
                  <h2 className="text-2xl font-black">Family rhythm preview</h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black shadow-sm">$150 budget</span>
              </div>

              <div className="space-y-3">
                {weekPreview.map((item) => (
                  <div key={item.day} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                    <div className="mb-3 flex items-center justify-between">
                      <strong>{item.day}</strong>
                      <span className="rounded-full bg-family-honey/20 px-3 py-1 text-xs font-black text-black/60">planned</span>
                    </div>
                    <div className="grid gap-2 text-sm text-black/65">
                      <div className="rounded-2xl bg-family-cream px-3 py-2"><strong>Dinner:</strong> {item.meal}</div>
                      <div className="rounded-2xl bg-family-cream px-3 py-2"><strong>Grocery:</strong> {item.grocery}</div>
                      <div className="rounded-2xl bg-family-cream px-3 py-2"><strong>Family:</strong> {item.rhythm}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {painPoints.map((point) => (
            <div key={point} className="rounded-3xl border border-black/5 bg-white/70 p-5 text-lg font-black shadow-sm">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-family-ink p-6 text-white shadow-2xl shadow-black/10 md:p-8">
          <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-family-honey">How Harbor helps</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">A simple loop families can actually use.</h2>
              <p className="mt-4 leading-7 text-white/65">
                Start with meals, let the grocery list follow, then keep the week visible for everyone.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-family-honey font-black text-family-ink">{index + 1}</div>
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
