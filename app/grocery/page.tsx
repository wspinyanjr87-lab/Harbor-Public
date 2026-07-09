import HarborShell from "@/components/harbor/HarborShell";
import { groceryCategories } from "@/lib/harborStarterData";
import { Beef, Carrot, Coffee, Milk, Package, Plus, PlusCircle, ShoppingBasket, Trash2 } from "lucide-react";

const categoryIcons = {
  Proteins: Beef,
  Pantry: Package,
  "Frozen / Produce": Carrot,
  Dairy: Milk,
  "Breakfast / Snacks": ShoppingBasket
};

const totalItems = groceryCategories.reduce((sum, category) => sum + category.items.length, 0);
const purchasedItems = groceryCategories.reduce((sum, category) => sum + category.items.filter((item) => item.checked).length, 0);

export default function GroceryPage() {
  return (
    <HarborShell active="grocery">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8 lg:px-12">
        <header className="flex flex-col gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D4AF37]/80">Free / Standard Starter List</p>
            <h1 className="harbor-serif mt-2 text-6xl font-semibold text-[#D4AF37]">Grocery List</h1>
            <p className="mt-2 text-lg font-light text-slate-400">Budget staples for a family week, not fancy launch-demo groceries.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">Estimated Total</p>
              <p className="harbor-serif text-3xl font-semibold text-white">$85–$125</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-right">
              <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">Stock Level</p>
              <p className="harbor-serif text-3xl font-semibold text-[#D4AF37]">{purchasedItems} of {totalItems}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <div className="flex w-fit items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
              {['All', 'Purchased', 'Unpurchased'].map((filter, index) => (
                <button className={`rounded-lg px-4 py-2 text-sm font-semibold ${index === 0 ? "bg-[#D4AF37] text-slate-950" : "text-slate-400 hover:text-white"}`} key={filter} type="button">{filter}</button>
              ))}
            </div>

            {groceryCategories.map((category) => {
              const Icon = categoryIcons[category.name as keyof typeof categoryIcons] ?? ShoppingBasket;
              return (
                <section key={category.name}>
                  <h2 className="harbor-serif mb-4 flex items-center gap-2 text-2xl font-semibold text-[#D4AF37]"><Icon className="h-5 w-5" /> {category.name}</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {category.items.map((item) => (
                      <article className="harbor-glass group flex items-center justify-between rounded-2xl p-4" key={item.name}>
                        <label className="flex cursor-pointer items-center gap-4">
                          <input checked={Boolean(item.checked)} className="harbor-checkbox" readOnly type="checkbox" />
                          <span className={`${item.checked ? "text-slate-400 line-through decoration-[#D4AF37]" : "text-white"}`}>{item.name}</span>
                        </label>
                        <button className="text-slate-600 opacity-0 transition group-hover:opacity-100 hover:text-red-300" type="button"><Trash2 className="h-4 w-4" /></button>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <aside className="space-y-6">
            <section className="harbor-glass rounded-3xl border-l-4 border-l-[#D4AF37] p-6">
              <h2 className="harbor-serif mb-5 text-2xl font-semibold text-[#D4AF37]">Add New Item</h2>
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-slate-500">Item Name</span>
                  <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]" placeholder="e.g. Avocado" type="text" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-slate-500">Category</span>
                  <select className="w-full rounded-xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]">
                    {groceryCategories.map((category) => <option key={category.name}>{category.name}</option>)}
                  </select>
                </label>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3 font-bold text-slate-950 transition hover:bg-[#B5942B]" type="button"><Plus className="h-4 w-4" /> Add to List</button>
              </div>
            </section>

            <section className="harbor-glass rounded-3xl p-6">
              <h2 className="harbor-serif mb-4 text-2xl font-semibold text-white">Budget Suggestion</h2>
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3">
                <div className="flex items-center gap-3"><Coffee className="h-5 w-5 text-[#D4AF37]" /><span className="text-sm text-slate-300">Oatmeal or cereal</span></div>
                <button className="text-[#D4AF37] transition hover:scale-110" type="button"><PlusCircle className="h-5 w-5" /></button>
              </div>
              <p className="mt-4 text-center text-xs italic text-slate-500">Cheap breakfast staples matter more than fancy extras in the default list.</p>
            </section>

            <a className="block rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-5 text-center text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-slate-950" href="/planner">Back to Budget Meals</a>
          </aside>
        </section>
      </div>
    </HarborShell>
  );
}
