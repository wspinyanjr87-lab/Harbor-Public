import HarborShell from "@/components/harbor/HarborShell";
import HarborNextStep from "@/components/harbor/HarborNextStep";
import { ArrowRight, Baby, CalendarDays, CheckCircle2, Heart, Home, Shield, Sparkles, UserPlus, Users, Utensils } from "lucide-react";

const setupSteps = [
  { label: "Name your Harbor", detail: "Set the household name and who manages it first.", icon: Home },
  { label: "Add your people", detail: "Adults, kids, pets, or other helpers can be added later too.", icon: UserPlus },
  { label: "Pick your rhythm", detail: "Meals, schedules, groceries, memories, or all of it.", icon: Sparkles },
  { label: "Start the first week", detail: "Harbor opens with a clean week and starter recipes.", icon: CalendarDays }
];

const starterPeople = [
  { name: "Adult / Manager", type: "Full access", icon: Shield },
  { name: "Adult", type: "Shared planning", icon: Users },
  { name: "Child", type: "View-only or limited", icon: Baby },
  { name: "Pet / Other", type: "Schedules and care notes", icon: Heart }
];

const launchCards = [
  { title: "Meals", text: "Start with a small recipe shelf and build from there.", href: "/planner", icon: Utensils },
  { title: "Calendar", text: "Add practices, pickups, appointments, and family time.", href: "/calendar", icon: CalendarDays },
  { title: "Family", text: "Give each person the right visibility and responsibilities.", href: "/settings", icon: Users }
];

export default function OnboardingPage() {
  return (
    <HarborShell active="home">
      <div className="mx-auto w-full max-w-7xl space-y-10 px-5 py-8 lg:px-10 lg:py-12">
        <section className="rounded-[2rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/10 via-white/[0.03] to-transparent p-6 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]/80">First Run Setup</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <h1 className="harbor-serif text-5xl font-semibold leading-none text-[#D4AF37] lg:text-7xl">Build your Harbor.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Start clean. Add your people, choose what your household needs, and let Harbor become the family command center without turning setup into homework.</p>
            </div>
            <div className="harbor-glass rounded-3xl p-5">
              <p className="text-sm font-semibold text-white">Launch Mode</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">This setup is ready for a new-user walkthrough. Live saving can connect to Harbor-only Supabase when keys are added.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {setupSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="harbor-glass rounded-3xl p-6" key={step.label}>
                <div className="mb-5 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]"><Icon className="h-6 w-6" /></div>
                  <span className="harbor-serif text-3xl text-[#D4AF37]/50">0{index + 1}</span>
                </div>
                <h2 className="harbor-serif text-2xl font-semibold text-white">{step.label}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.detail}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="harbor-glass rounded-[2rem] p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]/80">People Setup</p>
                <h2 className="harbor-serif mt-2 text-4xl font-semibold text-[#D4AF37]">Who belongs in your Harbor?</h2>
              </div>
              <UserPlus className="hidden h-8 w-8 text-[#D4AF37] sm:block" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {starterPeople.map((person) => {
                const Icon = person.icon;
                return (
                  <article className="rounded-3xl border border-white/5 bg-white/[0.03] p-5" key={person.name}>
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]"><Icon className="h-5 w-5" /></div>
                    <h3 className="text-lg font-bold text-white">{person.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{person.type}</p>
                    <div className="mt-4 rounded-2xl border border-dashed border-[#D4AF37]/25 p-4 text-sm text-slate-500">Name field, birthday, chores, notes, and access level continue in Setup Center.</div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="harbor-glass rounded-[2rem] p-6">
              <h2 className="harbor-serif text-3xl font-semibold text-[#D4AF37]">Ready Checklist</h2>
              <div className="mt-5 space-y-4">
                {["Household name", "At least one adult", "Starter recipe shelf", "First week created", "Invite flow planned"].map((item) => (
                  <div className="flex items-center gap-3" key={item}>
                    <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />
                    <span className="text-sm font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a className="flex items-center justify-between rounded-3xl bg-[#D4AF37] p-5 font-bold text-slate-950 transition hover:bg-[#B5942B]" href="/settings">
              Open Setup Center
              <ArrowRight className="h-5 w-5" />
            </a>
          </aside>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {launchCards.map((card) => {
            const Icon = card.icon;
            return (
              <a className="rounded-3xl border border-[#D4AF37]/15 bg-[#010411] p-6 transition hover:border-[#D4AF37]/35 hover:bg-white/[0.03]" href={card.href} key={card.title}>
                <Icon className="mb-4 h-7 w-7 text-[#D4AF37]" />
                <h2 className="harbor-serif text-2xl font-semibold text-white">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
              </a>
            );
          })}
        </section>

        <HarborNextStep
          title="Finish the details in Setup Center."
          text="Onboarding shows the path. Setup Center is where the household name, people, roles, and enabled sections become clear before planning meals."
          href="/settings"
          action="Continue to Setup Center"
        />
      </div>
    </HarborShell>
  );
}
