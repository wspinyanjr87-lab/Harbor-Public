import type { ReactNode } from "react";
import Link from "next/link";
import { CalendarDays, ChefHat, Home, Settings, ShoppingCart } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Home", icon: Home, active: true },
  { href: "/planner", label: "Planner", icon: CalendarDays },
  { href: "/recipes", label: "Recipes", icon: ChefHat },
  { href: "/grocery", label: "Grocery", icon: ShoppingCart },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/settings", label: "Settings", icon: Settings }
];

const mobileNav = nav;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-family-cream">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-family-berry/20 bg-family-berry/10 text-family-berry">
              <Home size={21} />
            </div>
            <div>
              <div className="text-2xl font-black leading-none tracking-tight text-family-berry">Harbor</div>
              <div className="text-xs font-medium leading-5 text-black/55">Family meals. Connected home.</div>
            </div>
          </Link>
          <div className="rounded-2xl bg-family-berry px-3 py-2 text-xs font-black text-white shadow-lg shadow-family-berry/20">
            Home
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={`mobile-${item.label}`}
                href={item.href}
                className={
                  item.active
                    ? "flex shrink-0 items-center gap-2 rounded-2xl bg-family-berry px-4 py-2 text-xs font-black text-white shadow-md shadow-family-berry/20"
                    : "flex shrink-0 items-center gap-2 rounded-2xl bg-family-cloud px-4 py-2 text-xs font-bold text-family-ink"
                }
              >
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-black/10 bg-white/80 px-6 py-7 backdrop-blur md:flex md:flex-col">
        <Link href="/" className="mb-8 block">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-family-berry/20 bg-family-berry/10 text-family-berry">
              <Home size={24} />
            </div>
            <div className="text-4xl font-black leading-none tracking-tight text-family-berry">Harbor</div>
          </div>
          <div className="mt-5 text-base font-medium leading-6 text-black/60">
            Family meals.<br />
            Connected home.
          </div>
        </Link>

        <nav className="space-y-3">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={
                  item.active
                    ? "flex items-center gap-4 rounded-3xl bg-family-berry px-5 py-4 text-base font-black text-white shadow-lg shadow-family-berry/20"
                    : "flex items-center gap-4 rounded-3xl px-5 py-4 text-base font-bold text-black/75 transition hover:bg-family-cloud hover:text-family-ink"
                }
              >
                <Icon size={21} strokeWidth={1.9} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-5 pt-7">
          <div className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-family-berry/10 text-xl">🏡</div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-black text-family-ink">The Andersens</div>
              <div className="text-sm font-medium text-black/45">4 members</div>
            </div>
            <span className="text-black/35">⌄</span>
          </div>

          <div className="rounded-3xl border border-family-berry/10 bg-family-cream p-5 shadow-sm">
            <p className="text-2xl font-black leading-tight text-family-ink">Family is our favorite place</p>
            <div className="mt-5 text-5xl">🪴</div>
          </div>
        </div>
      </aside>

      <section className="md:pl-64">
        <div className="mx-auto max-w-7xl p-4 pb-8 md:p-8">{children}</div>
      </section>
    </main>
  );
}
