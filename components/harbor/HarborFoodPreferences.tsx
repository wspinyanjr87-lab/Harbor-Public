"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Check, Save, UtensilsCrossed } from "lucide-react";

type FoodPreferences = {
  noPreference: boolean;
  allergies: string;
  dislikes: string;
  dietStyle: string;
  notes: string;
};

const storageKey = "harbor-food-preferences-v1";

const defaults: FoodPreferences = {
  noPreference: true,
  allergies: "",
  dislikes: "",
  dietStyle: "No preference",
  notes: "",
};

export default function HarborFoodPreferences() {
  const [preferences, setPreferences] = useState<FoodPreferences>(defaults);
  const [message, setMessage] = useState("Choose no preference or add household food guidance.");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setPreferences({ ...defaults, ...(JSON.parse(stored) as Partial<FoodPreferences>) });
    } catch {
      setMessage("Saved food preferences could not be loaded. You can safely enter them again.");
    }
  }, []);

  function updatePreference<K extends keyof FoodPreferences>(key: K, value: FoodPreferences[K]) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  function toggleNoPreference() {
    setPreferences((current) => ({
      ...current,
      noPreference: !current.noPreference,
      dietStyle: !current.noPreference ? "No preference" : current.dietStyle,
    }));
  }

  function savePreferences() {
    window.localStorage.setItem(storageKey, JSON.stringify(preferences));
    setMessage(preferences.noPreference ? "Saved with no food restrictions." : "Food preferences saved for this household.");
  }

  return (
    <section className="mt-8 rounded-[2rem] border border-[#D4AF37]/20 bg-white/[0.03] p-6 lg:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Food Preferences</p>
          <h2 className="harbor-serif mt-2 text-4xl font-semibold text-[#D4AF37]">Tell Harbor what matters.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">Harbor should not assume ingredients are unwanted. Households can choose no preference or add allergies, dislikes, diet style, and custom notes.</p>
        </div>
        <UtensilsCrossed className="h-8 w-8 text-[#D4AF37]" />
      </div>

      <button
        className={`mt-6 flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${preferences.noPreference ? "border-emerald-400/30 bg-emerald-400/10" : "border-white/10 bg-white/[0.03]"}`}
        onClick={toggleNoPreference}
        type="button"
      >
        <div>
          <p className="font-bold text-white">No preference</p>
          <p className="mt-1 text-sm text-slate-400">Show the full recipe library without ingredient exclusions.</p>
        </div>
        <div className={`grid h-8 w-8 place-items-center rounded-full border ${preferences.noPreference ? "border-emerald-400 bg-emerald-400 text-slate-950" : "border-slate-600 text-transparent"}`}>
          <Check className="h-4 w-4" />
        </div>
      </button>

      <div className={`mt-6 grid gap-4 md:grid-cols-2 ${preferences.noPreference ? "opacity-50" : ""}`}>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Allergies</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37] disabled:cursor-not-allowed"
            disabled={preferences.noPreference}
            onChange={(event) => updatePreference("allergies", event.target.value)}
            placeholder="Peanuts, shellfish, dairy..."
            value={preferences.allergies}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Dislikes</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37] disabled:cursor-not-allowed"
            disabled={preferences.noPreference}
            onChange={(event) => updatePreference("dislikes", event.target.value)}
            placeholder="Onion, mushrooms, spicy food..."
            value={preferences.dislikes}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Diet Style</span>
          <select
            className="w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-white outline-none focus:border-[#D4AF37] disabled:cursor-not-allowed"
            disabled={preferences.noPreference}
            onChange={(event) => updatePreference("dietStyle", event.target.value)}
            value={preferences.dietStyle}
          >
            {["No preference", "Vegetarian", "Vegan", "Pescatarian", "Low carb", "High protein", "Gluten conscious", "Dairy conscious", "Custom"].map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Custom Notes</span>
          <textarea
            className="min-h-28 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#D4AF37] disabled:cursor-not-allowed"
            disabled={preferences.noPreference}
            onChange={(event) => updatePreference("notes", event.target.value)}
            placeholder="Anything Harbor should consider when suggesting meals..."
            value={preferences.notes}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <p className="text-sm leading-6 text-slate-300">Allergy settings help filter suggestions, but recipe labels should still be checked before cooking.</p>
        </div>
        <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#B5942B]" onClick={savePreferences} type="button">
          <Save className="h-4 w-4" /> Save Food Preferences
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-500">{message}</p>
    </section>
  );
}
