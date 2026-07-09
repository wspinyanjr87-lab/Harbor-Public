"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Cake, CalendarDays, CheckCircle2, Heart, Home, LockKeyhole, Mail, Palette, Plus, Save, Shield, Trash2, UserRound, Users, Utensils } from "lucide-react";
import HarborNextStep from "@/components/harbor/HarborNextStep";

type Person = {
  id: string;
  name: string;
  type: "Adult" | "Child" | "Pet" | "Other";
  birthday: string;
  access: "Manager" | "Planner" | "Viewer";
};

type Preferences = {
  meals: boolean;
  calendar: boolean;
  grocery: boolean;
  memories: boolean;
  notifications: boolean;
};

const storageKey = "harbor-family-setup-v1";
const peopleTypes: Person["type"][] = ["Adult", "Child", "Pet", "Other"];
const accessLevels: Person["access"][] = ["Manager", "Planner", "Viewer"];

const permissions = [
  { name: "Manager", detail: "Can see and edit everything.", icon: Shield },
  { name: "Planner", detail: "Can update meals, groceries, and events.", icon: CalendarDays },
  { name: "Viewer", detail: "Can view family plans without editing.", icon: LockKeyhole }
];

const preferenceCards = [
  { key: "meals", title: "Meals", text: "Breakfast, lunch, dinner, baking, and snack shelves.", icon: Utensils },
  { key: "calendar", title: "Calendar", text: "Practices, pickups, birthdays, appointments, and family time.", icon: CalendarDays },
  { key: "grocery", title: "Grocery", text: "A weekly grocery list that follows the meal plan.", icon: Home },
  { key: "memories", title: "Memories", text: "Photo notes, small wins, family moments, and archives.", icon: Heart },
  { key: "notifications", title: "Notifications", text: "Future reminders for meals, events, groceries, and chores.", icon: Bell }
] as const;

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const defaultPeople: Person[] = [
  { id: "primary-adult", name: "Primary Adult", type: "Adult", birthday: "", access: "Manager" }
];

const defaultPreferences: Preferences = {
  meals: true,
  calendar: true,
  grocery: true,
  memories: true,
  notifications: false
};

type SetupPayload = {
  householdName: string;
  primaryEmail: string;
  people: Person[];
  preferences: Preferences;
  savedAt?: string;
};

function normalizeSetup(setup: Partial<SetupPayload> | null): SetupPayload {
  return {
    householdName: setup?.householdName || "The Harbor Home",
    primaryEmail: setup?.primaryEmail || "",
    people: setup?.people?.length ? setup.people : defaultPeople,
    preferences: { ...defaultPreferences, ...(setup?.preferences || {}) },
    savedAt: setup?.savedAt,
  };
}

export default function HarborSetupForm() {
  const router = useRouter();
  const [householdName, setHouseholdName] = useState("The Harbor Home");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [people, setPeople] = useState<Person[]>(defaultPeople);
  const [draftPerson, setDraftPerson] = useState<Person>({ id: "draft", name: "", type: "Adult", birthday: "", access: "Viewer" });
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [databaseSaved, setDatabaseSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("Loading setup center...");

  useEffect(() => {
    let mounted = true;

    function applySetup(setup: Partial<SetupPayload> | null) {
      const normalized = normalizeSetup(setup);
      setHouseholdName(normalized.householdName);
      setPrimaryEmail(normalized.primaryEmail);
      setPeople(normalized.people);
      setPreferences(normalized.preferences);
      if (normalized.savedAt) setSavedAt(normalized.savedAt);
    }

    async function loadSetup() {
      let browserSetup: SetupPayload | null = null;

      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          browserSetup = normalizeSetup(JSON.parse(stored) as Partial<SetupPayload>);
          applySetup(browserSetup);
        }
      } catch {
        setMessage("Saved browser setup could not be loaded. You can safely start again.");
      }

      try {
        const response = await fetch("/api/setup", { cache: "no-store" });
        if (!response.ok) throw new Error("Database setup unavailable.");

        const data = (await response.json()) as { setup?: Partial<SetupPayload> | null };
        if (!mounted) return;

        if (data.setup) {
          const databaseSetup = normalizeSetup(data.setup);
          applySetup(databaseSetup);
          window.localStorage.setItem(storageKey, JSON.stringify(databaseSetup));
          setDatabaseSaved(true);
          setMessage("Loaded from Harbor database.");
        } else {
          setMessage(browserSetup ? "Loaded from this browser. Database setup is empty." : "No saved setup yet. Start here.");
        }
      } catch {
        if (mounted) {
          setDatabaseSaved(false);
          setMessage(browserSetup ? "Database load unavailable. Using this browser setup." : "Database load unavailable. Start with browser setup.");
        }
      }
    }

    loadSetup();

    return () => {
      mounted = false;
    };
  }, []);

  const enabledCount = useMemo(() => Object.values(preferences).filter(Boolean).length, [preferences]);
  const isReady = householdName.trim().length > 1 && people.some((person) => person.name.trim().length > 1) && enabledCount > 0;

  async function saveSetup(nextMessage = "Setup saved.") {
    const now = new Date().toLocaleString();
    const payload = { householdName, primaryEmail, people, preferences, savedAt: now };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    setSavedAt(now);

    if (!isReady) {
      setMessage(nextMessage);
      return false;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/setup", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) throw new Error("Database save unavailable.");

      const data = (await response.json()) as { setup?: Partial<SetupPayload> };
      const saved = normalizeSetup({ ...payload, ...(data.setup || {}) });
      window.localStorage.setItem(storageKey, JSON.stringify({ ...saved, savedAt: now }));
      setDatabaseSaved(true);
      setMessage("Saved to Harbor database.");
      return true;
    } catch {
      setDatabaseSaved(false);
      setMessage("Saved in this browser. Database save unavailable.");
      return true;
    } finally {
      setIsSaving(false);
    }
  }

  async function finishSetup() {
    const saved = await saveSetup(
      isReady ? "Setup saved. Continue to Meal Planner." : "Add a household name, one person, and at least one enabled section before finishing.",
    );

    if (saved && isReady) {
      router.push("/planner");
    }
  }

  function addPerson() {
    if (!draftPerson.name.trim()) {
      setMessage("Add a name before adding a person.");
      return;
    }

    setPeople((current) => [...current, { ...draftPerson, id: makeId(), name: draftPerson.name.trim() }]);
    setDraftPerson({ id: "draft", name: "", type: "Adult", birthday: "", access: "Viewer" });
    setMessage("Person added. Save setup when you are ready.");
  }

  function removePerson(id: string) {
    setPeople((current) => current.filter((person) => person.id !== id));
    setMessage("Person removed. Save setup to keep the change.");
  }

  function togglePreference(key: keyof Preferences) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
    setMessage("Preference changed. Save setup when you are ready.");
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 border-b border-white/5 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]/80">Setup Center</p>
          <h1 className="harbor-serif mt-3 text-5xl font-semibold text-[#D4AF37] lg:text-6xl">Make Harbor yours.</h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-400">Add your people, decide who can edit what, pick your household rhythm, save the setup, then continue into meal planning.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-6 py-3 text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/15 disabled:opacity-60" disabled={isSaving} onClick={() => saveSetup()} type="button">
            <span className="inline-flex items-center gap-2"><Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Setup"}</span>
          </button>
          <button className="rounded-2xl bg-[#D4AF37] px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#B5942B] disabled:opacity-60" disabled={isSaving} onClick={finishSetup} type="button">Finish Setup</button>
        </div>
      </header>

      <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-5" id="setup-required">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Setup Status</p>
            <p className="mt-2 text-sm text-slate-300">{message}</p>
            {savedAt ? <p className="mt-1 text-xs text-slate-500">Last saved: {savedAt}</p> : null}
          </div>
          <div className={`rounded-2xl px-4 py-2 text-sm font-bold ${isReady ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>
            {isReady ? "Ready to continue" : "Needs household, person, and section"}
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="harbor-glass rounded-[2rem] p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Household</p>
                <h2 className="harbor-serif mt-2 text-4xl font-semibold text-[#D4AF37]">Harbor profile</h2>
              </div>
              <Home className="h-8 w-8 text-[#D4AF37]" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Household Name</span>
                <input className="w-full rounded-2xl border border-[#D4AF37]/20 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setHouseholdName(event.target.value)} value={householdName} />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Primary Email</span>
                <div className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-white/[0.04] px-4 py-3">
                  <Mail className="h-4 w-4 text-[#D4AF37]" />
                  <input className="min-w-0 flex-1 bg-transparent text-white outline-none" onChange={(event) => setPrimaryEmail(event.target.value)} placeholder="you@email.com" value={primaryEmail} />
                </div>
              </label>
            </div>
          </section>

          <section className="harbor-glass rounded-[2rem] p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Family Members</p>
                <h2 className="harbor-serif mt-2 text-4xl font-semibold text-[#D4AF37]">Add your people</h2>
              </div>
              <Users className="hidden h-8 w-8 text-[#D4AF37] sm:block" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {people.map((person) => (
                <article className="rounded-3xl border border-white/5 bg-white/[0.03] p-5" key={person.id}>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]"><UserRound className="h-6 w-6" /></div>
                    <button className="text-slate-600 hover:text-red-300" onClick={() => removePerson(person.id)} type="button"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <h3 className="text-lg font-bold text-white">{person.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{person.type}{person.birthday ? ` • ${person.birthday}` : ""}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{person.access}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <label className="block lg:col-span-2">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Name</span>
                <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraftPerson((current) => ({ ...current, name: event.target.value }))} placeholder="Name" value={draftPerson.name} />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Type</span>
                <select className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraftPerson((current) => ({ ...current, type: event.target.value as Person["type"] }))} value={draftPerson.type}>
                  {peopleTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Birthday</span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <Cake className="h-4 w-4 text-[#D4AF37]" />
                  <input className="min-w-0 flex-1 bg-transparent text-white outline-none" onChange={(event) => setDraftPerson((current) => ({ ...current, birthday: event.target.value }))} placeholder="MM/DD/YY" value={draftPerson.birthday} />
                </div>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Access</span>
                <select className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setDraftPerson((current) => ({ ...current, access: event.target.value as Person["access"] }))} value={draftPerson.access}>
                  {accessLevels.map((access) => <option key={access}>{access}</option>)}
                </select>
              </label>
            </div>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-4 py-3 font-bold text-slate-950 transition hover:bg-[#B5942B]" onClick={addPerson} type="button"><Plus className="h-4 w-4" /> Add Person</button>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            {preferenceCards.map((pref) => {
              const Icon = pref.icon;
              const key = pref.key as keyof Preferences;
              const enabled = preferences[key];
              return (
                <button className={`harbor-glass rounded-3xl p-6 text-left transition hover:border-[#D4AF37]/30 ${enabled ? "border-[#D4AF37]/25" : "opacity-70"}`} key={pref.key} onClick={() => togglePreference(key)} type="button">
                  <Icon className="mb-4 h-7 w-7 text-[#D4AF37]" />
                  <h3 className="harbor-serif text-2xl font-semibold text-white">{pref.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{pref.text}</p>
                  <span className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${enabled ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "bg-slate-800 text-slate-400"}`}>
                    {enabled ? "Enabled" : "Disabled"}
                  </span>
                </button>
              );
            })}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="harbor-glass rounded-[2rem] p-6">
            <h2 className="harbor-serif text-3xl font-semibold text-[#D4AF37]">Access Roles</h2>
            <div className="mt-5 space-y-4">
              {permissions.map((permission) => {
                const Icon = permission.icon;
                return (
                  <article className="rounded-3xl border border-white/5 bg-white/[0.03] p-4" key={permission.name}>
                    <Icon className="mb-3 h-5 w-5 text-[#D4AF37]" />
                    <h3 className="font-bold text-white">{permission.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{permission.detail}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6">
            <Palette className="mb-4 h-7 w-7 text-[#D4AF37]" />
            <h2 className="harbor-serif text-3xl font-semibold text-[#D4AF37]">Theme</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Launch theme is Harbor Dark. Light and seasonal themes can come after the product path is finished.</p>
          </section>

          <section className="harbor-glass rounded-[2rem] p-6">
            <h2 className="harbor-serif text-3xl font-semibold text-[#D4AF37]">Launch Status</h2>
            <div className="mt-5 space-y-4">
              {[
                ["Household name", householdName.trim().length > 1],
                ["At least one person", people.length > 0],
                ["At least one section enabled", enabledCount > 0],
                ["Saved in browser", Boolean(savedAt)],
                ["Saved to Harbor database", databaseSaved]
              ].map(([item, complete]) => (
                <div className="flex items-center gap-3" key={String(item)}>
                  <CheckCircle2 className={`h-5 w-5 ${complete ? "text-[#D4AF37]" : "text-slate-600"}`} />
                  <span className="text-sm font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <HarborNextStep
        title="Plan the first budget-friendly week."
        text="Once setup is saved, continue into meals. Harbor saves to the database when available and falls back to this browser if the database is unavailable."
        href={isReady ? "/planner" : "#setup-required"}
        action={isReady ? "Continue to Meal Planner" : "Finish setup first"}
      />
    </div>
  );
}
