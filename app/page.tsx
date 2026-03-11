const TRAINING_TYPES = [
  { value: "upper-body", label: "Upper Body" },
  { value: "lower-body", label: "Lower Body" },
  { value: "push", label: "Push Day" },
  { value: "pull", label: "Pull Day" },
  { value: "legs", label: "Leg Day" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
      <main className="mx-auto max-w-xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.22em] text-lime-400">
            Training Tracker
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Zdravo Gospodine</h1>
        </header>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <form action="/plan" method="get" className="space-y-4">
            <label htmlFor="type" className="block text-sm text-zinc-300">
              Select training type
            </label>
            <select
              id="type"
              name="type"
              required
              defaultValue=""
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none ring-lime-400 focus:ring-2"
            >
              <option value="" disabled>
                Izberi tip na trening
              </option>
              {TRAINING_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-md bg-lime-400 px-5 py-2 font-semibold text-zinc-950 transition hover:bg-lime-300"
            >
              Continue
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
