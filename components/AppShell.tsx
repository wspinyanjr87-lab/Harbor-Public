"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, Home, Settings, ShoppingCart, UsersRound, Utensils } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/planner", label: "Meals", icon: Utensils },
  { href: "/recipes", label: "Recipes", icon: ChefHat },
  { href: "/grocery", label: "Groceries", icon: ShoppingCart },
  { href: "/family", label: "Family", icon: UsersRound },
  { href: "/settings", label: "Settings", icon: Settings }
];

const mobileNav = nav;

function isActiveTab(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentTab = nav.find((item) => isActiveTab(pathname, item.href)) ?? nav[0];

  return (
    <main className="min-h-screen bg-family-cream">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-family-berry/20 bg-family-berry/10 text-family-berry">
              <Home size={19} />
            </div>
            <div>
              <div className="text-2xl font-black leading-none tracking-tight text-family-ink">Harbor</div>
              <div className="text-xs font-medium leading-5 text-black/55">Family meals. Connected home.</div>
            </div>
          </Link>
          <div className="rounded-xl bg-family-berry px-3 py-2 text-xs font-bold text-white shadow-md shadow-family-berry/20">
            {currentTab.label}
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const active = isActiveTab(pathname, item.href);

            return (
              <Link
                key={`mobile-${item.label}`}
                href={item.href}
                className={
                  active
                    ? "flex shrink-0 items-center gap-2 rounded-xl bg-family-berry px-3 py-2 text-xs font-bold text-white shadow-md shadow-family-berry/20"
                    : "flex shrink-0 items-center gap-2 rounded-xl bg-family-cloud px-3 py-2 text-xs font-semibold text-family-ink"
                }
              >
                <Icon size={15} strokeWidth={1.9} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-black/10 bg-white/80 px-5 py-5 backdrop-blur md:flex md:flex-col">
        <Link href="/" className="mb-7 block">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-family-berry/20 bg-family-berry/10 text-family-berry">
              <Home size={20} strokeWidth={1.9} />
            </div>
            <div className="text-3xl font-black leading-none tracking-tight text-family-ink">Harbor</div>
          </div>
        </Link>

        <nav className="space-y-1.5">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActiveTab(pathname, item.href);

            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={
                  active
                    ? "flex items-center gap-3 rounded-xl bg-family-berry px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-family-berry/20"
                    : "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-black/75 transition hover:bg-family-cloud hover:text-family-ink"
                }
              >
                <Icon size={17} strokeWidth={1.9} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 pt-5">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-family-berry/10 text-lg">🏡</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-black/55">Welcome back,</div>
              <div className="text-sm font-bold text-family-ink">Maya</div>
            </div>
            <span className="text-black/35">⌄</span>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-3.5 shadow-sm">
            <p className="text-sm font-bold text-family-ink">Invite a family member</p>
            <p className="mt-1 text-xs leading-5 text-black/50">Keep everyone in the loop.</p>
            <button className="mt-3 rounded-xl border border-family-berry/25 bg-white px-4 py-1.5 text-xs font-bold text-family-berry">
              Invite
            </button>
          </div>
        </div>
      </aside>

      <section className="md:pl-64">
        <div className="mx-auto max-w-7xl p-4 pb-8 md:p-8">{children}</div>
      </section>
    </main>
  );
}
