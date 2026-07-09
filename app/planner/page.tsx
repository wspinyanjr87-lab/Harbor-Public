import HarborShell from "@/components/harbor/HarborShell";
import { CalendarCheck, ChefHat, Clock, Flame, ListChecks, Plus, Search, Users, X } from "lucide-react";

const recipes = [
  { title: "Lemon Herb Grilled Salmon", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=900&auto=format&fit=crop", people: "4 Pers.", time: "25m", level: "Med", ingredients: "8 Ingredients", featured: true },
  { title: "Harbor Seafood Risotto", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=900&auto=format&fit=crop", people: "6 Pers.", time: "45m", level: "High", ingredients: "12 Ingredients" },
  { title: "Coastal Green Garden Salad", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=900&auto=format&fit=crop", people: "2 Pers.", time: "15m", level: "Easy", ingredients: "6 Ingredients" },
  { title: "Steamed Mussels in Garlic", image: "https://images.unsplash.com/photo-1541014741259-df5290ce50c7?q=80&w=900&auto=format&fit=crop", people: "4 Pers.", time: "20m", level: "Med", ingredients: "9 Ingredients" }
];

const weekMeals = [
  { day: "Mon", meal: "Lemon Herb Salmon", type: "Dinner" },
  { day: "Tue", meal: "No meal planned" },
  { day: "Wed", meal: "Seafood Risotto", type: "Dinner" }
];

const ingredients = [
  ["Fresh Salmon Fillets", "4 units"],
  ["Lemons", "2 units"],
  ["Fresh Dill", "1 bunch"],
  ["Olive Oil", "50ml"],
  ["Sea Salt & Pepper", "To taste"]
];

export default function PlannerPage() {
  return (
    <HarborShell active="planner">
      <header className="relative h-52 overflow-hidden">
        <img alt="Kitchen scene" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2000&auto=format&fit=crop" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/35 to-[#020617]/95" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
          <h1 className="harbor-serif text-5xl font-semibold text-[#D4AF37]">Meal Planner</h1>
          <p className="mt-2 text-slate-300">Curate your family&apos;s table with coastal-inspired seasonal flavors.</p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-8 xl:grid-cols-[1fr_384px]">
          <section className="space-y-8">
            <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="w-full rounded-2xl border border-[#D4AF37]/20 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#D4AF37]" placeholder="Search our family recipes..." type="text" />
              </div>
              <div className="flex flex-wrap gap-3">
                {['All', 'Coastal', 'Vegetarian', 'Quick Fix'].map((filter, index) => (
                  <button className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest ${index === 0 ? "bg-[#D4AF37] text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`} key={filter} type="button">{filter}</button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {recipes.map((recipe) => (
                <article className={`harbor-glass group overflow-hidden rounded-3xl ${recipe.featured ? "border-[#D4AF37]/30" : ""}`} key={recipe.title}>
                  <div className="relative h-44 overflow-hidden">
                    <img alt={recipe.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" src={recipe.image} />
                    {recipe.featured ? <span className="absolute right-3 top-3 rounded-lg border border-[#D4AF37]/40 bg-slate-950/80 px-2 py-1 text-[10px] font-bold uppercase text-[#D4AF37]">Featured</span> : null}
                  </div>
                  <div className="p-5">
                    <h2 className="harbor-serif text-2xl font-semibold text-white">{recipe.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {recipe.people}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {recipe.time}</span>
                      <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {recipe.level}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-[#D4AF37]">{recipe.ingredients}</span>
                      <button className="grid h-9 w-9 place-items-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-slate-950" type="button"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-8">
            <section className="harbor-glass rounded-3xl border-l-4 border-l-[#D4AF37] p-6">
              <h2 className="harbor-serif mb-5 flex items-center gap-2 text-2xl font-semibold text-[#D4AF37]"><CalendarCheck className="h-5 w-5" /> This Week&apos;s Table</h2>
              <div className="space-y-4">
                {weekMeals.map((item) => (
                  <div className="flex items-center gap-4" key={item.day}>
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-800 text-xs font-bold uppercase text-[#D4AF37]">{item.day}</div>
                    <div className="flex-1">
                      <p className={`${item.type ? "font-semibold text-slate-100" : "italic text-slate-500"}`}>{item.meal}</p>
                      {item.type ? <p className="text-[10px] uppercase tracking-widest text-slate-500">{item.type}</p> : null}
                    </div>
                    <button className={`${item.type ? "text-slate-500 hover:text-red-300" : "text-[#D4AF37] hover:text-white"}`} type="button">{item.type ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="harbor-glass rounded-3xl p-6">
              <h2 className="harbor-serif mb-4 flex items-center gap-2 text-2xl font-semibold text-white"><ListChecks className="h-5 w-5 text-[#D4AF37]" /> Recipe Ingredients</h2>
              <p className="mb-4 text-xs text-slate-400">Currently viewing: Lemon Herb Salmon</p>
              <ul className="space-y-2">
                {ingredients.map(([name, amount]) => (
                  <li className="flex items-center justify-between border-b border-white/5 py-2 text-sm" key={name}>
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> {name}</span>
                    <span className="text-slate-400">{amount}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 py-3 text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-slate-950" type="button">Add All to Grocery List</button>
            </section>

            <section className="rounded-3xl border border-[#D4AF37]/10 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/15 p-6">
              <div className="mb-3 flex items-center gap-3"><ChefHat className="h-7 w-7 text-[#D4AF37]" /><h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">Chef&apos;s Tip</h3></div>
              <p className="harbor-serif text-lg italic leading-7 text-slate-300">&quot;Pat the salmon completely dry before seasoning to ensure the skin gets that perfect harbor-side crispiness.&quot;</p>
            </section>
          </aside>
        </div>
      </div>
    </HarborShell>
  );
}
