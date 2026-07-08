import { AppShell } from "@/components/AppShell";

const members = [
  { name: "Maya", role: "Schedule keeper", note: "School, practice, and reminders" },
  { name: "Taylor", role: "Meal helper", note: "Dinner ideas and grocery check" },
  { name: "The kids", role: "Daily rhythm", note: "Lunches, homework, bedtime" }
];

export default function FamilyPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-family-berry">Family</p>
          <h1 className="mt-3 text-5xl font-black leading-tight text-family-ink md:text-6xl">Everyone in the loop.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-black/60">
            This is the family space for members, roles, routines, and who needs to see what.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {members.map((member) => (
            <div key={member.name} className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-family-berry/10 text-xl">🏡</div>
              <h2 className="mt-4 text-2xl font-black">{member.name}</h2>
              <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-family-berry">{member.role}</p>
              <p className="mt-3 text-sm leading-6 text-black/55">{member.note}</p>
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
