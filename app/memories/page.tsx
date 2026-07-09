import HarborShell from "@/components/harbor/HarborShell";
import HarborNextStep from "@/components/harbor/HarborNextStep";
import { PlusCircle } from "lucide-react";

const memories = [
  { title: "First Family Note", date: "Starter", detail: "Add the first memory after the household is set up.", image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop" },
  { title: "Meal Win", date: "Starter", detail: "Save favorite budget meals and family reactions.", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop" },
  { title: "Calendar Moment", date: "Starter", detail: "Capture birthdays, practices, school moments, and family nights.", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop" }
];

export default function MemoriesPage() {
  return (
    <HarborShell active="memories">
      <header className="relative h-52 overflow-hidden">
        <img alt="Coastal view" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/35 to-[#020617]/95" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]/80">Starter Memory Shelf</p>
          <h1 className="harbor-serif text-6xl font-semibold text-[#D4AF37]">Memory Gallery</h1>
          <p className="mt-2 text-lg font-light text-slate-300">Give the app a warm place for family moments after setup, meals, groceries, and calendar are in motion.</p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8 lg:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {["All Moments", "Recent", "Favorites"].map((filter, index) => (
              <a className={`harbor-glass rounded-full px-5 py-2 text-sm font-semibold ${index === 0 ? "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]" : "text-slate-400 hover:text-[#D4AF37]"}`} href="/memories" key={filter}>{filter}</a>
            ))}
          </div>
          <a className="flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-6 py-3 font-bold text-slate-950 transition hover:bg-[#B5942B]" href="/settings"><PlusCircle className="h-5 w-5" /> Add Memory</a>
        </div>

        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {memories.map((memory) => (
            <a className="harbor-glass group relative h-96 overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40" href="/memories" key={memory.title}>
              <img alt={memory.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={memory.image} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/20 to-transparent opacity-100 transition duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{memory.date}</p>
                <h2 className="harbor-serif text-2xl font-semibold text-white">{memory.title}</h2>
                <p className="mt-1 text-sm text-slate-300">{memory.detail}</p>
              </div>
            </a>
          ))}
        </section>

        <div className="flex justify-center pt-6">
          <a className="harbor-glass rounded-2xl px-10 py-4 font-semibold text-slate-300 transition hover:text-[#D4AF37]" href="/">Return to Harbor Home</a>
        </div>

        <HarborNextStep
          title="Return to the dashboard and review the full flow."
          text="Memories closes the loop. From here, the user should be able to return home and understand where everything lives."
          href="/"
          action="Back to Harbor Home"
        />
      </div>
    </HarborShell>
  );
}
