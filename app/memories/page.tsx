"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import HarborShell from "@/components/harbor/HarborShell";
import HarborNextStep from "@/components/harbor/HarborNextStep";
import { Camera, Edit3, Heart, ImagePlus, PlusCircle, Save, Trash2, X } from "lucide-react";

type MemoryCategory = "Family Moment" | "School" | "Birthday" | "Meal Win" | "Trip" | "Milestone" | "Funny Moment" | "Other";
type Memory = {
  id: string;
  title: string;
  date: string;
  note: string;
  category: MemoryCategory;
  image?: string;
  favorite: boolean;
  createdAt: string;
};

type MemoryFilter = "All Moments" | "Recent" | "Favorites";

const storageKey = "harbor-memories-v1";
const categories: MemoryCategory[] = ["Family Moment", "School", "Birthday", "Meal Win", "Trip", "Milestone", "Funny Moment", "Other"];

function todayInputValue() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function emptyDraft() {
  return {
    title: "",
    date: todayInputValue(),
    note: "",
    category: "Family Moment" as MemoryCategory,
    image: "" as string,
    favorite: false
  };
}

function formatMemoryDate(value: string) {
  if (!value) return "Undated";
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [filter, setFilter] = useState<MemoryFilter>("All Moments");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyDraft);
  const [message, setMessage] = useState("Add a photo, a note, or both.");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setMemories(JSON.parse(stored) as Memory[]);
    } catch {
      setMessage("Saved memories could not be loaded from this browser.");
    }
  }, []);

  function persist(next: Memory[]) {
    setMemories(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      setMessage("This browser is out of memory space. Remove a large photo or delete an older memory.");
    }
  }

  const filteredMemories = useMemo(() => {
    const sorted = [...memories].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
    if (filter === "Favorites") return sorted.filter((memory) => memory.favorite);
    if (filter === "Recent") return sorted.slice(0, 6);
    return sorted;
  }, [filter, memories]);

  function openNewMemory() {
    setEditingId(null);
    setDraft(emptyDraft());
    setShowForm(true);
    setMessage("Photo and note are both optional, but give the memory a title.");
  }

  function editMemory(memory: Memory) {
    setEditingId(memory.id);
    setDraft({ title: memory.title, date: memory.date, note: memory.note, category: memory.category, image: memory.image || "", favorite: memory.favorite });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setDraft(emptyDraft());
  }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Choose an image file for this memory.");
      return;
    }

    if (file.size > 1_500_000) {
      setMessage("That photo is too large for browser storage. Choose one under about 1.5 MB for now.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setDraft((current) => ({ ...current, image: String(reader.result || "") }));
    reader.onerror = () => setMessage("That photo could not be read.");
    reader.readAsDataURL(file);
  }

  function saveMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) {
      setMessage("Give the memory a title before saving.");
      return;
    }

    if (editingId) {
      const next = memories.map((memory) => memory.id === editingId ? { ...memory, ...draft, title } : memory);
      persist(next);
      setMessage("Memory updated.");
    } else {
      const memory: Memory = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ...draft,
        title,
        image: draft.image || undefined,
        createdAt: new Date().toISOString()
      };
      persist([memory, ...memories]);
      setMessage("Memory saved in this browser.");
    }

    closeForm();
  }

  function toggleFavorite(id: string) {
    persist(memories.map((memory) => memory.id === id ? { ...memory, favorite: !memory.favorite } : memory));
  }

  function deleteMemory(id: string) {
    if (!window.confirm("Delete this memory?")) return;
    persist(memories.filter((memory) => memory.id !== id));
    setMessage("Memory deleted.");
  }

  return (
    <HarborShell active="memories">
      <header className="relative h-56 overflow-hidden">
        <img alt="Coastal view" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/35 to-[#020617]/95" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]/80">Family Memory Shelf</p>
          <h1 className="harbor-serif text-5xl font-semibold text-[#D4AF37] sm:text-6xl">Memory Gallery</h1>
          <p className="mt-2 max-w-3xl text-lg font-light text-slate-300">Save the photo, save the story, or just jot down the moment before it slips out the side door.</p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl space-y-8 px-5 py-8 pb-28 lg:px-12 lg:pb-8">
        <section className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              {(["All Moments", "Recent", "Favorites"] as MemoryFilter[]).map((item) => (
                <button className={`harbor-glass rounded-full px-5 py-2 text-sm font-semibold transition ${filter === item ? "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]" : "text-slate-400 hover:text-[#D4AF37]"}`} key={item} onClick={() => setFilter(item)} type="button">{item}</button>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-500">{message}</p>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 py-3 font-bold text-slate-950 transition hover:bg-[#B5942B]" onClick={openNewMemory} type="button"><PlusCircle className="h-5 w-5" /> Add Memory</button>
        </section>

        {showForm ? (
          <section className="harbor-glass rounded-[2rem] border-[#D4AF37]/25 p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">{editingId ? "Edit Memory" : "New Memory"}</p>
                <h2 className="harbor-serif mt-2 text-4xl font-semibold text-[#D4AF37]">Keep this one.</h2>
              </div>
              <button aria-label="Close memory form" className="rounded-full border border-white/10 p-2 text-slate-400 hover:text-white" onClick={closeForm} type="button"><X className="h-5 w-5" /></button>
            </div>

            <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={saveMemory}>
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Title</span>
                  <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="The day we..." value={draft.title} />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Date</span>
                    <input className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} type="date" value={draft.date} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Category</span>
                    <select className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value as MemoryCategory }))} value={draft.category}>
                      {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Story or Note</span>
                  <textarea className="min-h-36 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraft((current) => ({ ...current, note: event.target.value }))} placeholder="What happened, what was funny, what should nobody forget?" value={draft.note} />
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <input checked={draft.favorite} className="harbor-checkbox" onChange={(event) => setDraft((current) => ({ ...current, favorite: event.target.checked }))} type="checkbox" />
                  <Heart className={`h-5 w-5 ${draft.favorite ? "fill-[#D4AF37] text-[#D4AF37]" : "text-slate-500"}`} />
                  <span className="text-sm font-semibold text-slate-300">Mark as a favorite</span>
                </label>
              </div>

              <div className="space-y-4">
                <label className="block cursor-pointer rounded-3xl border border-dashed border-[#D4AF37]/30 bg-[#D4AF37]/5 p-5 text-center transition hover:bg-[#D4AF37]/10">
                  {draft.image ? <img alt="Memory preview" className="mb-4 h-56 w-full rounded-2xl object-cover" src={draft.image} /> : <div className="mb-4 grid h-56 place-items-center rounded-2xl bg-black/20"><ImagePlus className="h-12 w-12 text-[#D4AF37]/60" /></div>}
                  <span className="text-sm font-bold text-[#D4AF37]">{draft.image ? "Replace Photo" : "Add a Photo"}</span>
                  <input accept="image/*" className="hidden" onChange={handleImage} type="file" />
                </label>
                {draft.image ? <button className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-400 hover:text-red-300" onClick={() => setDraft((current) => ({ ...current, image: "" }))} type="button">Remove Photo</button> : null}
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-4 font-bold text-slate-950 transition hover:bg-[#B5942B]" type="submit"><Save className="h-5 w-5" /> {editingId ? "Update Memory" : "Save Memory"}</button>
              </div>
            </form>
          </section>
        ) : null}

        {filteredMemories.length ? (
          <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredMemories.map((memory) => (
              <article className={`harbor-glass group overflow-hidden rounded-3xl transition hover:-translate-y-1 ${memory.favorite ? "border-[#D4AF37]/35" : ""}`} key={memory.id}>
                {memory.image ? <img alt={memory.title} className="h-64 w-full object-cover" src={memory.image} /> : <div className="grid h-52 place-items-center bg-gradient-to-br from-[#D4AF37]/10 to-slate-950"><Camera className="h-12 w-12 text-[#D4AF37]/45" /></div>}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{memory.category} • {formatMemoryDate(memory.date)}</p>
                      <h2 className="harbor-serif mt-2 text-2xl font-semibold text-white">{memory.title}</h2>
                    </div>
                    <button aria-label={memory.favorite ? "Remove from favorites" : "Add to favorites"} className="shrink-0" onClick={() => toggleFavorite(memory.id)} type="button"><Heart className={`h-5 w-5 ${memory.favorite ? "fill-[#D4AF37] text-[#D4AF37]" : "text-slate-600 hover:text-[#D4AF37]"}`} /></button>
                  </div>
                  {memory.note ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">{memory.note}</p> : <p className="mt-3 text-sm italic text-slate-500">A photo worth keeping.</p>}
                  <div className="mt-5 flex gap-3 border-t border-white/5 pt-4">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-bold text-slate-300 hover:text-[#D4AF37]" onClick={() => editMemory(memory)} type="button"><Edit3 className="h-4 w-4" /> Edit</button>
                    <button className="flex items-center justify-center rounded-xl border border-white/10 px-3 py-2 text-slate-500 hover:text-red-300" onClick={() => deleteMemory(memory.id)} type="button"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="harbor-glass rounded-[2rem] border-dashed p-10 text-center lg:p-16">
            <Camera className="mx-auto h-14 w-14 text-[#D4AF37]/55" />
            <h2 className="harbor-serif mt-5 text-4xl font-semibold text-[#D4AF37]">{memories.length ? "Nothing in this filter." : "No memories yet."}</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">{memories.length ? "Try All Moments or save another favorite." : "Start with a picture, a sentence, or both. Harbor will keep the shelf ready."}</p>
            <button className="mt-6 rounded-2xl bg-[#D4AF37] px-6 py-3 font-bold text-slate-950" onClick={openNewMemory} type="button">Add the First Memory</button>
          </section>
        )}

        <HarborNextStep
          title="Return home with the week in motion."
          text="Meals, groceries, calendar events, and memories now form the first working Harbor loop."
          href="/"
          action="Back to Harbor Home"
        />
      </div>
    </HarborShell>
  );
}
