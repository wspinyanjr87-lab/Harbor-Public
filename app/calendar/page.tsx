"use client";

import { useEffect, useMemo, useState } from "react";
import HarborShell from "@/components/harbor/HarborShell";
import HarborNextStep from "@/components/harbor/HarborNextStep";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, Trash2, X } from "lucide-react";

type EventCategory = "family" | "kids" | "errands" | "planning";

type HarborEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  category: EventCategory;
  notes: string;
};

type CalendarDay = {
  key: string;
  number: string;
  dateKey?: string;
  muted?: boolean;
  today?: boolean;
};

const storageKey = "harbor-calendar-events-v1";
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const categoryMeta: Record<EventCategory, { label: string; className: string; dot: string }> = {
  family: { label: "Family Time", className: "border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]", dot: "bg-[#D4AF37]" },
  kids: { label: "Kids Activities", className: "border-sky-500/20 bg-sky-500/10 text-sky-300", dot: "bg-sky-300" },
  errands: { label: "Budget / Errands", className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300", dot: "bg-emerald-400" },
  planning: { label: "Planning", className: "border-purple-500/20 bg-purple-500/10 text-purple-300", dot: "bg-purple-400" }
};

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sameLocalDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getMonthDays(viewDate: Date, today: Date): CalendarDay[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const previousMonthLastDay = new Date(year, month, 0).getDate();
  const leadingDays = firstDay.getDay();
  const cells: CalendarDay[] = [];

  for (let index = leadingDays - 1; index >= 0; index -= 1) {
    const number = previousMonthLastDay - index;
    cells.push({ key: `prev-${number}`, number: String(number), muted: true });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day);
    cells.push({
      key: `current-${day}`,
      number: String(day),
      dateKey: formatDateKey(date),
      today: sameLocalDay(date, today)
    });
  }

  const trailingDays = cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7);
  for (let day = 1; day <= trailingDays; day += 1) {
    cells.push({ key: `next-${day}`, number: String(day), muted: true });
  }

  return cells;
}

function formatTime(time: string) {
  if (!time) return "All day";
  const [hour, minute] = time.split(":").map(Number);
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export default function CalendarPage() {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [events, setEvents] = useState<HarborEvent[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("Events are saved on this device.");
  const [draft, setDraft] = useState({
    title: "",
    date: formatDateKey(new Date()),
    time: "",
    category: "family" as EventCategory,
    notes: ""
  });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setEvents(JSON.parse(stored) as HarborEvent[]);
    } catch {
      setMessage("Saved calendar data could not be loaded. New events will still work.");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(storageKey, JSON.stringify(events));
  }, [events, loaded]);

  const days = useMemo(() => getMonthDays(viewDate, today), [viewDate, today]);
  const monthLabel = useMemo(() => viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" }), [viewDate]);
  const todayKey = formatDateKey(today);
  const todayLabel = today.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, HarborEvent[]>>((grouped, event) => {
      grouped[event.date] = [...(grouped[event.date] || []), event].sort((a, b) => a.time.localeCompare(b.time));
      return grouped;
    }, {});
  }, [events]);

  const todayEvents = eventsByDate[todayKey] || [];
  const upcomingEvents = useMemo(
    () => events.filter((event) => event.date >= todayKey).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0, 5),
    [events, todayKey]
  );

  function moveMonth(direction: number) {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  function jumpToToday() {
    setViewDate(new Date());
  }

  function openEventForm(date = formatDateKey(new Date())) {
    setDraft({ title: "", date, time: "", category: "family", notes: "" });
    setShowForm(true);
  }

  function addEvent() {
    if (!draft.title.trim() || !draft.date) {
      setMessage("Add an event title and date first.");
      return;
    }

    const nextEvent: HarborEvent = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: draft.title.trim(),
      date: draft.date,
      time: draft.time,
      category: draft.category,
      notes: draft.notes.trim()
    };

    setEvents((current) => [...current, nextEvent]);
    const eventDate = new Date(`${draft.date}T12:00:00`);
    setViewDate(new Date(eventDate.getFullYear(), eventDate.getMonth(), 1));
    setMessage(`${nextEvent.title} added to the calendar.`);
    setShowForm(false);
  }

  function deleteEvent(id: string) {
    setEvents((current) => current.filter((event) => event.id !== id));
    setMessage("Event removed.");
  }

  return (
    <HarborShell active="calendar">
      <header className="border-b border-white/5 px-6 py-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="harbor-serif text-5xl font-semibold text-[#D4AF37]">Family Calendar</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <button aria-label="Previous month" className="text-white/60 transition hover:text-[#D4AF37]" onClick={() => moveMonth(-1)} type="button"><ChevronLeft /></button>
              <p className="harbor-serif text-2xl tracking-wide text-white">{monthLabel}</p>
              <button aria-label="Next month" className="text-white/60 transition hover:text-[#D4AF37]" onClick={() => moveMonth(1)} type="button"><ChevronRight /></button>
              <button className="rounded-full border border-[#D4AF37]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37] transition hover:bg-[#D4AF37]/10" onClick={jumpToToday} type="button">Today</button>
            </div>
            <p className="mt-2 text-sm text-slate-500">Synced to this device&apos;s local date: {todayLabel}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="harbor-glass rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Month View</div>
            <button className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-[#D4AF37]/10 transition hover:bg-[#B5942B]" onClick={() => openEventForm()} type="button">
              <Plus className="h-4 w-4" /> Add Event
            </button>
          </div>
        </div>
      </header>

      <div className="space-y-8 px-4 py-8 sm:px-6 lg:px-12">
        <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#D4AF37]/5 px-4 py-3 text-sm text-slate-300">{message}</div>

        {showForm ? (
          <section className="harbor-glass rounded-3xl border-[#D4AF37]/25 p-5 lg:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Calendar Event</p>
                <h2 className="harbor-serif mt-2 text-3xl font-semibold text-white">Add something to the family week</h2>
              </div>
              <button aria-label="Close event form" className="rounded-full border border-white/10 p-2 text-slate-400 hover:text-white" onClick={() => setShowForm(false)} type="button"><X className="h-5 w-5" /></button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <label className="xl:col-span-2">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Event Title</span>
                <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Family dinner, practice, appointment..." value={draft.title} />
              </label>
              <label>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Date</span>
                <input className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} type="date" value={draft.date} />
              </label>
              <label>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Time</span>
                <input className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, time: event.target.value }))} type="time" value={draft.time} />
              </label>
              <label>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Category</span>
                <select className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value as EventCategory }))} value={draft.category}>
                  {Object.entries(categoryMeta).map(([key, meta]) => <option key={key} value={key}>{meta.label}</option>)}
                </select>
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Notes</span>
              <textarea className="min-h-24 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, notes: event.target.value }))} placeholder="Optional details" value={draft.notes} />
            </label>

            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-slate-300 hover:text-white" onClick={() => setShowForm(false)} type="button">Cancel</button>
              <button className="rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-slate-950 hover:bg-[#B5942B]" onClick={addEvent} type="button">Save Event</button>
            </div>
          </section>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
          <section>
            <div className="harbor-glass overflow-x-auto rounded-3xl border-white/5">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
                  {weekdays.map((day) => <div className="py-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]/80" key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7">
                  {days.map((day) => {
                    const dayEvents = day.dateKey ? eventsByDate[day.dateKey] || [] : [];
                    return (
                      <button className={`min-h-[118px] border-b border-r border-white/5 p-3 text-left ${day.muted ? "cursor-default bg-black/20 opacity-30" : "hover:bg-white/[0.03]"} ${day.today ? "border-2 border-[#D4AF37]/25 bg-[#D4AF37]/5" : ""}`} disabled={day.muted} key={day.key} onClick={() => day.dateKey && openEventForm(day.dateKey)} type="button">
                        <span className={`text-sm ${day.today ? "font-bold text-[#D4AF37]" : "text-slate-400"}`}>{day.number}</span>
                        <div className="mt-2 space-y-1">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div className={`truncate rounded border px-2 py-1 text-[10px] ${categoryMeta[event.category].className}`} key={event.id}>{event.time ? `${formatTime(event.time)} · ` : ""}{event.title}</div>
                          ))}
                          {dayEvents.length > 3 ? <p className="text-[10px] text-slate-500">+{dayEvents.length - 3} more</p> : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-5">
              {Object.entries(categoryMeta).map(([key, meta]) => (
                <div className="flex items-center gap-2" key={key}>
                  <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                  <span className="text-xs uppercase tracking-widest text-slate-400">{meta.label}</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-8">
            <section>
              <h2 className="harbor-serif mb-5 text-3xl font-semibold text-[#D4AF37]">Today&apos;s Agenda</h2>
              <div className="space-y-4">
                {todayEvents.length ? todayEvents.map((event) => (
                  <article className={`harbor-glass rounded-2xl border-l-4 p-5 ${categoryMeta[event.category].className}`} key={event.id}>
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest">{formatTime(event.time)}</p>
                      <button aria-label={`Delete ${event.title}`} className="text-slate-500 hover:text-red-300" onClick={() => deleteEvent(event.id)} type="button"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    {event.notes ? <p className="mt-1 text-sm text-slate-400">{event.notes}</p> : null}
                  </article>
                )) : (
                  <div className="harbor-glass rounded-2xl p-5 text-sm text-slate-400">
                    Nothing scheduled today. Tap a calendar day or Add Event to build the day.
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="harbor-serif mb-5 text-3xl font-semibold text-[#D4AF37]">Coming Up</h2>
              <div className="harbor-glass space-y-3 rounded-3xl p-5">
                {upcomingEvents.length ? upcomingEvents.map((event) => (
                  <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0" key={event.id}>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{new Date(`${event.date}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })} · {formatTime(event.time)}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{event.title}</p>
                    </div>
                    <button aria-label={`Delete ${event.title}`} className="text-slate-600 hover:text-red-300" onClick={() => deleteEvent(event.id)} type="button"><Trash2 className="h-4 w-4" /></button>
                  </div>
                )) : <p className="text-sm text-slate-400">No upcoming events yet.</p>}
              </div>
            </section>
          </aside>
        </div>

        <HarborNextStep
          title="Save the moments that make the week yours."
          text="After the household rhythm is visible on the calendar, the next step is opening Memories so the app feels warm, personal, and family-owned."
          href="/memories"
          action="Continue to Memories"
        />
      </div>
    </HarborShell>
  );
}
