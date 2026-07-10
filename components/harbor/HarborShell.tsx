import type { ReactNode } from "react";
import { Anchor, CalendarDays, Camera, Home, Settings, ShoppingCart, User, UserPlus, Utensils } from "lucide-react";

type HarborSection = "home" | "calendar" | "planner" | "grocery" | "memories";

type NavItem = {
  key: HarborSection;
  label: string;
  shortLabel: string;
  href: string;
  icon: typeof Home;
};

const navItems: NavItem[] = [
  { key: "home", label: "Harbor Home", shortLabel: "Home", href: "/", icon: Home },
  { key: "calendar", label: "Calendar", shortLabel: "Calendar", href: "/calendar", icon: CalendarDays },
  { key: "planner", label: "Recipe Planner", shortLabel: "Meals", href: "/planner", icon: Utensils },
  { key: "grocery", label: "Grocery List", shortLabel: "Grocery", href: "/grocery", icon: ShoppingCart },
  { key: "memories", label: "Memories", shortLabel: "Memories", href: "/memories", icon: Camera }
];

function HarborMark() {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#D4AF37] text-[#020617] shadow-lg shadow-[#D4AF37]/20">
      <Anchor className="h-6 w-6" strokeWidth={2.4} />
    </div>
  );
}

export default function HarborShell({ active, children }: { active: HarborSection; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 z-40 hidden w-72 flex-col border-r border-white/5 bg-[#010411] lg:flex">
          <div className="flex items-center gap-3 p-8">
            <HarborMark />
            <div>
              <p className="harbor-serif text-2xl font-semibold tracking-[0.22em] text-[#D4AF37]">HARBOR</p>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]/80">Family HQ</p>
            </div>
          </div>

          <nav className="mt-4 flex-1 space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.key;

              return (
                <a
                  className={`flex items-center gap-4 rounded-r-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-l-4 border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/15 to-transparent text-[#D4AF37]"
                      : "border-l-4 border-transparent text-slate-400 hover:text-[#D4AF37]"
                  }`}
                  href={item.href}
                  key={item.key}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="space-y-3 px-6 pb-3">
            <a className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-3 text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/15" href="/onboarding">
              <UserPlus className="h-4 w-4" />
              Start Setup
            </a>
            <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-300 transition hover:text-[#D4AF37]" href="/settings">
              <Settings className="h-4 w-4" />
              Setup Center
            </a>
          </div>

          <div className="space-y-4 p-6 pt-3">
            <div className="harbor-glass flex items-center gap-3 rounded-2xl p-4">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/30 bg-slate-900">
                <User className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Account</p>
                <p className="text-sm font-bold text-slate-200">Harbor Household</p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4">
              <Anchor className="mb-3 h-5 w-5 text-[#D4AF37]" />
              <p className="harbor-serif text-lg italic leading-6 text-[#D4AF37]">Anchored in Faith</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Joshua 24:15</p>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 pb-20 lg:ml-72 lg:pb-0">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-[#020617]/85 px-5 py-4 backdrop-blur-xl lg:hidden">
            <a className="flex items-center gap-3" href="/">
              <HarborMark />
              <div>
                <p className="harbor-serif text-xl font-semibold tracking-[0.22em] text-[#D4AF37]">HARBOR</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/70">Family HQ</p>
              </div>
            </a>
            <a aria-label="Open Setup Center" className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-[#D4AF37]/30 hover:text-[#D4AF37]" href="/settings">
              <Settings className="h-5 w-5" />
            </a>
          </header>

          {children}

          <footer className="mt-auto border-t border-white/5 bg-[#010411] px-5 py-8 text-center">
            <p className="harbor-serif text-2xl italic tracking-wide text-[#D4AF37]">&quot;As for me and my house, we will serve the Lord.&quot;</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.32em] text-slate-500">Joshua 24:15</p>
          </footer>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-white/10 bg-[#010411]/95 px-1 py-2 backdrop-blur-xl lg:hidden" aria-label="Harbor mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <a
              className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[9px] font-bold uppercase tracking-wide transition ${isActive ? "bg-[#D4AF37]/12 text-[#D4AF37]" : "text-slate-500 hover:text-slate-200"}`}
              href={item.href}
              key={item.key}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate">{item.shortLabel}</span>
            </a>
          );
        })}
      </nav>
    </main>
  );
}
