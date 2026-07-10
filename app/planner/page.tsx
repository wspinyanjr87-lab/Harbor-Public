"use client";

import { useMemo, useState } from "react";
import HarborShell from "@/components/harbor/HarborShell";
import HarborNextStep from "@/components/harbor/HarborNextStep";
import { budgetStarterRecipes, featuredBudgetIngredients, weeklyBudgetMeals } from "@/lib/harborStarterData";
import { getRecipeSlug } from "@/lib/recipeDetails";
import { CalendarCheck, ChefHat, Clock, Crown, DollarSign, Flame, ListChecks, Plus, Search, Sparkles, Users } from "lucide-react";

const filters = ["All", "Breakfast", "Lunch", "Dinner", "Bakery", "Munchies"] as const;
const recipeGroups = ["Breakfast", "Lunch", "Dinner", "Bakery", "Munchies"] as const;

type RecipeFilter = (typeof filters)[number];

const mealPlans = [
  {
    name: "Free",
    tone: "emerald",
    meals: ["Dinner", "Late-night snack"],
    extras: ["Starter grocery list", "Manual meal selection"],
  },
  {
    name: "Standard",
    tone: "sky",
    meals: ["Lunch", "Dinner", "Late-night snack"],
    extras: ["Expanded recipe library", "Better weekly planning"],
  },
  {
    name: "Premium",
    tone: "gold",
    meals: ["Breakfast", "Lunch", "Dinner", "Late-night snack"],
    extras: ["Smarter grocery model", "Live updates", "Early and prerelease feature access"],
  },
] as const;

export default function PlannerPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<RecipeFilter>("All");

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return budgetStarterRecipes.filter((recipe) => {
      const matchesCategory = activeFilter === "All" || recipe.category === activeFilter;
      const matchesQuery = !normalizedQuery || [recipe.title, recipe.tag, recipe.category, recipe.cost, recipe.edition]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, query]);

  const visibleGroups = recipeGroups.filter((group) => filteredRecipes.some((recipe) => recipe.category === group));

  return (
    <HarborShell active="planner">
      <header className="relative h-52 overflow-hidden">
        <img alt="Kitchen scene" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2000&auto=format&fit=crop" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/35 to-[#020617]/95" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]/80">Harbor Meal Plans</p>
          <h1 className="harbor-serif mt-2 text-5xl font-semibold text-[#D4AF37]">Meal Planner</h1>
          <p className="mt-2 max-w-3xl text-slate-300">A flexible recipe library shaped by household preferences, allergies, and the plan level that fits the family.</p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8 lg:px-10">
        <section className="grid gap-5 lg:grid-cols-3">
          {mealPlans.map((plan) => {
            const isPremium = plan.name === "Premium";
            const tone = plan.tone === "emerald"
              ? "border-emerald-400/25 bg-emerald-400/5 text-emerald-300"
              : plan.tone === "sky"
                ? "border-sky-400/25 bg-sky-400/5 text-sky-300"
                : "border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]";
            return (
              <article className={`rounded-[2rem] border p-6 ${tone}`} key={plan.name}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em]">{plan.name} Plan</p>
                    <h2 className="harbor-serif mt-2 text-3xl font-semibold text-white">{plan.meals.join(" • ")}</h2>
                  </div>
                  {isPremium ? <Crown className="h-7 w-7" /> : <Sparkles className="h-6 w-6" />}
                </div>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {plan.extras.map((extra) => <li key={extra}>• {extra}</li>)}
                </ul>
              </article>
            );
          })}
        </section>

        <div className="grid gap-8 xl:grid-cols-[1fr_384px]">
          <section className="space-y-10">
            <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full rounded-2xl border border-[#D4AF37]/20 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#D4AF37]"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search family recipes..."
                  type="search"
                  value={query}
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <button
                    className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest ${activeFilter === filter ? "bg-[#D4AF37] text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    type="button"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-400">Showing <span className="font-bold text-[#D4AF37]">{filteredRecipes.length}</span> recipes</p>
              {(query || activeFilter !== "All") ? (
                <button className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white" onClick={() => { setQuery(""); setActiveFilter("All"); }} type="button">Clear filters</button>
              ) : null}
            </div>

            {visibleGroups.length ? visibleGroups.map((group) => {
              const recipes = filteredRecipes.filter((recipe) => recipe.category === group);
              return (
                <section className="space-y-5" id={group.toLowerCase()} key={group}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/80">{group}</p>
                      <h2 className="harbor-serif text-3xl font-semibold text-white">{recipes.length} family-friendly ideas</h2>
                    </div>
                    <a className="text-xs font-bold uppercase tracking-widest text-slate-500 transition hover:text-[#D4AF37]" href="/settings">Manage food preferences</a>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {recipes.map((recipe) => {
                      const slug = getRecipeSlug(recipe.title);
                      return (
                        <article className={`harbor-glass group overflow-hidden rounded-3xl ${recipe.featured ? "border-[#D4AF37]/30" : ""}`} key={recipe.title}>
                          <a className="block" href={`/planner/${slug}`}>
                            <div className="relative h-44 overflow-hidden">
                              <img alt={recipe.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" src={recipe.image} />
                              <div className="absolute left-3 top-3 rounded-lg border border-[#D4AF37]/40 bg-slate-950/80 px-2 py-1 text-[10px] font-bold uppercase text-[#D4AF37]">{recipe.tag}</div>
                              <span className={`absolute right-3 top-3 rounded-lg border bg-slate-950/80 px-2 py-1 text-[10px] font-bold uppercase ${recipe.edition === "Free" ? "border-emerald-400/40 text-emerald-300" : "border-sky-400/40 text-sky-300"}`}>{recipe.edition}</span>
                            </div>
                          </a>
                          <div className="p-5">
                            <a href={`/planner/${slug}`}><h3 className="harbor-serif text-2xl font-semibold text-white transition hover:text-[#D4AF37]">{recipe.title}</h3></a>
                            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {recipe.people}</span>
                              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {recipe.time}</span>
                              <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {recipe.level}</span>
                              <span className="flex items-center gap-1 text-emerald-300"><DollarSign className="h-3.5 w-3.5" /> {recipe.cost}</span>
                            </div>
                            <div className="mt-5 flex items-center justify-between gap-4">
                              <a className="text-xs font-bold text-[#D4AF37] hover:text-white" href={`/planner/${slug}`}>View recipe · {recipe.ingredients}</a>
                              <a aria-label={`Add ${recipe.title} to grocery list`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-slate-950" href={`/grocery?recipe=${slug}`}><Plus className="h-4 w-4" /></a>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            }) : (
              <div className="harbor-glass rounded-3xl p-10 text-center">
                <h2 className="harbor-serif text-3xl text-white">No recipes found.</h2>
                <p className="mt-2 text-slate-400">Try another search or clear the current filter.</p>
              </div>
            )}
          </section>

          <aside className="space-y-8">
            <section className="harbor-glass rounded-3xl border-l-4 border-l-[#D4AF37] p-6">
              <h2 className="harbor-serif mb-5 flex items-center gap-2 text-2xl font-semibold text-[#D4AF37]"><CalendarCheck className="h-5 w-5" /> Budget Week Table</h2>
              <div className="space-y-4">
                {weeklyBudgetMeals.map((item) => (
                  <a className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/[0.04]" href={`/planner/${getRecipeSlug(item.meal)}`} key={item.day}>
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
              <p className="mb-4 text-xs text-slate-400">Cheesy Chicken Rice Bake starter list</p>
              <ul className="space-y-2">
                {featuredBudgetIngredients.map(([name, amount]) => (
                  <li className="flex items-center justify-between border-b border-white/5 py-2 text-sm" key={name}>
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> {name}</span>
                    <span className="text-slate-400">{amount}</span>
                  </li>
                ))}
              </ul>
              <a className="mt-6 block w-full rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 py-3 text-center text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-slate-950" href="/grocery?recipe=cheesy-chicken-rice-bake">Add to Grocery List</a>
            </section>

            <section className="rounded-3xl border border-[#D4AF37]/10 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/15 p-6">
              <div className="mb-3 flex items-center gap-3"><ChefHat className="h-7 w-7 text-[#D4AF37]" /><h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">Planner Rule</h3></div>
              <p className="harbor-serif text-lg italic leading-7 text-slate-300">&quot;Food preferences belong to the household. Harbor should guide, not guess.&quot;</p>
            </section>
          </aside>
        </div>

        <HarborNextStep title="Turn meals into groceries." text="Choose a recipe, review its steps, and add its grocery notes to the family list." href="/grocery" action="Continue to Grocery List" />
      </div>
    </HarborShell>
  );
}
