import Link from "next/link";
import { CalendarDays, ChefHat, Home, ListChecks, Settings, ShoppingCart, Sparkles } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/planner", label: "Planner", icon: ListChecks },
  { href: "/recipes", label: "Recipes", icon: ChefHat },
  { href: "/grocery", label: "Grocery", icon: ShoppingCart },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/sample", label: "Sample", icon: Sparkles }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-family-cream">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-black/10 bg-white/75 p-5 backdrop-blur md:block">
        <Link href="/" className="mb-8 block">
          <div className="text-2xl font-black tracking-tight">Harbor</div>
          <div className="text-sm text-black/55">Family planner</div>
        </Link>

        <nav className="space-y-2">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold text-black/70 hover:bg-family-cloud"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <section className="md:pl-64">
        <div className="mx-auto max-w-6xl p-5 md:p-8">{children}</div>
      </section>
    </main>
  );
}
