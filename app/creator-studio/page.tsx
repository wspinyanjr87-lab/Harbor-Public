const stages = [
  {
    label: "01",
    title: "Discover",
    description: "Study hooks, formats, signals, and creative patterns before building a plan."
  },
  {
    label: "02",
    title: "Monetization",
    description: "Score ideas by offer fit, audience intent, and revenue potential."
  },
  {
    label: "03",
    title: "Integrations",
    description: "Park future MCP, upload, and generation connectors behind safe mock-first seams."
  },
  {
    label: "04",
    title: "Studio",
    description: "Turn a prompt and reference into a monthly content plan."
  },
  {
    label: "05",
    title: "Results",
    description: "Preview generated plans, mock media jobs, and publishing history."
  }
];

export default function CreatorStudioPage() {
  return (
    <main className="min-h-screen bg-[#070711] px-5 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Harbor Booster Product</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Harbor Creator Studio</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
            A parked revenue booster lane for turning content signals into creator plans, monetization ideas, and future media workflows.
          </p>
          <div className="mt-6 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm text-violet-100">
            Current status: mock-first product frame. No publishing, no real keys, no live customer data.
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage) => (
            <div key={stage.title} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
              <div className="text-xs font-black text-cyan-200">{stage.label}</div>
              <h2 className="mt-3 text-2xl font-black">{stage.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
