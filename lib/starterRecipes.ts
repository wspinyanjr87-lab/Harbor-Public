import { createClient } from "@supabase/supabase-js";
import fallbackRows from "@/data/recipes/starter-recipes.json";

export const starterRecipeCategories = ["Breakfast", "Lunch", "Dinner", "Bakery", "Munchies"] as const;

export type StarterRecipeCategory = (typeof starterRecipeCategories)[number];

export type StarterRecipeIngredient = {
  name: string;
  quantity: number | null;
  unit: string | null;
  groceryCategory: string | null;
  optional: boolean;
};

export type HarborStarterRecipe = {
  id: string;
  title: string;
  slug: string;
  category: StarterRecipeCategory;
  description: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  totalMinutes: number;
  difficulty: string;
  budgetLevel: string;
  ingredients: StarterRecipeIngredient[];
  steps: string[];
  tags: string[];
  imageUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
};

type StarterRecipeRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  servings: number;
  prep_minutes: number;
  cook_minutes: number;
  difficulty: string;
  budget_level: string;
  ingredients: unknown;
  steps: unknown;
  tags: unknown;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
};

const starterRecipeColumns = "id,title,slug,category,description,servings,prep_minutes,cook_minutes,difficulty,budget_level,ingredients,steps,tags,image_url,is_published,sort_order";

function isCategory(value: string): value is StarterRecipeCategory {
  return starterRecipeCategories.includes(value as StarterRecipeCategory);
}

function nonNegativeInteger(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : 0;
}

export function normalizeStarterIngredients(value: unknown): StarterRecipeIngredient[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) {
      return [{ name: item.trim(), quantity: null, unit: null, groceryCategory: null, optional: false }];
    }
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];

    const ingredient = item as Record<string, unknown>;
    if (typeof ingredient.name !== "string" || !ingredient.name.trim()) return [];

    return [{
      name: ingredient.name.trim(),
      quantity: typeof ingredient.quantity === "number" && Number.isFinite(ingredient.quantity) ? ingredient.quantity : null,
      unit: typeof ingredient.unit === "string" && ingredient.unit.trim() ? ingredient.unit.trim() : null,
      groceryCategory: typeof ingredient.groceryCategory === "string" && ingredient.groceryCategory.trim() ? ingredient.groceryCategory.trim() : null,
      optional: ingredient.optional === true,
    }];
  });
}

export function normalizeStarterSteps(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((step) => typeof step === "string" && step.trim() ? [step.trim()] : []);
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((tag) => typeof tag === "string" && tag.trim() ? [tag.trim()] : []);
}

export function mapStarterRecipeRow(row: StarterRecipeRow): HarborStarterRecipe | null {
  if (!row.title?.trim() || !row.slug?.trim() || !isCategory(row.category)) return null;

  const prepMinutes = nonNegativeInteger(row.prep_minutes);
  const cookMinutes = nonNegativeInteger(row.cook_minutes);

  return {
    id: row.id,
    title: row.title.trim(),
    slug: row.slug.trim(),
    category: row.category,
    description: row.description?.trim() || "A Harbor family recipe.",
    servings: Math.max(1, nonNegativeInteger(row.servings)),
    prepMinutes,
    cookMinutes,
    totalMinutes: prepMinutes + cookMinutes,
    difficulty: row.difficulty?.trim() || "Easy",
    budgetLevel: row.budget_level?.trim() || "$",
    ingredients: normalizeStarterIngredients(row.ingredients),
    steps: normalizeStarterSteps(row.steps),
    tags: normalizeTags(row.tags),
    imageUrl: typeof row.image_url === "string" && row.image_url.trim() ? row.image_url.trim() : null,
    isPublished: row.is_published === true,
    sortOrder: nonNegativeInteger(row.sort_order),
  };
}

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Harbor recipe service is not configured.");

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

export async function fetchPublishedStarterRecipes(): Promise<HarborStarterRecipe[]> {
  const { data, error } = await getPublicClient()
    .from("starter_recipes")
    .select(starterRecipeColumns)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) throw new Error("Harbor recipes could not be loaded.");
  return ((data || []) as StarterRecipeRow[]).flatMap((row) => {
    const recipe = mapStarterRecipeRow(row);
    return recipe ? [recipe] : [];
  });
}

export async function fetchPublishedStarterRecipeBySlug(slug: string): Promise<HarborStarterRecipe | null> {
  const { data, error } = await getPublicClient()
    .from("starter_recipes")
    .select(starterRecipeColumns)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw new Error("This Harbor recipe could not be loaded.");
  return data ? mapStarterRecipeRow(data as StarterRecipeRow) : null;
}

export const fallbackStarterRecipes: HarborStarterRecipe[] = fallbackRows.flatMap((row, index) => {
  const recipe = mapStarterRecipeRow({
    id: `fallback-${row.slug}`,
    title: row.title,
    slug: row.slug,
    category: row.category,
    description: row.description,
    servings: row.servings,
    prep_minutes: row.prepMinutes,
    cook_minutes: row.cookMinutes,
    difficulty: row.difficulty,
    budget_level: row.budgetLevel,
    ingredients: row.ingredients,
    steps: row.steps,
    tags: row.tags,
    image_url: row.imageUrl,
    is_published: row.isPublished,
    sort_order: row.sortOrder ?? index,
  });
  return recipe ? [recipe] : [];
});

export function getFallbackStarterRecipe(slug: string) {
  return fallbackStarterRecipes.find((recipe) => recipe.slug === slug) ?? null;
}

export function formatIngredient(ingredient: StarterRecipeIngredient) {
  const amount = [ingredient.quantity, ingredient.unit].filter((part) => part !== null && part !== "").join(" ");
  return `${amount ? `${amount} ` : ""}${ingredient.name}${ingredient.optional ? " (optional)" : ""}`;
}
