"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EXERCISES } from "@/lib/exercises";

const TRAINING_LABELS: Record<string, string> = {
  "upper-body": "Upper Body",
  "lower-body": "Lower Body",
  "full-body": "Full Body",
  push: "Push Day",
  pull: "Pull Day",
  legs: "Leg Day",
};

const TRAINING_OPTIONS = Object.entries(TRAINING_LABELS).map(
  ([value, label]) => ({ value, label }),
);

type SelectableExercise = {
  id: string;
  name: string;
  muscleGroup: string;
  trainingType: string;
};

type LoggedExercise = {
  id: string;
  name: string;
  trainingLabel: string;
  sets: number;
  repsBySet: string[];
};

export default function PlanClient() {
  const searchParams = useSearchParams();
  const trainingType = searchParams.get("type") ?? "";
  const trainingLabel = TRAINING_LABELS[trainingType] ?? "Unknown";

  const [search, setSearch] = useState("");
  const [selectedExercise, setSelectedExercise] =
    useState<SelectableExercise | null>(null);
  const [customExerciseName, setCustomExerciseName] = useState("");
  const [customExerciseTraining, setCustomExerciseTraining] =
    useState(trainingType || "upper-body");
  const [plannedSets, setPlannedSets] = useState(3);
  const [completedReps, setCompletedReps] = useState<string[]>(["", "", ""]);
  const [loggedExercises, setLoggedExercises] = useState<LoggedExercise[]>([]);

  const suggestions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return EXERCISES.slice(0, 15);
    }

    return EXERCISES.filter((exercise) =>
      exercise.name.toLowerCase().includes(term),
    ).slice(0, 15);
  }, [search]);

  const updateSetCount = (value: number) => {
    const safeValue = Math.min(10, Math.max(1, value));
    setPlannedSets(safeValue);
    setCompletedReps((current) => {
      if (safeValue === current.length) {
        return current;
      }

      const resized = Array.from({ length: safeValue }, (_, index) => {
        return current[index] ?? "";
      });

      return resized;
    });
  };

  const setRepForIndex = (index: number, value: string) => {
    setCompletedReps((current) =>
      current.map((repValue, repIndex) =>
        repIndex === index ? value : repValue,
      ),
    );
  };

  const addToCompleted = () => {
    if (!selectedExercise) {
      return;
    }

    const repsBySet = completedReps.map((value) => value.trim() || "-");
    const selectedTrainingLabel =
      TRAINING_LABELS[selectedExercise.trainingType] ?? "Custom";

    setLoggedExercises((current) => [
      ...current,
      {
        id: `${selectedExercise.id}-${current.length + 1}`,
        name: selectedExercise.name,
        trainingLabel: selectedTrainingLabel,
        sets: plannedSets,
        repsBySet,
      },
    ]);

    setSelectedExercise(null);
    setSearch("");
    setPlannedSets(3);
    setCompletedReps(["", "", ""]);
  };

  const addCustomExercise = () => {
    const cleanedName = customExerciseName.trim();
    if (!cleanedName) {
      return;
    }

    setSelectedExercise({
      id: `custom-${Date.now()}`,
      name: cleanedName,
      muscleGroup: "Custom",
      trainingType: customExerciseTraining || trainingType || "upper-body",
    });
  };

  if (!trainingType || !TRAINING_LABELS[trainingType]) {
    return (
      <div className="min-h-screen px-6 py-12 text-zinc-100">
        <main className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold">No training type selected</h1>
          <p className="text-zinc-300">
            Go back and first choose what type of training you plan.
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-emerald-300 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-200"
          >
            Back
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 text-zinc-100">
      <main className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.26em] text-emerald-300/90">
            Training Tracker
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            {trainingLabel}
          </h1>
          <p className="max-w-2xl text-slate-300">
            Select one exercise, enter planned sets, then log completed reps for
            each set.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <article className="space-y-5 rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)] backdrop-blur">
            {!selectedExercise ? (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="exercise-search"
                    className="text-sm font-medium text-slate-200"
                  >
                    Search exercise
                  </label>
                  <input
                    id="exercise-search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Type exercise name..."
                    className="w-full rounded-xl border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-300/80"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-300">
                    Suggested exercises
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {suggestions.map((exercise) => (
                      <button
                        key={exercise.id}
                        type="button"
                        onClick={() =>
                          setSelectedExercise({
                            id: exercise.id,
                            name: exercise.name,
                            muscleGroup: exercise.muscleGroup,
                            trainingType,
                          })
                        }
                        className="rounded-xl border border-slate-700/90 bg-slate-950/70 px-4 py-3 text-left transition hover:border-emerald-300/70"
                      >
                        <span className="block font-medium text-slate-100">
                          {exercise.name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {exercise.muscleGroup}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border border-slate-700/80 bg-slate-950/70 p-4">
                  <p className="text-sm font-medium text-slate-200">
                    Add your own exercise
                  </p>
                  <input
                    value={customExerciseName}
                    onChange={(event) => setCustomExerciseName(event.target.value)}
                    placeholder="Exercise name"
                    className="w-full rounded-lg border border-slate-700/90 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-300/80"
                  />
                  <select
                    value={customExerciseTraining}
                    onChange={(event) =>
                      setCustomExerciseTraining(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700/90 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-300/80"
                  >
                    {TRAINING_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addCustomExercise}
                    className="w-full rounded-lg border border-emerald-300/60 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300/10"
                  >
                    Add Custom Exercise
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-5 rounded-xl border border-emerald-300/30 bg-emerald-300/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">
                      Selected Exercise
                    </p>
                    <p className="mt-1 text-xl font-semibold text-emerald-100">
                      {selectedExercise.name}
                    </p>
                    <p className="mt-1 text-xs text-emerald-200/80">
                      Training:{" "}
                      {TRAINING_LABELS[selectedExercise.trainingType] ?? "Custom"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedExercise(null)}
                    className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-200 transition hover:border-slate-400"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="planned-sets"
                    className="text-sm font-medium text-slate-200"
                  >
                    Planned sets
                  </label>
                  <input
                    id="planned-sets"
                    type="number"
                    min={1}
                    max={10}
                    value={plannedSets}
                    onChange={(event) => updateSetCount(Number(event.target.value))}
                    className="w-full rounded-xl border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-300/80"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-300">
                    Reps by set
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {completedReps.map((value, index) => (
                      <div key={index} className="space-y-1.5">
                        <label
                          htmlFor={`series-${index + 1}`}
                          className="text-xs text-slate-400"
                        >
                          Set {index + 1}
                        </label>
                        <input
                          id={`series-${index + 1}`}
                          type="number"
                          min={0}
                          max={100}
                          value={value}
                          onChange={(event) =>
                            setRepForIndex(index, event.target.value)
                          }
                          className="w-full rounded-lg border border-slate-700/90 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-300/80"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addToCompleted}
                  className="w-full rounded-xl bg-emerald-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200"
                >
                  Add To Completed Exercises
                </button>
              </div>
            )}
          </article>

          <aside className="h-fit rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Completed
            </p>
            <div className="mt-3 space-y-2">
              {loggedExercises.length === 0 ? (
                <p className="text-sm text-slate-500">No finished exercises yet.</p>
              ) : (
                <ul className="space-y-2">
                  {loggedExercises.map((exercise) => (
                    <li
                      key={exercise.id}
                      className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2"
                    >
                      <p className="text-sm font-medium text-slate-100">
                        {exercise.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {exercise.trainingLabel} • {exercise.sets} sets •{" "}
                        {exercise.repsBySet.join(" / ")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
