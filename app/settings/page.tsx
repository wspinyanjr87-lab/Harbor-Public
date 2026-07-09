import HarborShell from "@/components/harbor/HarborShell";
import { Bell, Cake, CalendarDays, CheckCircle2, Heart, Home, LockKeyhole, Mail, Palette, Plus, Shield, Trash2, UserRound, Users, Utensils } from "lucide-react";

const peopleTypes = ["Adult", "Child", "Pet", "Other"];
const permissions = [
  { name: "Manager", detail: "Can see and edit everything.", icon: Shield },
  { name: "Planner", detail: "Can update meals, groceries, and events.", icon: CalendarDays },
  { name: "Viewer", detail: "Can view family plans without editing.", icon: LockKeyhole }
];

const samplePeople = [
  { name: "William", role: "Manager", type: "Adult", color: "border-[#D4AF37]" },
  { name: "Victoria", role: "Manager", type: "Adult", color: "border-rose-300" },
  { name: "Add your next person", role: "Choose access", type: "Child / Pet / Other", color: "border-dashed border-slate-600" }
];

const preferences = [
  { title: "Meals", text: "Breakfast, lunch, dinner, baking, and snack shelves.", icon: Utensils },
  { title: "Calendar", text: "Practices, pickups, birthdays, appointments, and family time.", icon: CalendarDays },
  { title: "Memories", text: "Photo notes, small wins, family moments, and archives.", icon: Heart },
  { title: "Notifications", text: "Future reminders for meals, events, groceries, and chores.", icon: Bell }
];

export default function SettingsPage() {
  return (
    <HarborShell active="home">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-5 py-8 lg:px-10 lg:py-12">
        <header className="flex flex-col gap-5 border-b border-white/5 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]/80">Setup Center</p>
            <h1 className="harbor-serif mt-3 text-5xl font-semibold text-[#D4AF37] lg:text-6xl">Make Harbor yours.</h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-400">Add your people, decide who can edit what, pick your household rhythm, and get Harbor ready for a real family launch.</p>
          </div>
          <a className="rounded-2xl bg-[#D4AF37] px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#B5942B]" href="/">Back to Harbor Home</a>
        </header>

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
                  <input className="w-full rounded-2xl border border-[#D4AF37]/20 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" defaultValue="The Harbor Home" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Primary Email</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-white/[0.04] px-4 py-3">
                    <Mail className="h-4 w-4 text-[#D4AF37]" />
                    <input className="min-w-0 flex-1 bg-transparent text-white outline-none" placeholder="you@email.com" />
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
                <button className="flex items-center gap-2 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-3 text-sm font-bold text-[#D4AF37]" type="button"><Plus className="h-4 w-4" /> Add Person</button>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {samplePeople.map((person) => (
                  <article className={`rounded-3xl border bg-white/[0.03] p-5 ${person.color}`} key={person.name}>
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]"><UserRound className="h-6 w-6" /></div>
                      <button className="text-slate-600 hover:text-red-300" type="button"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <h3 className="text-lg font-bold text-white">{person.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{person.type}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{person.role}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Name</span>
                  <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" placeholder="Name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Type</span>
                  <select className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]">
                    {peopleTypes.map((type) => <option key={type}>{type}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Birthday</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <Cake className="h-4 w-4 text-[#D4AF37]" />
                    <input className="min-w-0 flex-1 bg-transparent text-white outline-none" placeholder="MM/DD/YY" />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Access</span>
                  <select className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]">
                    <option>Manager</option>
                    <option>Planner</option>
                    <option>Viewer</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              {preferences.map((pref) => {
                const Icon = pref.icon;
                return (
                  <article className="harbor-glass rounded-3xl p-6" key={pref.title}>
                    <Icon className="mb-4 h-7 w-7 text-[#D4AF37]" />
                    <h3 className="harbor-serif text-2xl font-semibold text-white">{pref.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{pref.text}</p>
                    <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-slate-300">
                      <input className="harbor-checkbox" defaultChecked type="checkbox" /> Enable
                    </label>
                  </article>
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
                {["Setup page exists", "People flow drafted", "Roles visible", "Starter preferences ready", "Backend save pending"].map((item, index) => (
                  <div className="flex items-center gap-3" key={item}>
                    <CheckCircle2 className={`h-5 w-5 ${index === 4 ? "text-slate-600" : "text-[#D4AF37]"}`} />
                    <span className="text-sm font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </HarborShell>
  );
}
