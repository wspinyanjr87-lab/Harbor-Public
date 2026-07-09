import HarborShell from "@/components/harbor/HarborShell";
import HarborNextStep from "@/components/harbor/HarborNextStep";
import { budgetStarterRecipes, featuredBudgetIngredients, weeklyBudgetMeals } from "@/lib/harborStarterData";
import { CalendarCheck, ChefHat, Clock, DollarSign, Flame, ListChecks, Plus, Search, Users } from "lucide-react";

const filters = ["All", "Budget", "Quick Fix", "One Pan", "Family Dinner"];

export default function PlannerPage() {
  return (
    <HarborShell active="planner">
      <header className="relative h-52 overflow-hidden">
        <img alt="Kitchen scene" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2000&auto=format&fit=crop" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/35 to-[#020617]/95" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]/80">Free / Standard Starter Shelf</p>
          <h1 className="harbor-serif mt-2 text-5xl font-semibold text-[#D4AF37]">Meal Planner</h1>
          <p className="mt-2 max-w-3xl text-slate-300">Budget-friendly family meals first. Premium seafood and fancy meals can live in upgraded packs later.</p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8 lg:px-10">
        <div className="grid gap-8 xl:grid-cols-[1fr_384px]">
          <section className="space-y-8">
            <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="w-full rounded-2xl border border-[#D4AF37]/20 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#D4AF37]" placeholder="Search budget family recipes..." type="text" />
              </div>
              <div className="flex flex-wrap gap-3">
                {filters.map((filter, index) => (
                  <a className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest ${index === 0 ? "bg-[#D4AF37] text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`} href="/planner" key={filter}>{filter}</a>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {budgetStarterRecipes.map((recipe) => (
                <article className={`harbor-glass group overflow-hidden rounded-3xl ${recipe.featured ? "border-[#D4AF37]/30" : ""}`} key={recipe.title}>
                  <div className="relative h-44 overflow-hidden">
                    <img alt={recipe.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" src={recipe.image} />
                    <div className="absolute left-3 top-3 rounded-lg border border-[#D4AF37]/40 bg-slate-950/80 px-2 py-1 text-[10px] font-bold uppercase text-[#D4AF37]">{recipe.tag}</div>
                    {recipe.featured ? <span className="absolute right-3 top-3 rounded-lg border border-emerald-400/40 bg-slate-950/80 px-2 py-1 text-[10px] font-bold uppercase text-emerald-300">Free Starter</span> : null}
                  </div>
                  <div className="p-5">
                    <h2 className="harbor-serif text-2xl font-semibold text-white">{recipe.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {recipe.people}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {recipe.time}</span>
                      <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {recipe.level}</span>
                      <span className="flex items-center gap-1 text-emerald-300"><DollarSign className="h-3.5 w-3.5" /> {recipe.cost}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-[#D4AF37]">{recipe.ingredients}</span>
                      <a className="grid h-9 w-9 place-items-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-slate-950" href="/grocery"><Plus className="h-4 w-4" /></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-8">
            <section className="harbor-glass rounded-3xl border-l-4 border-l-[#D4AF37] p-6">
              <h2 className="harbor-serif mb-5 flex items-center gap-2 text-2xl font-semibold text-[#D4AF37]"><CalendarCheck className="h-5 w-5" /> Budget Week Table</h2>
              <div className="space-y-4">
                {weeklyBudgetMeals.map((item) => (
                  <a className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/[0.04]" href="/grocery" key={item.day}>
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-800 text-xs font-bold uppercase text-[#D4AF37]">{item.day}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-100">{item.meal}</p>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">{item.type}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="harbor-glass rounded-3xl p-6">
              <h2 className="harbor-serif mb-4 flex items-center gap-2 text-2xl font-semibold text-white"><ListChecks className="h-5 w-5 text-[#D4AF37]" /> Featured Ingredients</h2>
              <p className="mb-4 text-xs text-slate-400">Currently viewing: Cheesy Chicken Rice Bake</p>
              <ul className="space-y-2">
                {featuredBudgetIngredients.map(([name, amount]) => (
                  <li className="flex items-center justify-between border-b border-white/5 py-2 text-sm" key={name}>
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> {name}</span>
                    <span className="text-slate-400">{amount}</span>
                  </li>
                ))}
              </ul>
              <a className="mt-6 block w-full rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 py-3 text-center text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-slate-950" href="/grocery">Open Grocery List</a>
            </section>

            <section className="rounded-3xl border border-[#D4AF37]/10 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/15 p-6">
              <div className="mb-3 flex items-center gap-3"><ChefHat className="h-7 w-7 text-[#D4AF37]" /><h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">Budget Rule</h3></div>
              <p className="harbor-serif text-lg italic leading-7 text-slate-300">&quot;Free and Standard should start with repeatable, cheap family meals. Fancy packs can come later.&quot;</p>
            </section>
          </aside>
        </div>

        <HarborNextStep
          title="Turn meals into groceries."
          text="The next step after choosing starter meals is checking the grocery list that supports the budget week."
          href="/grocery"
          action="Continue to Grocery List"
        />
      </div>
    </HarborShell>
  );
}
