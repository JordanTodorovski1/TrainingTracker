import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const TRAINING_TYPES = [
  { value: "upper-body", label: "Upper Body" },
  { value: "lower-body", label: "Lower Body" },
  { value: "full-body", label: "Full Body" },
  { value: "push", label: "Push Day" },
  { value: "pull", label: "Pull Day" },
  { value: "legs", label: "Leg Day" },
];

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen px-6 py-14 text-zinc-100">
      <main className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.26em] text-emerald-300/90">
            Training Tracker
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Zdravo Gospodine
          </h1>
          <p className="max-w-lg text-sm text-slate-300/85 sm:text-base">
            Pick today&apos;s split and start logging your workout in one flow.
          </p>
          <div className="flex items-center justify-between rounded-xl border border-slate-700/70 bg-slate-900/50 px-4 py-3">
            <p className="text-sm text-slate-300">
              Logged in as <span className="font-semibold">{user.username}</span>
            </p>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-200 transition hover:border-slate-400"
              >
                Logout
              </button>
            </form>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)] backdrop-blur">
          <form action="/plan" method="get" className="space-y-5">
            <label className="block text-sm font-medium text-slate-200">
              Select training type
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
              {TRAINING_TYPES.map((type) => (
                <label
                  key={type.value}
                  className="group flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-950/70 px-4 py-3 transition hover:border-emerald-300/60"
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    required
                    className="h-4 w-4 accent-emerald-300"
                  />
                  <span className="text-sm text-slate-100">{type.label}</span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200"
            >
              Open Workout Builder
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
