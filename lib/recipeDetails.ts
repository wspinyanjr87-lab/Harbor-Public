import { budgetStarterRecipes } from "@/lib/harborStarterData";

export type RecipeDetail = {
  ingredients: string[];
  steps: string[];
  groceryNotes: string[];
  budgetTip: string;
};

export function getRecipeSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const recipeDetails: Record<string, RecipeDetail> = {
  "egg-and-cheese-breakfast-burritos": {
    ingredients: ["8 flour tortillas", "10 eggs", "1 cup shredded cheese", "1 cup cooked sausage or ham pieces", "1/2 cup milk", "Salt, pepper, and paprika"],
    steps: ["Whisk eggs, milk, salt, pepper, and paprika in a bowl.", "Cook the eggs in a skillet over medium heat, stirring until just set.", "Warm tortillas so they fold without tearing.", "Fill each tortilla with eggs, cheese, and sausage or ham.", "Roll tightly and serve now, or wrap and freeze for quick breakfasts."],
    groceryNotes: ["Eggs", "Tortillas", "Shredded cheese", "Breakfast sausage or ham"],
    budgetTip: "Use leftover meat from dinner instead of buying breakfast meat."
  },
  "peanut-butter-banana-oatmeal": {
    ingredients: ["2 cups oats", "4 cups milk or water", "2 bananas", "1/3 cup peanut butter", "2 tablespoons brown sugar", "Cinnamon and salt"],
    steps: ["Bring milk or water to a simmer in a pot.", "Stir in oats, cinnamon, salt, and brown sugar.", "Cook until thick and creamy, about 5 minutes.", "Stir in peanut butter until melted through.", "Top with sliced bananas and serve warm."],
    groceryNotes: ["Oats", "Bananas", "Peanut butter", "Milk"],
    budgetTip: "Oats stretch far and can cover multiple breakfasts for a few dollars."
  },
  "cheesy-hash-brown-egg-bake": {
    ingredients: ["1 bag frozen hash browns", "10 eggs", "1 cup milk", "1 1/2 cups shredded cheese", "1 cup cooked sausage or ham", "Salt, pepper, garlic powder", "Cooking spray or butter"],
    steps: ["Grease a baking dish and spread hash browns across the bottom.", "Whisk eggs, milk, salt, pepper, and garlic powder.", "Sprinkle meat and cheese over the hash browns.", "Pour the egg mix over the pan.", "Bake at 375°F for 35 to 40 minutes until the center is set."],
    groceryNotes: ["Hash browns", "Eggs", "Cheese", "Sausage or ham"],
    budgetTip: "This is a strong leftover breakfast because it reheats cleanly."
  },
  "pancake-sheet-pan-squares": {
    ingredients: ["2 cups pancake mix", "1 1/2 cups milk", "2 eggs", "2 tablespoons oil or melted butter", "1/2 cup chocolate chips or fruit", "Syrup or powdered sugar"],
    steps: ["Mix pancake mix, milk, eggs, and oil until smooth.", "Pour batter into a greased sheet pan.", "Sprinkle chocolate chips or fruit over the top.", "Bake at 425°F for 12 to 15 minutes.", "Cut into squares and serve with syrup."],
    groceryNotes: ["Pancake mix", "Milk", "Eggs", "Chocolate chips or fruit"],
    budgetTip: "Sheet-pan pancakes feed more people with less stove time."
  },
  "sausage-egg-rice-bowls": {
    ingredients: ["3 cups cooked rice", "8 eggs", "1 cup cooked sausage", "1 cup shredded cheese", "1 tablespoon butter", "Salt, pepper, paprika"],
    steps: ["Warm rice in a skillet with butter.", "Scramble eggs in a separate pan or push rice aside and cook them in the same skillet.", "Add cooked sausage and season with salt, pepper, and paprika.", "Stir everything together and top with cheese.", "Serve in bowls while hot."],
    groceryNotes: ["Rice", "Eggs", "Sausage", "Cheese"],
    budgetTip: "Rice turns a few eggs into a filling family breakfast."
  },
  "chicken-ranch-wraps": {
    ingredients: ["6 tortillas", "2 cups cooked chicken", "1/2 cup ranch dressing", "1 cup shredded cheese", "Lettuce", "Salt and pepper"],
    steps: ["Chop cooked chicken into bite-size pieces.", "Toss chicken with ranch, salt, and pepper.", "Lay tortillas flat and add lettuce, chicken, and cheese.", "Roll tightly into wraps.", "Slice in half or pack cold for lunch."],
    groceryNotes: ["Tortillas", "Cooked chicken", "Ranch", "Lettuce", "Cheese"],
    budgetTip: "Use leftover baked chicken or rotisserie chicken to make this cheap and fast."
  },
  "pizza-quesadillas": {
    ingredients: ["8 tortillas", "1 cup pizza sauce", "2 cups mozzarella or shredded cheese", "Pepperoni or cooked sausage", "Italian seasoning", "Butter or oil"],
    steps: ["Spread pizza sauce on half of each tortilla.", "Add cheese, meat, and a pinch of Italian seasoning.", "Fold tortillas closed.", "Cook in a lightly buttered skillet until crisp on both sides.", "Cut into wedges and serve with extra sauce."],
    groceryNotes: ["Tortillas", "Pizza sauce", "Cheese", "Pepperoni or sausage"],
    budgetTip: "Use whatever cooked meat is already in the fridge."
  },
  "bean-and-cheese-burritos": {
    ingredients: ["8 tortillas", "2 cans refried beans", "2 cups shredded cheese", "1 cup cooked rice", "Taco seasoning", "Sour cream optional"],
    steps: ["Warm beans with taco seasoning in a small pot.", "Warm tortillas so they fold easily.", "Fill tortillas with beans, rice, and cheese.", "Roll burritos tightly.", "Toast in a skillet or wrap for freezer lunches."],
    groceryNotes: ["Tortillas", "Refried beans", "Rice", "Cheese"],
    budgetTip: "Beans and rice make one of the cheapest filling lunch bases."
  },
  "turkey-cheese-pasta-salad": {
    ingredients: ["1 box pasta", "1 cup chopped turkey or ham", "1 cup shredded cheese", "1 cup peas or chopped carrots", "1/2 cup ranch or Italian dressing", "Salt and pepper"],
    steps: ["Boil pasta until tender, then rinse cold.", "Add chopped turkey or ham, cheese, and vegetables.", "Stir in dressing a little at a time.", "Season with salt and pepper.", "Chill before serving or pack into lunch containers."],
    groceryNotes: ["Pasta", "Lunch meat", "Cheese", "Frozen peas", "Dressing"],
    budgetTip: "Cold pasta salad turns small amounts of meat into several lunches."
  },
  "leftover-rice-bowls": {
    ingredients: ["3 cups cooked rice", "2 cups leftover chicken, beef, or eggs", "1 cup frozen vegetables", "1 tablespoon butter or oil", "Garlic powder", "Salt and pepper"],
    steps: ["Warm butter or oil in a skillet.", "Add frozen vegetables and cook until hot.", "Add rice and leftover protein.", "Season with garlic powder, salt, and pepper.", "Cook until everything is hot and slightly crispy at the edges."],
    groceryNotes: ["Rice", "Frozen vegetables", "Leftover protein"],
    budgetTip: "This is the no-waste lunch that keeps grocery spending down."
  },
  "cheesy-chicken-rice-bake": {
    ingredients: ["2 cups cooked chicken", "2 cups cooked white rice", "1 bag frozen broccoli or mixed vegetables", "1 can cream soup or 1 cup broth base", "1 1/2 cups shredded cheese", "Garlic powder, paprika, salt, pepper"],
    steps: ["Heat oven to 375°F and grease a baking dish.", "Mix chicken, rice, vegetables, soup or broth base, and half the cheese.", "Season with garlic powder, paprika, salt, and pepper.", "Spread into the dish and top with remaining cheese.", "Bake 25 to 30 minutes until hot and bubbly."],
    groceryNotes: ["Chicken", "Rice", "Frozen vegetables", "Cream soup or broth", "Cheese"],
    budgetTip: "Cook extra rice once and use it in lunches the next day."
  },
  "beefy-bean-taco-skillet": {
    ingredients: ["1 lb ground beef or turkey", "2 cans beans", "1 cup cooked rice", "1 packet taco seasoning", "1 cup shredded cheese", "Tortilla chips or tortillas", "Sour cream optional"],
    steps: ["Brown ground meat in a large skillet and drain if needed.", "Stir in beans, rice, taco seasoning, and a splash of water.", "Simmer 8 to 10 minutes until thick.", "Top with shredded cheese and cover until melted.", "Serve with tortillas, chips, or over rice."],
    groceryNotes: ["Ground beef or turkey", "Beans", "Rice", "Taco seasoning", "Cheese"],
    budgetTip: "Beans cut the meat cost while keeping the skillet filling."
  },
  "creamy-garlic-pasta-with-peas": {
    ingredients: ["1 box pasta", "1 cup frozen peas", "2 tablespoons butter", "1 cup milk", "1 cup shredded cheese", "Garlic powder", "Salt and pepper"],
    steps: ["Boil pasta and add peas during the last 2 minutes.", "Drain, saving a little pasta water.", "Melt butter in the pot and add milk, cheese, garlic powder, salt, and pepper.", "Stir pasta and peas back into the sauce.", "Loosen with pasta water if needed and serve warm."],
    groceryNotes: ["Pasta", "Frozen peas", "Milk", "Cheese", "Butter"],
    budgetTip: "This is a low-cost emergency dinner for nights with no plan."
  },
  "sheet-pan-sausage-potatoes": {
    ingredients: ["1 pack smoked sausage", "5 medium potatoes", "1 bag frozen broccoli or mixed vegetables", "2 tablespoons oil", "Garlic powder", "Paprika", "Salt and pepper"],
    steps: ["Heat oven to 425°F and line a sheet pan.", "Slice sausage and dice potatoes small so they cook faster.", "Toss sausage, potatoes, vegetables, oil, and seasonings together.", "Spread everything on the pan in one layer.", "Bake 30 to 35 minutes, flipping once."],
    groceryNotes: ["Smoked sausage", "Potatoes", "Frozen vegetables", "Seasonings"],
    budgetTip: "Potatoes make this meal stretch without adding much cost."
  },
  "breakfast-for-dinner-egg-bake": {
    ingredients: ["10 eggs", "1 cup milk", "2 cups hash browns or diced potatoes", "1 cup cooked sausage or ham", "1 1/2 cups shredded cheese", "Salt, pepper, paprika"],
    steps: ["Grease a baking dish and heat oven to 375°F.", "Spread potatoes or hash browns in the dish.", "Whisk eggs, milk, and seasonings.", "Add meat and cheese, then pour egg mix over everything.", "Bake 35 to 40 minutes until set."],
    groceryNotes: ["Eggs", "Hash browns or potatoes", "Cheese", "Sausage or ham"],
    budgetTip: "Egg dinners are cheap protein when meat prices are high."
  },
  "chicken-noodle-soup-pot": {
    ingredients: ["2 cups cooked chicken", "8 cups chicken broth", "1 bag frozen mixed vegetables", "2 cups egg noodles", "Garlic powder", "Parsley", "Salt and pepper"],
    steps: ["Bring broth to a simmer in a large pot.", "Add frozen vegetables and cooked chicken.", "Season with garlic powder, parsley, salt, and pepper.", "Add noodles and simmer until tender.", "Taste and adjust seasoning before serving."],
    groceryNotes: ["Chicken", "Broth", "Frozen vegetables", "Egg noodles"],
    budgetTip: "Use broth base or bouillon to keep soup cheaper."
  },
  "loaded-baked-potato-night": {
    ingredients: ["5 large potatoes", "1 cup shredded cheese", "1 cup cooked chicken, ham, or bacon bits", "Sour cream or Greek yogurt", "Butter", "Salt and pepper"],
    steps: ["Bake potatoes at 425°F until tender, about 45 to 55 minutes.", "Warm meat toppings while potatoes cook.", "Split potatoes open and fluff with butter, salt, and pepper.", "Top with cheese and meat.", "Add sour cream or Greek yogurt and serve."],
    groceryNotes: ["Potatoes", "Cheese", "Sour cream", "Leftover meat"],
    budgetTip: "Let each person build their own potato so leftovers do not feel boring."
  },
  "bbq-chicken-quesadillas": {
    ingredients: ["8 tortillas", "2 cups cooked chicken", "1/2 cup BBQ sauce", "2 cups shredded cheese", "Butter or oil", "Ranch optional"],
    steps: ["Mix cooked chicken with BBQ sauce.", "Add chicken and cheese to half of each tortilla.", "Fold tortillas closed.", "Cook in a lightly buttered skillet until crisp and melted.", "Slice and serve with ranch if desired."],
    groceryNotes: ["Tortillas", "Chicken", "BBQ sauce", "Cheese"],
    budgetTip: "This is a strong leftover chicken rescue meal."
  },
  "sloppy-joe-rice-bowls": {
    ingredients: ["1 lb ground beef or turkey", "2 cups cooked rice", "1 can tomato sauce", "2 tablespoons ketchup", "1 tablespoon brown sugar", "Garlic powder", "Paprika", "Salt and pepper"],
    steps: ["Brown ground meat in a skillet and drain if needed.", "Stir in tomato sauce, ketchup, brown sugar, garlic powder, paprika, salt, and pepper.", "Simmer until thick, about 10 minutes.", "Spoon over warm rice.", "Top with cheese if available."],
    groceryNotes: ["Ground beef or turkey", "Rice", "Tomato sauce", "Ketchup"],
    budgetTip: "Rice replaces buns and makes the meal stretch farther."
  },
  "chicken-pot-pie-biscuit-skillet": {
    ingredients: ["2 cups cooked chicken", "1 bag frozen mixed vegetables", "1 can cream soup or 1 cup gravy", "1/2 cup milk", "1 can biscuits", "Garlic powder", "Salt and pepper"],
    steps: ["Heat oven to 375°F.", "Warm chicken, vegetables, cream soup or gravy, milk, and seasonings in an oven-safe skillet.", "Cut biscuits into pieces and place on top.", "Bake 20 to 25 minutes until biscuits are golden.", "Let rest 5 minutes before serving."],
    groceryNotes: ["Chicken", "Frozen vegetables", "Cream soup or gravy", "Biscuits"],
    budgetTip: "This gives pot-pie comfort without making pie crust."
  },
  "chocolate-chip-banana-bread": {
    ingredients: ["3 ripe bananas", "1/2 cup melted butter", "3/4 cup sugar", "1 egg", "1 1/2 cups flour", "1 teaspoon baking soda", "Pinch of salt", "1/2 cup chocolate chips"],
    steps: ["Heat oven to 350°F and grease a loaf pan.", "Mash bananas and stir in melted butter, sugar, and egg.", "Mix in flour, baking soda, and salt.", "Fold in chocolate chips.", "Bake 50 to 60 minutes until a toothpick comes out mostly clean."],
    groceryNotes: ["Bananas", "Flour", "Chocolate chips", "Butter"],
    budgetTip: "Use bananas that are too soft for lunchboxes."
  },
  "peanut-butter-oat-bars": {
    ingredients: ["2 cups oats", "1 cup peanut butter", "1/2 cup honey or syrup", "1/2 cup chocolate chips", "1 teaspoon vanilla", "Pinch of salt"],
    steps: ["Warm peanut butter and honey just enough to stir smoothly.", "Mix in oats, vanilla, salt, and chocolate chips.", "Press firmly into a lined pan.", "Chill until firm.", "Cut into bars and store cold."],
    groceryNotes: ["Oats", "Peanut butter", "Honey or syrup", "Chocolate chips"],
    budgetTip: "These replace pricey granola bars."
  },
  "cinnamon-sugar-muffins": {
    ingredients: ["2 cups flour", "1/2 cup sugar", "1 tablespoon baking powder", "1 cup milk", "1 egg", "1/4 cup oil or melted butter", "Cinnamon sugar topping"],
    steps: ["Heat oven to 375°F and line or grease a muffin tin.", "Mix flour, sugar, baking powder, and a pinch of salt.", "Stir in milk, egg, and oil until just combined.", "Fill muffin cups and sprinkle with cinnamon sugar.", "Bake 16 to 20 minutes."],
    groceryNotes: ["Flour", "Milk", "Eggs", "Cinnamon sugar"],
    budgetTip: "Muffins make breakfast feel special without bakery prices."
  },
  "chocolate-sheet-pan-brownies": {
    ingredients: ["1 cup melted butter", "2 cups sugar", "4 eggs", "1 cup flour", "3/4 cup cocoa powder", "1 teaspoon vanilla", "Pinch of salt", "Chocolate chips optional"],
    steps: ["Heat oven to 350°F and grease a 9x13 pan.", "Whisk melted butter, sugar, eggs, and vanilla.", "Stir in flour, cocoa, and salt.", "Fold in chocolate chips if using.", "Bake 25 to 30 minutes and cool before cutting."],
    groceryNotes: ["Butter", "Sugar", "Eggs", "Cocoa", "Flour"],
    budgetTip: "A pan of brownies is cheaper than packaged desserts for a family."
  },
  "no-yeast-garlic-cheese-biscuits": {
    ingredients: ["2 cups flour", "1 tablespoon baking powder", "1/2 teaspoon salt", "1 cup milk", "1/2 cup shredded cheese", "1/4 cup melted butter", "Garlic powder"],
    steps: ["Heat oven to 425°F.", "Mix flour, baking powder, salt, garlic powder, and cheese.", "Stir in milk until a soft dough forms.", "Drop spoonfuls onto a baking sheet.", "Bake 12 to 15 minutes and brush with melted butter."],
    groceryNotes: ["Flour", "Milk", "Cheese", "Butter"],
    budgetTip: "Use these to stretch soup or pasta nights."
  },
  "peanut-butter-chocolate-bites": {
    ingredients: ["1 cup peanut butter", "1 cup oats", "1/3 cup honey or syrup", "1/2 cup chocolate chips", "Pinch of salt"],
    steps: ["Mix peanut butter, oats, honey, chocolate chips, and salt.", "Chill 10 minutes if sticky.", "Roll into small bites.", "Store in the fridge.", "Serve as quick sweet snacks."],
    groceryNotes: ["Peanut butter", "Oats", "Chocolate chips", "Honey or syrup"],
    budgetTip: "Small bites help stretch the treat through the week."
  },
  "cinnamon-sugar-tortilla-chips": {
    ingredients: ["6 tortillas", "2 tablespoons melted butter", "1/4 cup sugar", "1 teaspoon cinnamon"],
    steps: ["Heat oven to 375°F.", "Cut tortillas into triangles.", "Brush with melted butter.", "Sprinkle with cinnamon sugar.", "Bake 8 to 10 minutes until crisp."],
    groceryNotes: ["Tortillas", "Butter", "Cinnamon", "Sugar"],
    budgetTip: "This turns extra tortillas into dessert instead of waste."
  },
  "s-mores-dip": {
    ingredients: ["1 cup chocolate chips", "2 cups mini marshmallows", "Graham crackers", "1 tablespoon butter optional"],
    steps: ["Heat oven to 400°F.", "Add chocolate chips to a small oven-safe dish.", "Top with marshmallows.", "Bake 6 to 8 minutes until melted and golden.", "Serve with graham crackers."],
    groceryNotes: ["Chocolate chips", "Marshmallows", "Graham crackers"],
    budgetTip: "A small dip gives the s'mores feeling without a full dessert spread."
  },
  "popcorn-trail-mix": {
    ingredients: ["8 cups popped popcorn", "1 cup cereal", "1/2 cup chocolate chips", "1/2 cup pretzels or crackers", "2 tablespoons melted butter", "Cinnamon sugar optional"],
    steps: ["Pop popcorn and remove unpopped kernels.", "Mix popcorn, cereal, pretzels or crackers, and chocolate chips.", "Drizzle with melted butter if desired.", "Sprinkle with cinnamon sugar for a sweet version.", "Store in a covered bowl or bags."],
    groceryNotes: ["Popcorn", "Cereal", "Chocolate chips", "Pretzels or crackers"],
    budgetTip: "Popcorn is one of the cheapest snack bases."
  },
  "dessert-quesadillas": {
    ingredients: ["4 tortillas", "1/2 cup peanut butter or chocolate spread", "2 bananas or marshmallows", "Butter", "Cinnamon sugar"],
    steps: ["Spread peanut butter or chocolate spread on half of each tortilla.", "Add banana slices or marshmallows.", "Fold tortillas closed.", "Toast in a buttered skillet until crisp.", "Sprinkle with cinnamon sugar and slice."],
    groceryNotes: ["Tortillas", "Peanut butter or chocolate spread", "Bananas", "Cinnamon sugar"],
    budgetTip: "This uses the same tortillas from lunch and dinner plans."
  }
};

export function getRecipeBySlug(slug: string) {
  const recipe = budgetStarterRecipes.find((item) => getRecipeSlug(item.title) === slug);
  if (!recipe) return null;

  return {
    ...recipe,
    slug,
    detail: recipeDetails[slug]
  };
}

export const recipeSlugs = budgetStarterRecipes.map((recipe) => getRecipeSlug(recipe.title));
