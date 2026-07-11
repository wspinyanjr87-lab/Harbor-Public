"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Image as ImageIcon, Loader2, Plus, Trash2, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type RecipeCategory = "Breakfast" | "Lunch" | "Dinner" | "Bakery" | "Munchies";

type GroceryIngredient = {
  name: string;
  quantity: number | null;
  unit: string | null;
  groceryCategory: string;
  optional: boolean;
};

type CustomRecipe = {
  id: string;
  title: string;
  slug: string;
  category: RecipeCategory;
  time: string;
  ingredients: GroceryIngredient[];
  steps: string[];
  imageUrl: string | null;
  createdAt: string;
};

type RecipeRow = {
  id: string;
  title: string;
  slug: string;
  category: RecipeCategory;
  ingredients: unknown;
  steps: unknown;
  image_url: string | null;
  notes: string | null;
  created_at: string;
};

const categories: RecipeCategory[] = ["Breakfast", "Lunch", "Dinner", "Bakery", "Munchies"];

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ingredientFromLine(line: string): GroceryIngredient {
  return {
    name: line,
    quantity: null,
    unit: null,
    groceryCategory: "Other",
    optional: false,
  };
}

function normalizeIngredients(value: unknown): GroceryIngredient[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return ingredientFromLine(item);
      if (!item || typeof item !== "object") return null;

      const ingredient = item as Partial<GroceryIngredient>;
      if (!ingredient.name || typeof ingredient.name !== "string") return null;

      return {
        name: ingredient.name,
        quantity: typeof ingredient.quantity === "number" ? ingredient.quantity : null,
        unit: typeof ingredient.unit === "string" ? ingredient.unit : null,
        groceryCategory: typeof ingredient.groceryCategory === "string" ? ingredient.groceryCategory : "Other",
        optional: Boolean(ingredient.optional),
      };
    })
    .filter((item): item is GroceryIngredient => Boolean(item));
}

function normalizeSteps(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function rowToRecipe(row: RecipeRow): CustomRecipe {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    time: row.notes || "Flexible",
    ingredients: normalizeIngredients(row.ingredients),
    steps: normalizeSteps(row.steps),
    imageUrl: row.image_url,
    createdAt: row.created_at,
  };
}

export default function HarborCustomRecipes() {
  const [recipes, setRecipes] = useState<CustomRecipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<RecipeCategory>("Dinner");
  const [time, setTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadRecipes() {
      setLoading(true);
      setMessage("");

      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        if (active) {
          setMessage("Sign in to load and save your household recipe box.");
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("recipes")
        .select("id,title,slug,category,ingredients,steps,image_url,notes,created_at")
        .eq("owner_id", authData.user.id)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setMessage(error.message);
      } else {
        setRecipes(((data || []) as RecipeRow[]).map(rowToRecipe));
      }

      setLoading(false);
    }

    void loadRecipes();
    return () => {
      active = false;
    };
  }, []);

  const sortedRecipes = useMemo(
    () => [...recipes].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [recipes]
  );

  function resetForm() {
    setTitle("");
    setCategory("Dinner");
    setTime("");
    setImageUrl("");
    setIngredients("");
    setSteps("");
    setMessage("");
  }

  async function saveRecipe() {
    const parsedIngredients = splitLines(ingredients).map(ingredientFromLine);
    const parsedSteps = splitLines(steps);

    if (!title.trim()) {
      setMessage("Add a recipe name first.");
      return;
    }

    if (!parsedIngredients.length && !parsedSteps.length) {
      setMessage("Add at least one ingredient or one cooking step.");
      return;
    }

    setSaving(true);
    setMessage("");

    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    if (!user) {
      setMessage("Your session has ended. Sign in again before saving this recipe.");
      setSaving(false);
      return;
    }

    const baseSlug = slugify(title) || "recipe";
    let slug = baseSlug;
    let inserted: RecipeRow | null = null;
    let finalError = "";

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const { data, error } = await supabase
        .from("recipes")
        .insert({
          owner_id: user.id,
          title: title.trim(),
          slug,
          category,
          source_type: "manual",
          servings: 4,
          ingredients: parsedIngredients,
          steps: parsedSteps,
          image_url: imageUrl.trim() || null,
          notes: time.trim() || "Flexible",
        })
        .select("id,title,slug,category,ingredients,steps,image_url,notes,created_at")
        .single();

      if (!error && data) {
        inserted = data as RecipeRow;
        break;
      }

      finalError = error?.message || "The recipe could not be saved.";
      if (error?.code !== "23505") break;
      slug = `${baseSlug}-${Date.now().toString().slice(-6)}-${attempt + 1}`;
    }

    if (!inserted) {
      setMessage(finalError);
      setSaving(false);
      return;
    }

    const recipe = rowToRecipe(inserted);
    setRecipes((current) => [recipe, ...current]);
    setExpandedId(recipe.id);
    resetForm();
    setShowForm(false);
    setSaving(false);
  }

  async function deleteRecipe(id: string) {
    setMessage("");
    const { error } = await supabase.from("recipes").delete().eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  return (
    <section className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5 lg:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Saved securely to your account</p>
          <h2 className="harbor-serif mt-2 text-3xl font-semibold text-white">Your Recipe Box</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Your household recipes now travel with your Harbor account. Ingredients are stored in a grocery-ready format so meal plans can build organized shopping lists next.</p>
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
            <select className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setCategory(event.target.value as RecipeCategory)} value={category}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Time</span>
            <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setTime(event.target.value)} placeholder="30 minutes" value={time} />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Preview Image URL</span>
            <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37]" onChange={(event) => setImageUrl(event.target.value)} placeholder="https://..." type="url" value={imageUrl} />
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
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 font-bold text-slate-950 transition hover:bg-[#B5942B] disabled:opacity-60 md:col-span-2" disabled={saving} onClick={() => void saveRecipe()} type="button">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Save Personal Recipe
          </button>
        </div>
      ) : null}

      {!showForm && message ? <p className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-200">{message}</p> : null}

      {loading ? (
        <div className="mt-6 flex items-center gap-3 rounded-3xl border border-white/10 p-5 text-sm text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin text-[#D4AF37]" />
          Opening your recipe box...
        </div>
      ) : sortedRecipes.length ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {sortedRecipes.map((recipe) => {
            const expanded = expandedId === recipe.id;
            return (
              <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]" key={recipe.id}>
                {recipe.imageUrl ? (
                  <img alt={recipe.title} className="h-44 w-full object-cover" src={recipe.imageUrl} />
                ) : (
                  <div className="grid h-28 place-items-center bg-gradient-to-br from-[#D4AF37]/10 to-cyan-500/10 text-[#D4AF37]/70">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <button className="min-w-0 flex-1 text-left" onClick={() => setExpandedId(expanded ? null : recipe.id)} type="button">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Personal • {recipe.category}</p>
                      <h3 className="harbor-serif mt-2 text-2xl font-semibold text-white">{recipe.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{recipe.time} • {recipe.ingredients.length} ingredients</p>
                    </button>
                    <div className="flex items-center gap-2">
                      <button aria-label={`Delete ${recipe.title}`} className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-red-400/10 hover:text-red-300" onClick={() => void deleteRecipe(recipe.id)} type="button"><Trash2 className="h-4 w-4" /></button>
                      <button aria-label={expanded ? "Collapse recipe" : "Expand recipe"} className="grid h-9 w-9 place-items-center rounded-full text-[#D4AF37]" onClick={() => setExpandedId(expanded ? null : recipe.id)} type="button">{expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
                    </div>
                  </div>

                  {expanded ? (
                    <div className="mt-5 grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Ingredients</h4>
                        {recipe.ingredients.length ? <ul className="space-y-2 text-sm text-slate-300">{recipe.ingredients.map((item, index) => <li key={`${index}-${item.name}`}>• {item.name}</li>)}</ul> : <p className="text-sm text-slate-500">No ingredients added.</p>}
                      </div>
                      <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Steps</h4>
                        {recipe.steps.length ? <ol className="space-y-2 text-sm text-slate-300">{recipe.steps.map((item, index) => <li key={`${index}-${item}`}>{index + 1}. {item}</li>)}</ol> : <p className="text-sm text-slate-500">No steps added.</p>}
                      </div>
                    </div>
                  ) : null}
                </div>
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
