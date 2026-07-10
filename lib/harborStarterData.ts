export type StarterRecipe = {
  title: string;
  image: string;
  people: string;
  time: string;
  level: string;
  ingredients: string;
  cost: string;
  tag: string;
  edition: "Free" | "Standard";
  category: "Breakfast" | "Lunch" | "Dinner" | "Bakery" | "Munchies";
  featured?: boolean;
};

const foodImage = "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=900&auto=format&fit=crop";
const breakfastImage = "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=900&auto=format&fit=crop";
const lunchImage = "https://images.unsplash.com/photo-1565299585323-38174c4a6471?q=80&w=900&auto=format&fit=crop";
const pastaImage = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=900&auto=format&fit=crop";
const bakeImage = "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=900&auto=format&fit=crop";
const snackImage = "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=900&auto=format&fit=crop";

export const budgetStarterRecipes: StarterRecipe[] = [
  {
    title: "Egg & Cheese Breakfast Burritos",
    image: breakfastImage,
    people: "8 burritos",
    time: "25m",
    level: "Easy",
    ingredients: "6 ingredients",
    cost: "Low Cost",
    tag: "Breakfast",
    edition: "Free",
    category: "Breakfast",
    featured: true
  },
  {
    title: "Peanut Butter Banana Oatmeal",
    image: breakfastImage,
    people: "4 servings",
    time: "10m",
    level: "Easy",
    ingredients: "5 ingredients",
    cost: "Very Low",
    tag: "Quick Breakfast",
    edition: "Free",
    category: "Breakfast"
  },
  {
    title: "Cheesy Hash Brown Egg Bake",
    image: breakfastImage,
    people: "6 servings",
    time: "40m",
    level: "Easy",
    ingredients: "7 ingredients",
    cost: "Budget",
    tag: "Prep Ahead",
    edition: "Standard",
    category: "Breakfast"
  },
  {
    title: "Pancake Sheet Pan Squares",
    image: breakfastImage,
    people: "8 servings",
    time: "25m",
    level: "Easy",
    ingredients: "6 ingredients",
    cost: "Low Cost",
    tag: "Kid Friendly",
    edition: "Standard",
    category: "Breakfast"
  },
  {
    title: "Sausage Egg Rice Bowls",
    image: breakfastImage,
    people: "5 servings",
    time: "20m",
    level: "Easy",
    ingredients: "7 ingredients",
    cost: "Budget Protein",
    tag: "Filling",
    edition: "Standard",
    category: "Breakfast"
  },
  {
    title: "Chicken Ranch Wraps",
    image: lunchImage,
    people: "6 wraps",
    time: "15m",
    level: "Easy",
    ingredients: "6 ingredients",
    cost: "Budget",
    tag: "Lunch",
    edition: "Free",
    category: "Lunch"
  },
  {
    title: "Pizza Quesadillas",
    image: lunchImage,
    people: "4 servings",
    time: "15m",
    level: "Easy",
    ingredients: "5 ingredients",
    cost: "Low Cost",
    tag: "Quick Lunch",
    edition: "Free",
    category: "Lunch"
  },
  {
    title: "Bean & Cheese Burritos",
    image: lunchImage,
    people: "8 burritos",
    time: "20m",
    level: "Easy",
    ingredients: "5 ingredients",
    cost: "Very Low",
    tag: "Freezer Friendly",
    edition: "Free",
    category: "Lunch"
  },
  {
    title: "Turkey Cheese Pasta Salad",
    image: pastaImage,
    people: "6 servings",
    time: "25m",
    level: "Easy",
    ingredients: "8 ingredients",
    cost: "Budget",
    tag: "Cold Lunch",
    edition: "Standard",
    category: "Lunch"
  },
  {
    title: "Leftover Rice Bowls",
    image: lunchImage,
    people: "4 servings",
    time: "15m",
    level: "Easy",
    ingredients: "6 ingredients",
    cost: "Very Low",
    tag: "Use Leftovers",
    edition: "Standard",
    category: "Lunch"
  },
  {
    title: "Cheesy Chicken Rice Bake",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=900&auto=format&fit=crop",
    people: "6 servings",
    time: "40m",
    level: "Easy",
    ingredients: "8 ingredients",
    cost: "Budget",
    tag: "Family Dinner",
    edition: "Free",
    category: "Dinner",
    featured: true
  },
  {
    title: "Beefy Bean Taco Skillet",
    image: lunchImage,
    people: "6 servings",
    time: "25m",
    level: "Easy",
    ingredients: "9 ingredients",
    cost: "Budget",
    tag: "One Pan",
    edition: "Free",
    category: "Dinner"
  },
  {
    title: "Creamy Garlic Pasta with Peas",
    image: pastaImage,
    people: "5 servings",
    time: "20m",
    level: "Easy",
    ingredients: "7 ingredients",
    cost: "Low Cost",
    tag: "Quick Fix",
    edition: "Free",
    category: "Dinner"
  },
  {
    title: "Sheet Pan Sausage Potatoes",
    image: foodImage,
    people: "5 servings",
    time: "35m",
    level: "Easy",
    ingredients: "6 ingredients",
    cost: "Budget",
    tag: "Sheet Pan",
    edition: "Free",
    category: "Dinner"
  },
  {
    title: "Breakfast-for-Dinner Egg Bake",
    image: breakfastImage,
    people: "6 servings",
    time: "35m",
    level: "Easy",
    ingredients: "7 ingredients",
    cost: "Low Cost",
    tag: "Protein",
    edition: "Free",
    category: "Dinner"
  },
  {
    title: "Chicken Noodle Soup Pot",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=900&auto=format&fit=crop",
    people: "6 servings",
    time: "45m",
    level: "Easy",
    ingredients: "9 ingredients",
    cost: "Budget",
    tag: "Comfort",
    edition: "Standard",
    category: "Dinner"
  },
  {
    title: "Loaded Baked Potato Night",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=900&auto=format&fit=crop",
    people: "5 servings",
    time: "50m",
    level: "Easy",
    ingredients: "8 ingredients",
    cost: "Low Cost",
    tag: "Build Your Own",
    edition: "Standard",
    category: "Dinner"
  },
  {
    title: "BBQ Chicken Quesadillas",
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?q=80&w=900&auto=format&fit=crop",
    people: "4 servings",
    time: "20m",
    level: "Easy",
    ingredients: "6 ingredients",
    cost: "Budget",
    tag: "Quick Fix",
    edition: "Standard",
    category: "Dinner"
  },
  {
    title: "Sloppy Joe Rice Bowls",
    image: foodImage,
    people: "6 servings",
    time: "25m",
    level: "Easy",
    ingredients: "7 ingredients",
    cost: "Budget",
    tag: "One Pan",
    edition: "Standard",
    category: "Dinner"
  },
  {
    title: "Chicken Pot Pie Biscuit Skillet",
    image: foodImage,
    people: "6 servings",
    time: "35m",
    level: "Easy",
    ingredients: "8 ingredients",
    cost: "Budget Comfort",
    tag: "Skillet",
    edition: "Standard",
    category: "Dinner"
  },
  {
    title: "Chocolate Chip Banana Bread",
    image: bakeImage,
    people: "1 loaf",
    time: "60m",
    level: "Easy",
    ingredients: "8 ingredients",
    cost: "Low Cost",
    tag: "Bakery",
    edition: "Standard",
    category: "Bakery"
  },
  {
    title: "Peanut Butter Oat Bars",
    image: bakeImage,
    people: "12 bars",
    time: "30m",
    level: "Easy",
    ingredients: "6 ingredients",
    cost: "Very Low",
    tag: "Snack Bake",
    edition: "Standard",
    category: "Bakery"
  },
  {
    title: "Cinnamon Sugar Muffins",
    image: bakeImage,
    people: "12 muffins",
    time: "28m",
    level: "Easy",
    ingredients: "8 ingredients",
    cost: "Low Cost",
    tag: "Breakfast Bake",
    edition: "Standard",
    category: "Bakery"
  },
  {
    title: "Chocolate Sheet Pan Brownies",
    image: bakeImage,
    people: "16 squares",
    time: "35m",
    level: "Easy",
    ingredients: "8 ingredients",
    cost: "Budget Treat",
    tag: "Chocolate",
    edition: "Standard",
    category: "Bakery"
  },
  {
    title: "No-Yeast Garlic Cheese Biscuits",
    image: bakeImage,
    people: "10 biscuits",
    time: "25m",
    level: "Easy",
    ingredients: "7 ingredients",
    cost: "Low Cost",
    tag: "Dinner Side",
    edition: "Standard",
    category: "Bakery"
  },
  {
    title: "Peanut Butter Chocolate Bites",
    image: snackImage,
    people: "16 bites",
    time: "15m",
    level: "Easy",
    ingredients: "5 ingredients",
    cost: "Very Low",
    tag: "Sweet Snack",
    edition: "Standard",
    category: "Munchies"
  },
  {
    title: "Cinnamon Sugar Tortilla Chips",
    image: snackImage,
    people: "4 servings",
    time: "15m",
    level: "Easy",
    ingredients: "4 ingredients",
    cost: "Very Low",
    tag: "Late Night",
    edition: "Standard",
    category: "Munchies"
  },
  {
    title: "S'mores Dip",
    image: snackImage,
    people: "6 servings",
    time: "12m",
    level: "Easy",
    ingredients: "4 ingredients",
    cost: "Budget Treat",
    tag: "Sweet Dip",
    edition: "Standard",
    category: "Munchies"
  },
  {
    title: "Popcorn Trail Mix",
    image: snackImage,
    people: "8 cups",
    time: "10m",
    level: "Easy",
    ingredients: "6 ingredients",
    cost: "Low Cost",
    tag: "Crunchy Sweet",
    edition: "Standard",
    category: "Munchies"
  },
  {
    title: "Dessert Quesadillas",
    image: snackImage,
    people: "4 servings",
    time: "12m",
    level: "Easy",
    ingredients: "5 ingredients",
    cost: "Low Cost",
    tag: "Quick Sweet",
    edition: "Standard",
    category: "Munchies"
  }
];

export const weeklyBudgetMeals = [
  { day: "Mon", meal: "Cheesy Chicken Rice Bake", type: "Dinner" },
  { day: "Tue", meal: "Beefy Bean Taco Skillet", type: "Dinner" },
  { day: "Wed", meal: "Creamy Garlic Pasta with Peas", type: "Dinner" },
  { day: "Thu", meal: "Sheet Pan Sausage Potatoes", type: "Dinner" },
  { day: "Fri", meal: "Breakfast-for-Dinner Egg Bake", type: "Dinner" },
  { day: "Sat", meal: "BBQ Chicken Quesadillas", type: "Flexible" },
  { day: "Sun", meal: "Chicken Noodle Soup Pot", type: "Dinner" }
];

export const featuredBudgetIngredients = [
  ["Chicken thighs or shredded chicken", "2 lb"],
  ["White rice", "2 cups"],
  ["Frozen broccoli or mixed veg", "1 bag"],
  ["Cream soup or broth base", "1 can"],
  ["Shredded cheese", "2 cups"],
  ["Garlic powder, paprika, salt, pepper", "pantry"]
];

export const groceryCategories = [
  {
    name: "Proteins",
    items: [
      { name: "Chicken thighs or breasts (4 lb)", checked: false },
      { name: "Ground beef or turkey (2 lb)", checked: false },
      { name: "Smoked sausage (1 pack)", checked: false },
      { name: "Eggs (2 dozen)", checked: true },
      { name: "Lunch meat or cooked chicken", checked: false }
    ]
  },
  {
    name: "Pantry",
    items: [
      { name: "White rice (5 lb bag)", checked: false },
      { name: "Pasta (2 boxes)", checked: false },
      { name: "Tortillas (2 packs)", checked: false },
      { name: "Canned beans (4 cans)", checked: false },
      { name: "Cream soup or broth base", checked: false },
      { name: "Potatoes (5 lb bag)", checked: false },
      { name: "Oats", checked: false },
      { name: "Pancake mix or flour", checked: false }
    ]
  },
  {
    name: "Frozen / Produce",
    items: [
      { name: "Frozen broccoli or mixed vegetables", checked: false },
      { name: "Frozen peas", checked: false },
      { name: "Bagged salad or lettuce", checked: false },
      { name: "Bananas or apples", checked: true },
      { name: "Hash browns", checked: false }
    ]
  },
  {
    name: "Dairy",
    items: [
      { name: "Shredded cheese (large bag)", checked: false },
      { name: "Milk", checked: false },
      { name: "Sour cream or Greek yogurt", checked: false },
      { name: "Butter", checked: true },
      { name: "Cream cheese or ranch dressing", checked: false }
    ]
  },
  {
    name: "Breakfast / Snacks",
    items: [
      { name: "Cereal or oatmeal", checked: false },
      { name: "Peanut butter", checked: false },
      { name: "Bread", checked: false },
      { name: "Crackers or popcorn", checked: false },
      { name: "Chocolate chips", checked: false },
      { name: "Marshmallows", checked: false }
    ]
  }
];

export const calendarEventsByDay: Record<string, { label: string; tone: "gold" | "sky" | "emerald" | "purple" }[]> = {
  "2": [{ label: "Meal plan", tone: "gold" }],
  "4": [{ label: "Practice", tone: "sky" }],
  "7": [{ label: "Setup night", tone: "gold" }],
  "9": [{ label: "Grocery run", tone: "emerald" }],
  "11": [{ label: "School pickup", tone: "sky" }],
  "14": [{ label: "Family dinner", tone: "gold" }],
  "17": [{ label: "Budget check", tone: "emerald" }],
  "20": [{ label: "Prep lunches", tone: "purple" }],
  "23": [{ label: "Restock pantry", tone: "emerald" }],
  "26": [{ label: "Memory night", tone: "purple" }],
  "29": [{ label: "Plan next week", tone: "gold" }]
};
