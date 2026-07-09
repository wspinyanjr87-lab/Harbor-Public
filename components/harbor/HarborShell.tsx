import type { ReactNode } from "react";
import { Anchor, CalendarDays, Camera, Home, ShoppingCart, User, Utensils } from "lucide-react";

type HarborSection = "home" | "calendar" | "planner" | "grocery" | "memories";

type NavItem = {
  key: HarborSection;
  label: string;
  href: string;
  icon: typeof Home;
};

const navItems: NavItem[] = [
  { key: "home", label: "Harbor Home", href: "/", icon: Home },
  { key: "calendar", label: "Calendar", href: "/calendar", icon: CalendarDays },
  { key: "planner", label: "Recipe Planner", href: "/planner", icon: Utensils },
  { key: "grocery", label: "Grocery List", href: "/grocery", icon: ShoppingCart },
  { key: "memories", label: "Memories", href: "/memories", icon: Camera }
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

          <div className="space-y-4 p-6">
            <div className="harbor-glass flex items-center gap-3 rounded-2xl p-4">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/30 bg-slate-900">
                <User className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Account</p>
                <p className="text-sm font-bold text-slate-200">William Harbor</p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4">
              <Anchor className="mb-3 h-5 w-5 text-[#D4AF37]" />
              <p className="harbor-serif text-lg italic leading-6 text-[#D4AF37]">Anchored in Faith</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Joshua 24:15</p>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 lg:ml-72">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-[#020617]/85 px-5 py-4 backdrop-blur-xl lg:hidden">
            <div className="flex items-center gap-3">
              <HarborMark />
              <div>
                <p className="harbor-serif text-xl font-semibold tracking-[0.22em] text-[#D4AF37]">HARBOR</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/70">Family HQ</p>
              </div>
            </div>
          </header>

          {children}

          <footer className="mt-auto border-t border-white/5 bg-[#010411] px-5 py-8 text-center">
            <p className="harbor-serif text-2xl italic tracking-wide text-[#D4AF37]">&quot;As for me and my house, we will serve the Lord.&quot;</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.32em] text-slate-500">Joshua 24:15</p>
          </footer>
        </section>
      </div>
    </main>
  );
}
