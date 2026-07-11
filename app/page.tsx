"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Anchor, ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type AuthMode = "signin" | "signup";

export default function HarborWelcomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      if (data.session) {
        router.replace("/dashboard");
        return;
      }

      setCheckingSession(false);
    }

    void checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace("/dashboard");
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setMessage("");
    setConfirmationSent(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setConfirmationSent(false);

    if (!email.trim() || !password) {
      setMessage("Enter your email and password to continue.");
      return;
    }

    if (password.length < 6) {
      setMessage("Your password needs at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      if (data.session) {
        router.replace("/onboarding");
        router.refresh();
        return;
      }

      setConfirmationSent(true);
      setMessage("We sent a confirmation link to your inbox. Open it, then come back and sign in to enter Harbor.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Harbor could not complete that request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#020617] text-slate-200">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin text-[#D4AF37]" />
          Lighting the harbor...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,116,144,0.18),transparent_32%)]" />
      <div className="absolute left-[-10rem] top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-[-9rem] right-[-6rem] h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <section className="hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-10 shadow-2xl shadow-black/30 backdrop-blur-xl lg:block">
          <div className="flex items-center gap-3 text-[#D4AF37]">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
              <Anchor className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]/75">Harbor Family Planner</p>
              <p className="harbor-serif text-2xl font-semibold">Your calm family home base</p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-200/70">The porch light is on</p>
            <h1 className="harbor-serif mt-5 text-6xl font-semibold leading-[0.98] text-white">
              Welcome home to calmer days.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Plan meals, gather groceries, keep the family calendar moving, and save the little moments worth remembering.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              [Sparkles, "Simpler planning", "One clear rhythm for the whole household."],
              [ShieldCheck, "Private by design", "Your household data stays tied to your account."],
              [Anchor, "Built to grow", "Recipes, groceries, memories, and more in one harbor."],
            ].map(([Icon, title, detail]) => {
              const CardIcon = Icon as typeof Sparkles;
              return (
                <div className="rounded-3xl border border-white/8 bg-slate-950/45 p-5" key={title as string}>
                  <CardIcon className="h-5 w-5 text-[#D4AF37]" />
                  <h2 className="mt-4 font-semibold text-slate-100">{title as string}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{detail as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
              <Anchor className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/75">Harbor</p>
              <p className="harbor-serif text-xl font-semibold">Family Planner</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">Welcome home</p>
              <h2 className="harbor-serif mt-3 text-4xl font-semibold text-white">
                {mode === "signin" ? "Come back inside." : "Create your Harbor."}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {mode === "signin"
                  ? "Sign in and pick up where your household left off."
                  : "Start a private home base for your meals, plans, groceries, and memories."}
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.035] p-1">
              <button
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${mode === "signin" ? "bg-[#D4AF37] text-slate-950" : "text-slate-400 hover:text-white"}`}
                onClick={() => switchMode("signin")}
                type="button"
              >
                Sign In
              </button>
              <button
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${mode === "signup" ? "bg-[#D4AF37] text-slate-950" : "text-slate-400 hover:text-white"}`}
                onClick={() => switchMode("signup")}
                type="button"
              >
                Create Account
              </button>
            </div>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Email address</span>
                <input
                  autoComplete="email"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/70 focus:ring-2 focus:ring-[#D4AF37]/10"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Password</span>
                <div className="relative">
                  <input
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/70 focus:ring-2 focus:ring-[#D4AF37]/10"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 6 characters"
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500 transition hover:text-[#D4AF37]"
                    onClick={() => setShowPassword((current) => !current)}
                    type="button"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>

              {message ? (
                <div className={`flex gap-3 rounded-2xl border p-4 text-sm leading-6 ${confirmationSent ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-amber-300/20 bg-amber-300/10 text-amber-200"}`}>
                  {confirmationSent ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : null}
                  <p>{message}</p>
                </div>
              ) : null}

              <button
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3.5 font-bold text-slate-950 transition hover:bg-[#B5942B] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
                type="submit"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                {mode === "signin" ? "Enter Harbor" : "Create My Harbor"}
                {!loading ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-slate-600">
              Harbor uses secure email and password authentication through Supabase.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
