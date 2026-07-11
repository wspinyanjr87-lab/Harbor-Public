import { createClient } from "@supabase/supabase-js";
import recipes from "../../data/recipes/starter-recipes.json" with { type: "json" };

const recipeCategories = new Set(["Breakfast", "Lunch", "Dinner", "Bakery", "Munchies"]);
const groceryCategories = new Set(["Produce", "Meat & Protein", "Dairy", "Pantry", "Frozen", "Bakery", "Snacks", "Other"]);
const difficulties = new Set(["Easy", "Medium", "Advanced"]);
const budgetLevels = new Set(["$", "$$", "$$$"]);

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function validateRecipe(recipe, index) {
  const issues = [];
  const prefix = `recipes[${index}]`;

  if (!recipe.title?.trim()) issues.push(`${prefix}.title is required`);
  if (!recipe.slug?.trim()) issues.push(`${prefix}.slug is required`);
  if (recipe.slug && recipe.slug !== slugify(recipe.slug)) issues.push(`${prefix}.slug must be lowercase kebab-case`);
  if (!recipeCategories.has(recipe.category)) issues.push(`${prefix}.category is invalid`);
  if (!recipe.description?.trim()) issues.push(`${prefix}.description is required`);
  if (!Number.isInteger(recipe.servings) || recipe.servings < 1) issues.push(`${prefix}.servings must be a positive integer`);
  if (!Number.isInteger(recipe.prepMinutes) || recipe.prepMinutes < 0) issues.push(`${prefix}.prepMinutes must be zero or greater`);
  if (!Number.isInteger(recipe.cookMinutes) || recipe.cookMinutes < 0) issues.push(`${prefix}.cookMinutes must be zero or greater`);
  if (!difficulties.has(recipe.difficulty)) issues.push(`${prefix}.difficulty is invalid`);
  if (!budgetLevels.has(recipe.budgetLevel)) issues.push(`${prefix}.budgetLevel is invalid`);
  if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) issues.push(`${prefix}.ingredients must contain at least one item`);
  if (!Array.isArray(recipe.steps) || recipe.steps.length === 0) issues.push(`${prefix}.steps must contain at least one item`);
  if (!Array.isArray(recipe.tags)) issues.push(`${prefix}.tags must be an array`);

  recipe.ingredients?.forEach((ingredient, ingredientIndex) => {
    const ingredientPrefix = `${prefix}.ingredients[${ingredientIndex}]`;
    if (!ingredient.name?.trim()) issues.push(`${ingredientPrefix}.name is required`);
    if (ingredient.quantity !== null && (!Number.isFinite(ingredient.quantity) || ingredient.quantity <= 0)) {
      issues.push(`${ingredientPrefix}.quantity must be positive or null`);
    }
    if (ingredient.unit !== null && typeof ingredient.unit !== "string") issues.push(`${ingredientPrefix}.unit must be a string or null`);
    if (!groceryCategories.has(ingredient.groceryCategory)) issues.push(`${ingredientPrefix}.groceryCategory is invalid`);
  });

  recipe.steps?.forEach((step, stepIndex) => {
    if (typeof step !== "string" || !step.trim()) issues.push(`${prefix}.steps[${stepIndex}] cannot be empty`);
  });

  return issues;
}

const allIssues = recipes.flatMap(validateRecipe);
const duplicateSlugs = recipes
  .map((recipe) => recipe.slug)
  .filter((slug, index, values) => values.indexOf(slug) !== index);

if (duplicateSlugs.length) allIssues.push(`Duplicate slugs: ${[...new Set(duplicateSlugs)].join(", ")}`);

if (allIssues.length) {
  console.error("Harbor Recipe Factory validation failed:\n");
  allIssues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  console.error("The service-role key is required only for this trusted seed script and must never be exposed to the browser.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const rows = recipes.map((recipe) => ({
  title: recipe.title,
  slug: recipe.slug,
  category: recipe.category,
  description: recipe.description,
  servings: recipe.servings,
  prep_minutes: recipe.prepMinutes,
  cook_minutes: recipe.cookMinutes,
  difficulty: recipe.difficulty,
  budget_level: recipe.budgetLevel,
  ingredients: recipe.ingredients,
  steps: recipe.steps,
  tags: recipe.tags,
  image_url: recipe.imageUrl || null,
  is_published: recipe.isPublished,
  sort_order: recipe.sortOrder,
}));

const { data, error } = await supabase
  .from("starter_recipes")
  .upsert(rows, { onConflict: "slug" })
  .select("slug");

if (error) {
  console.error("Harbor Recipe Factory import failed:", error.message);
  process.exit(1);
}

console.log(`Harbor Recipe Factory imported ${data.length} recipes successfully.`);
