import HarborShell from "@/components/harbor/HarborShell";
import { BookOpen, CalendarDays, ChevronRight, Clock, Coffee, Settings, ShoppingCart, Soup, UserPlus, Utensils, Camera } from "lucide-react";

const quickActions = [
  { label: "Start Setup", description: "Add people and household basics", href: "/onboarding", icon: UserPlus },
  { label: "Setup Center", description: "Roles, preferences, and launch settings", href: "/settings", icon: Settings },
  { label: "Plan Meals", description: "Budget recipes for the week", href: "/planner", icon: Soup },
  { label: "Grocery List", description: "Open the budget grocery list", href: "/grocery", icon: ShoppingCart }
];

const todayItems = [
  { time: "Step 1", title: "Add your people", detail: "Adults, kids, pets, helpers, birthdays, and access levels", icon: UserPlus },
  { time: "Step 2", title: "Pick the household rhythm", detail: "Choose meals, calendar, groceries, memories, and notifications", icon: Settings },
  { time: "Step 3", title: "Plan the first budget week", detail: "Use Free / Standard starter meals before premium packs", icon: Utensils },
  { time: "Step 4", title: "Review the family home base", detail: "Calendar, grocery list, and memories become the daily dashboard", icon: Coffee }
];

const nextItems = [
  { day: "SETUP", title: "Add your people", detail: "Create household members and roles", href: "/onboarding", accent: "border-[#D4AF37] text-[#D4AF37]" },
  { day: "CENTER", title: "Edit household settings", detail: "Access, preferences, and launch controls", href: "/settings", accent: "border-emerald-400 text-emerald-300" },
  { day: "MEALS", title: "Build the first week", detail: "Budget-friendly meal starter shelf", href: "/planner", accent: "border-sky-400 text-sky-300" },
  { day: "GROCERY", title: "Check the grocery list", detail: "Staples tied to the starter meals", href: "/grocery", accent: "border-purple-400 text-purple-300" }
];

const routeCards = [
  { label: "Calendar", description: "See the family month view", href: "/calendar", icon: CalendarDays },
  { label: "Meals", description: "Open budget recipe planning", href: "/planner", icon: Utensils },
  { label: "Groceries", description: "Review weekly grocery staples", href: "/grocery", icon: ShoppingCart },
  { label: "Memories", description: "Start the family memory shelf", href: "/memories", icon: Camera }
];

const snapshotCards = [
  { label: "Meals Snapshot", title: "Budget Starter Shelf", description: "Free / Standard recipes ready to customize", href: "/planner", icon: Utensils },
  { label: "Grocery Snapshot", title: "Budget Grocery List", description: "Realistic weekly staples", href: "/grocery", icon: ShoppingCart },
  { label: "People Snapshot", title: "Add People", description: "Family, pets, helpers, and access roles", href: "/onboarding", icon: UserPlus }
];

export default function HarborHomePage() {
  return (
    <HarborShell active="home">
      <div className="relative min-h-[230px] overflow-hidden border-b border-[#D4AF37]/10 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.22),transparent_34%),linear-gradient(135deg,#020617_0%,#07111f_52%,#0f172a_100%)] lg:min-h-[260px]">
        <div className="absolute right-[-8rem] top-[-8rem] h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-6rem] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="relative flex h-full min-h-[230px] flex-col justify-end px-6 py-10 lg:min-h-[260px] lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]/80">Harbor Family HQ</p>
          <h1 className="harbor-serif mt-3 text-5xl font-semibold leading-none text-[#D4AF37] lg:text-6xl">Welcome to Harbor.</h1>
          <p className="mt-3 max-w-2xl text-base font-light text-slate-300 lg:text-lg">Set up your household, plan budget-friendly meals, build the grocery list, and keep the family rhythm in one place.</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-10 px-5 py-8 lg:px-10 lg:py-12">
        <section className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-5 lg:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Start Here</p>
              <h2 className="harbor-serif mt-2 text-3xl font-semibold text-[#D4AF37]">Make this household yours first.</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">New users should begin with setup. After that, meals, groceries, calendar, and memories all make sense at a glance.</p>
            </div>
            <a className="flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#B5942B]" href="/onboarding">
              Start First-Run Setup
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section aria-label="Primary Harbor actions" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a className="harbor-glass group rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45" href={action.href} key={action.label}>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#D4AF37]/10 transition group-hover:scale-110">
                  <Icon className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="harbor-serif text-xl font-semibold tracking-wide text-white">{action.label}</h2>
                    <p className="mt-1 text-sm text-slate-400">{action.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#D4AF37]/70" />
                </div>
              </a>
            );
          })}
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
          <div className="harbor-glass rounded-3xl p-6 lg:p-8">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Launch Path</p>
                <h2 className="harbor-serif mt-2 text-4xl font-semibold text-[#D4AF37]">What to do first</h2>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">No dead ends</p>
            </div>

            <div className="relative ml-4 border-l border-white/10 pl-8">
              <div className="space-y-10">
                {todayItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="relative" key={`${item.time}-${item.title}`}>
                      <span className="absolute -left-[43px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-[#D4AF37] bg-[#020617]" />
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-4">
                          <div className="hidden h-11 w-11 place-items-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37] sm:grid">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">{item.time}</p>
                            <h3 className="mt-1 text-lg font-semibold text-slate-100">{item.title}</h3>
                            <p className="text-sm text-slate-400">{item.detail}</p>
                          </div>
                        </div>
                        <Clock className="hidden h-5 w-5 text-slate-600 sm:block" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="harbor-glass rounded-3xl p-6 lg:p-7">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="harbor-serif text-3xl font-semibold text-[#D4AF37]">Next Clicks</h2>
                <CalendarDays className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div className="space-y-4">
                {nextItems.map((item) => (
                  <a className={`block rounded-xl border-l-4 bg-white/[0.025] p-4 transition hover:bg-white/[0.06] ${item.accent}`} href={item.href} key={`${item.day}-${item.title}`}>
                    <p className="text-xs font-bold uppercase tracking-[0.22em]">{item.day}</p>
                    <h3 className="mt-2 text-sm font-semibold text-slate-100">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/15 p-6">
              <p className="harbor-serif text-xl italic leading-8 text-slate-200">&quot;Set up the people first. The plans make sense after the household exists.&quot;</p>
            </div>
          </aside>
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/80">Main Areas</p>
              <h2 className="harbor-serif text-3xl font-semibold text-white">Everything visible has a path</h2>
            </div>
            <a className="text-sm font-bold text-[#D4AF37] hover:text-white" href="/settings">Manage setup</a>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {routeCards.map((card) => {
              const Icon = card.icon;
              return (
                <a className="rounded-3xl border border-white/5 bg-[#010411] p-5 transition hover:border-[#D4AF37]/30 hover:bg-white/[0.03]" href={card.href} key={card.label}>
                  <Icon className="mb-4 h-6 w-6 text-[#D4AF37]" />
                  <h3 className="harbor-serif text-2xl font-semibold text-white">{card.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{card.description}</p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {snapshotCards.map((card) => {
            const Icon = card.icon;
            return (
              <a className="harbor-glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:border-[#D4AF37]/35" href={card.href} key={card.label}>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/80">{card.label}</p>
                <div className="mt-5 flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
                    <Icon className="h-7 w-7 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    <p className="text-sm text-slate-400">{card.description}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#D4AF37]">
                  Open
                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </section>
      </div>
    </HarborShell>
  );
}
