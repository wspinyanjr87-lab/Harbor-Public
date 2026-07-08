const weeklyMeals = [
  { day: "Mon", meal: "Lemon Herb Chicken", side: "with quinoa", icon: "🍗" },
  { day: "Tue", meal: "Creamy Tomato Pasta", side: "garlic bread", icon: "🍝" },
  { day: "Wed", meal: "Beef & Broccoli Stir Fry", side: "brown rice", icon: "🥦" },
  { day: "Thu", meal: "Taco Night", side: "all the fixings", icon: "🌮" },
  { day: "Fri", meal: "Salmon & Asparagus", side: "couscous", icon: "🐟" },
  { day: "Sat", meal: "Homemade Pizza", side: "family night", icon: "🍕" },
  { day: "Sun", meal: "Slow Cooker Chili", side: "cornbread", icon: "🥣" }
];

const rhythm = [
  { time: "8:00 AM", title: "School drop-off", done: true },
  { time: "12:30 PM", title: "Lunch with Mom", done: false },
  { time: "3:30 PM", title: "Soccer practice", done: true },
  { time: "6:00 PM", title: "Family dinner", done: false, active: true }
];

const houseNotes = [
  { title: "Don&apos;t forget the bake sale this Saturday!", meta: "Maya • May 12", icon: "🧁" },
  { title: "Guest room cleaned and ready", meta: "You • May 11", icon: "🧺" },
  { title: "Truck oil change scheduled", meta: "Taylor • May 10", icon: "📝" }
];

export function FamilyView() {
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-family-honey/20 to-transparent" />
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1fr_0.85fr] xl:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-family-berry">☀️ Good morning, Harbor family</p>
            <h1 className="mt-3 text-5xl font-black leading-tight text-family-ink md:text-7xl">Today at Home</h1>
            <p className="mt-4 max-w-2xl text-xl leading-8 text-black/60">
              Simple plans. Shared moments. A home filled with what matters.
            </p>
          </div>
          <div className="rounded-[2rem] bg-family-cloud p-5 shadow-inner">
            <div className="rounded-[1.5rem] bg-white/80 p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-family-leaf">Family table</p>
              <h2 className="mt-2 text-2xl font-black">Dinner is the anchor tonight.</h2>
              <p className="mt-2 text-sm leading-6 text-black/55">Tacos at 6:00, list already drafted, tomorrow prep waiting below.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        <div className="rounded-[2rem] bg-family-berry p-5 text-white shadow-lg shadow-family-berry/20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Tonight&apos;s Dinner</p>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black leading-tight">Lemon Herb Chicken</h2>
              <p className="mt-2 text-sm text-white/70">with roasted veggies & quinoa</p>
            </div>
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white/15 text-5xl">🍗</div>
          </div>
          <button className="mt-5 rounded-2xl bg-white/15 px-4 py-2 text-sm font-black">View Recipe →</button>
        </div>

        <div className="rounded-[2rem] bg-family-leaf/25 p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-family-leaf">Grocery Snapshot</p>
          <h2 className="mt-5 text-3xl font-black">8 items left</h2>
          <p className="mt-2 text-sm leading-6 text-black/55">You&apos;re all set for this week.</p>
          <button className="mt-5 rounded-2xl bg-family-leaf px-4 py-2 text-sm font-black text-white">View List →</button>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-family-berry">Budget Pulse</p>
          <h2 className="mt-5 text-4xl font-black">$312 <span className="text-base text-black/45">of $450</span></h2>
          <div className="mt-4 h-3 rounded-full bg-family-cloud">
            <div className="h-3 w-[69%] rounded-full bg-family-honey" />
          </div>
          <p className="mt-3 text-sm font-bold text-black/50">$138 remaining</p>
          <button className="mt-4 rounded-2xl bg-white px-4 py-2 text-sm font-black ring-1 ring-black/10">See Details →</button>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-family-berry">Today&apos;s Rhythm</p>
          <div className="mt-4 space-y-3">
            {rhythm.map((item) => (
              <div key={item.time} className="flex items-center gap-3 text-sm">
                <span className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] ${item.done ? "border-family-leaf bg-family-leaf text-white" : item.active ? "border-family-honey bg-family-honey/30" : "border-black/20"}`}>{item.done ? "✓" : ""}</span>
                <span className="w-20 font-black text-black/45">{item.time}</span>
                <span className="font-bold text-family-ink">{item.title}</span>
              </div>
            ))}
          </div>
          <button className="mt-5 rounded-2xl bg-white px-4 py-2 text-sm font-black ring-1 ring-black/10">View Calendar →</button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-family-berry">Weekly Meal Preview</p>
              <h2 className="mt-1 text-2xl font-black">Meals at a glance</h2>
            </div>
            <button className="rounded-2xl bg-family-cloud px-4 py-2 text-sm font-black">Add to Planner →</button>
          </div>
          <div className="grid gap-3 md:grid-cols-7">
            {weeklyMeals.map((meal) => (
              <div key={meal.day} className="rounded-2xl border border-black/5 bg-family-cream p-3 text-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-family-berry">{meal.day}</p>
                <div className="mx-auto my-3 grid h-16 w-16 place-items-center rounded-full bg-white text-4xl shadow-sm">{meal.icon}</div>
                <h3 className="text-sm font-black leading-tight">{meal.meal}</h3>
                <p className="mt-1 text-xs font-semibold text-black/45">{meal.side}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-family-berry/10 px-4 py-3 text-sm font-bold text-family-berry">
            ❤️ Tip: Double the Tuesday pasta to save time on a busy night.
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-family-berry">House Notes</p>
              <h2 className="mt-1 text-2xl font-black">Quick reminders</h2>
            </div>
            <span className="text-xl font-black text-black/35">⋮</span>
          </div>
          <div className="space-y-3">
            {houseNotes.map((note) => (
              <div key={note.title} className="flex gap-3 rounded-2xl bg-family-cloud p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-xl shadow-sm">{note.icon}</div>
                <div>
                  <div className="font-black leading-tight" dangerouslySetInnerHTML={{ __html: note.title }} />
                  <div className="mt-1 text-xs font-bold text-black/40">{note.meta}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 font-black ring-1 ring-black/10">
            Add Note <span>+</span>
          </button>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white/80 p-6 text-center shadow-sm ring-1 ring-black/5">
        <p className="text-2xl font-black text-family-ink">The best memories are made when we gather around the table. ♡</p>
      </section>
    </div>
  );
}
