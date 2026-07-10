const matchedRecipeImages: Record<string, string> = {
  "Egg & Cheese Breakfast Burritos": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Breakfast_burrito_%28cropped%29.jpg/900px-Breakfast_burrito_%28cropped%29.jpg",
  "Peanut Butter Banana Oatmeal": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Oatmeal_porridge_1-minute_with_additional_ingredients.jpg/900px-Oatmeal_porridge_1-minute_with_additional_ingredients.jpg",
  "Cheesy Hash Brown Egg Bake": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Breakfast_strata.jpg/900px-Breakfast_strata.jpg",
  "Pancake Sheet Pan Squares": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Foodiesfeed.com_pouring-honey-on-pancakes-with-walnuts.jpg/900px-Foodiesfeed.com_pouring-honey-on-pancakes-with-walnuts.jpg",
  "Sausage Egg Rice Bowls": "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
};

export function getMatchedRecipeImage(title: string, fallback: string) {
  return matchedRecipeImages[title] || fallback;
}
