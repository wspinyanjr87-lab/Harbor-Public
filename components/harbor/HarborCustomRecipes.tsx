"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Plus, Trash2, X } from "lucide-react";

type CustomRecipe = {
  id: string;
  title: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Bakery" | "Munchies";
  time: string;
  ingredients: string[];
  steps: string[];
  createdAt: string;
};

const storageKey = "harbor-custom-recipes-v1";
const categories: CustomRecipe["category"][] = ["Breakfast", "Lunch", "Dinner", "Bakery", "Munchies"];

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function HarborCustomRecipes() {
  const [recipes, setRecipes] = useState<CustomRecipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CustomRecipe["category"]>("Dinner");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setRecipes(JSON.parse(stored) as CustomRecipe[]);
    } catch {
      setMessage("Personal recipes could not be loaded from this browser.");
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(recipes));
    } catch {
      setMessage("This browser could not save the personal recipe library.");
    }
  }, [recipes]);

  const sortedRecipes = useMemo(
    () => [...recipes].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [recipes]
  );

  function resetForm() {
    setTitle("");
    setCategory("Dinner");
    setTime("");
    setIngredients("");
    setSteps("");
    setMessage("");
  }

  function saveRecipe() {
    const parsedIngredients = splitLines(ingredients);
    const parsedSteps = splitLines(steps);

    if (!title.trim()) {
      setMessage("Add a recipe name first.");
      return;
    }

    if (!parsedIngredients.length && !parsedSteps.length) {
      setMessage("Add at least one ingredient or one cooking step.");
      return;
    }

    const recipe: CustomRecipe = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: title.trim(),
      category,
      time: time.trim() || "Flexible",
      ingredients: parsedIngredients,
      steps: parsedSteps,
      createdAt: new Date().toISOString(),
    };

    setRecipes((current) => [recipe, ...current]);
    setExpandedId(recipe.id);
    resetForm();
    setShowForm(false);
  }

  function deleteRecipe(id: string) {
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  return (
    <section className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5 lg:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Available on every plan</p>
          <h2 className="harbor-serif mt-2 text-3xl font-semibold text-white">Your Recipe Box</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Free, Standard, and Premium households can all add their own recipes. Upgrades unlock more Harbor-made options and smarter planning, not ownership of your own food ideas.</p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#B5942B]"
          onClick={() => setShowForm((current) => !current)}
          type="button"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Close" : "Add Personal Recipe"}
        </button>
      </div>

      {showForm ? (
        <div className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/50 p-5 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Recipe Name</span>
            <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setTitle(event.target.value)} placeholder="Grandma's chicken casserole" value={title} />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Category</span>
            <select className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setCategory(event.target.value as CustomRecipe["category"])} value={category}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Time</span>
            <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setTime(event.target.value)} placeholder="30 minutes" value={time} />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Ingredients, one per line</span>
            <textarea className="min-h-36 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setIngredients(event.target.value)} placeholder={"2 chicken breasts\n1 cup rice\n1 cup cheese"} value={ingredients} />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Steps, one per line</span>
            <textarea className="min-h-36 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setSteps(event.target.value)} placeholder={"Heat oven to 375°F\nMix ingredients\nBake for 30 minutes"} value={steps} />
          </label>
          {message ? <p className="text-sm text-amber-300 md:col-span-2">{message}</p> : null}
          <button className="rounded-2xl bg-[#D4AF37] px-5 py-3 font-bold text-slate-950 transition hover:bg-[#B5942B] md:col-span-2" onClick={saveRecipe} type="button">Save Personal Recipe</button>
        </div>
      ) : null}

      {sortedRecipes.length ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {sortedRecipes.map((recipe) => {
            const expanded = expandedId === recipe.id;
            return (
              <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5" key={recipe.id}>
                <div className="flex items-start justify-between gap-4">
                  <button className="min-w-0 flex-1 text-left" onClick={() => setExpandedId(expanded ? null : recipe.id)} type="button">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Personal • {recipe.category}</p>
                    <h3 className="harbor-serif mt-2 text-2xl font-semibold text-white">{recipe.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{recipe.time} • {recipe.ingredients.length} ingredients</p>
                  </button>
                  <div className="flex items-center gap-2">
                    <button aria-label={`Delete ${recipe.title}`} className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-red-400/10 hover:text-red-300" onClick={() => deleteRecipe(recipe.id)} type="button"><Trash2 className="h-4 w-4" /></button>
                    <button aria-label={expanded ? "Collapse recipe" : "Expand recipe"} className="grid h-9 w-9 place-items-center rounded-full text-[#D4AF37]" onClick={() => setExpandedId(expanded ? null : recipe.id)} type="button">{expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
                  </div>
                </div>

                {expanded ? (
                  <div className="mt-5 grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Ingredients</h4>
                      {recipe.ingredients.length ? <ul className="space-y-2 text-sm text-slate-300">{recipe.ingredients.map((item) => <li key={item}>• {item}</li>)}</ul> : <p className="text-sm text-slate-500">No ingredients added.</p>}
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Steps</h4>
                      {recipe.steps.length ? <ol className="space-y-2 text-sm text-slate-300">{recipe.steps.map((item, index) => <li key={`${index}-${item}`}>{index + 1}. {item}</li>)}</ol> : <p className="text-sm text-slate-500">No steps added.</p>}
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 flex items-center gap-3 rounded-3xl border border-dashed border-white/10 p-5 text-sm text-slate-400">
          <BookOpen className="h-5 w-5 text-[#D4AF37]" />
          No personal recipes yet. Add anything your household already loves.
        </div>
      )}
    </section>
  );
}
