import HarborShell from "@/components/harbor/HarborShell";
import { calendarEventsByDay } from "@/lib/harborStarterData";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Heart, Plus, Users } from "lucide-react";

type CalendarEvent = { label: string; tone: "gold" | "sky" | "emerald" | "purple" };
type CalendarDay = {
  number: string;
  muted?: boolean;
  today?: boolean;
  events?: CalendarEvent[];
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days: CalendarDay[] = [
  { number: "29", muted: true },
  { number: "30", muted: true },
  ...Array.from({ length: 31 }, (_, index): CalendarDay => {
    const number = String(index + 1);
    return {
      number,
      today: number === "14",
      events: calendarEventsByDay[number]
    };
  }),
  { number: "1", muted: true },
  { number: "2", muted: true }
];

const toneClasses = {
  gold: "border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]",
  sky: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  purple: "border-purple-500/20 bg-purple-500/10 text-purple-300"
};

const agenda = [
  { time: "07:30 AM", title: "School + work launch", detail: "Morning checklist and breakfast", icon: Users, border: "border-sky-400", text: "text-sky-300" },
  { time: "04:30 PM", title: "Grocery run", detail: "Budget staples for weekly meals", icon: CalendarDays, border: "border-emerald-400", text: "text-emerald-300" },
  { time: "06:30 PM", title: "Family dinner", detail: "Cheesy chicken rice bake", icon: Heart, border: "border-[#D4AF37]", text: "text-[#D4AF37]" }
];

const statuses = [
  { name: "Manager", status: "Setup Ready", icon: Check, tone: "emerald" },
  { name: "Planner", status: "Needs Invite", icon: Clock, tone: "amber" },
  { name: "Kids", status: "View Later", icon: Users, tone: "sky" }
];

export default function CalendarPage() {
  return (
    <HarborShell active="calendar">
      <header className="border-b border-white/5 px-6 py-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="harbor-serif text-5xl font-semibold text-[#D4AF37]">Family Calendar</h1>
            <div className="mt-3 flex items-center gap-4">
              <a className="text-white/60 transition hover:text-[#D4AF37]" href="/settings"><ChevronLeft /></a>
              <p className="harbor-serif text-2xl tracking-wide text-white">October 2024</p>
              <a className="text-white/60 transition hover:text-[#D4AF37]" href="/settings"><ChevronRight /></a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="harbor-glass flex rounded-xl p-1">
              <button className="rounded-lg bg-[#D4AF37]/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]" type="button">Month</button>
              <a className="rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 transition hover:text-white" href="/settings">Week</a>
            </div>
            <a className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-[#D4AF37]/10 transition hover:bg-[#B5942B]" href="/settings">
              <Plus className="h-4 w-4" /> Add Event
            </a>
          </div>
        </div>
      </header>

      <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1fr_360px] lg:px-12">
        <section>
          <div className="harbor-glass overflow-hidden rounded-3xl border-white/5">
            <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
              {weekdays.map((day) => <div className="py-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]/80" key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7">
              {days.map((day, index) => (
                <div className={`min-h-[104px] border-b border-r border-white/5 p-2 sm:min-h-[120px] sm:p-3 ${day.muted ? "bg-black/20 opacity-30" : ""} ${day.today ? "border-2 border-[#D4AF37]/25 bg-[#D4AF37]/5" : ""}`} key={`${day.number}-${index}`}>
                  <span className={`text-sm ${day.today ? "font-bold text-[#D4AF37]" : "text-slate-400"}`}>{day.number}</span>
                  <div className="mt-2 space-y-1">
                    {day.events?.map((event) => (
                      <div className={`truncate rounded border px-2 py-1 text-[10px] ${toneClasses[event.tone]}`} key={event.label}>{event.label}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-6">
            {[
              ["Family Time", "bg-[#D4AF37]"],
              ["Kids Activities", "bg-sky-300"],
              ["Budget / Errands", "bg-emerald-400"],
              ["Planning", "bg-purple-400"]
            ].map(([label, color]) => (
              <div className="flex items-center gap-2" key={label}>
                <span className={`h-2 w-2 rounded-full ${color}`} />
                <span className="text-xs uppercase tracking-widest text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <section>
            <h2 className="harbor-serif mb-5 text-3xl font-semibold text-[#D4AF37]">Today&apos;s Agenda</h2>
            <div className="space-y-4">
              {agenda.map((item) => {
                const Icon = item.icon;
                return (
                  <article className={`harbor-glass rounded-2xl border-l-4 ${item.border} p-5 transition hover:bg-white/5`} key={item.title}>
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${item.text}`}>{item.time}</p>
                      <Icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.detail}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="harbor-serif mb-5 text-3xl font-semibold text-[#D4AF37]">Harbor Status</h2>
            <div className="harbor-glass space-y-4 rounded-3xl p-6">
              {statuses.map((person) => {
                const Icon = person.icon;
                const tone = person.tone === "emerald" ? "text-emerald-400 border-emerald-400/50 bg-emerald-400/15" : person.tone === "amber" ? "text-amber-400 border-amber-400/50 bg-amber-400/15" : "text-sky-400 border-sky-400/50 bg-sky-400/15";
                return (
                  <div className="flex items-center justify-between gap-4" key={person.name}>
                    <div className="flex items-center gap-3">
                      <div className={`grid h-8 w-8 place-items-center rounded-full border ${tone}`}><Icon className="h-4 w-4" /></div>
                      <span className="text-sm font-semibold text-slate-200">{person.name}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${tone.split(" ")[0]}`}>{person.status}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </HarborShell>
  );
}
