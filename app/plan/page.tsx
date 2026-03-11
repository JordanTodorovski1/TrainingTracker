"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EXERCISES } from "@/lib/exercises";

const TRAINING_LABELS: Record<string, string> = {
  "upper-body": "Upper Body",
  "lower-body": "Lower Body",
  push: "Push Day",
  pull: "Pull Day",
  legs: "Leg Day",
};

type LoggedExercise = {
  id: string;
  name: string;
  sets: number;
  repsBySet: string[];
};

export default function PlanPage() {
  const searchParams = useSearchParams();
  const trainingType = searchParams.get("type") ?? "";
  const trainingLabel = TRAINING_LABELS[trainingType] ?? "Unknown";

  const [search, setSearch] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [plannedSets, setPlannedSets] = useState(3);
  const [completedReps, setCompletedReps] = useState<string[]>(["", "", ""]);
  const [loggedExercises, setLoggedExercises] = useState<LoggedExercise[]>([]);

  const selectedExercise = useMemo(
    () => EXERCISES.find((exercise) => exercise.id === selectedExerciseId),
    [selectedExerciseId],
  );

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

    setLoggedExercises((current) => [
      ...current,
      {
        id: `${selectedExercise.id}-${current.length + 1}`,
        name: selectedExercise.name,
        sets: plannedSets,
        repsBySet,
      },
    ]);

    setSelectedExerciseId("");
    setSearch("");
    setPlannedSets(3);
    setCompletedReps(["", "", ""]);
  };

  if (!trainingType || !TRAINING_LABELS[trainingType]) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
        <main className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold">No training type selected</h1>
          <p className="text-zinc-300">
            Go back and first choose what type of training you plan.
          </p>
          <Link
            href="/"
            className="inline-block rounded-md bg-lime-400 px-5 py-2 font-semibold text-zinc-950 transition hover:bg-lime-300"
          >
            Back
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
      <main className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.22em] text-lime-400">
            Training Tracker
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{trainingLabel}</h1>
          <p className="text-zinc-300">
            Search and choose one exercise, set planned series, then fill
            actual reps after each finished series.
          </p>
        </header>

        <section className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">Zavrseni vezbi</p>
            {loggedExercises.length === 0 ? (
              <p className="text-sm text-zinc-500">Uste nema dodadeni vezbi.</p>
            ) : (
              <ul className="space-y-2">
                {loggedExercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2"
                  >
                    <p className="text-sm font-medium text-zinc-200">
                      {exercise.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {exercise.sets} serii | {exercise.repsBySet.join(" / ")}{" "}
                      povtoruvanja
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="exercise-search" className="text-sm text-zinc-300">
              Search exercise
            </label>
            <input
              id="exercise-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Example: bench, squat, row..."
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none ring-lime-400 focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-zinc-300">Suggested answers</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {suggestions.map((exercise) => (
                <button
                  key={exercise.id}
                  type="button"
                  onClick={() => setSelectedExerciseId(exercise.id)}
                  className={`rounded-md border px-3 py-2 text-left transition ${
                    selectedExerciseId === exercise.id
                      ? "border-lime-400 bg-lime-400/10 text-lime-200"
                      : "border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-500"
                  }`}
                >
                  <span className="block font-medium">{exercise.name}</span>
                  <span className="text-xs text-zinc-400">
                    {exercise.muscleGroup}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {selectedExercise ? (
            <div className="space-y-4 rounded-lg border border-zinc-700 bg-zinc-950 p-4">
              <p>
                Selected:{" "}
                <span className="font-semibold text-lime-300">
                  {selectedExercise.name}
                </span>
              </p>

              <div className="space-y-2">
                <label htmlFor="planned-sets" className="text-sm text-zinc-300">
                  Planned series
                </label>
                <input
                  id="planned-sets"
                  type="number"
                  min={1}
                  max={10}
                  value={plannedSets}
                  onChange={(event) => updateSetCount(Number(event.target.value))}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none ring-lime-400 focus:ring-2"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm text-zinc-300">
                  Enter actual reps after each finished series
                </p>
                {completedReps.map((value, index) => (
                  <div key={index} className="space-y-1">
                    <label
                      htmlFor={`series-${index + 1}`}
                      className="text-sm text-zinc-300"
                    >
                      Series {index + 1} - completed reps
                    </label>
                    <input
                      id={`series-${index + 1}`}
                      type="number"
                      min={0}
                      max={100}
                      value={value}
                      onChange={(event) => setRepForIndex(index, event.target.value)}
                      className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 outline-none ring-lime-400 focus:ring-2"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addToCompleted}
                className="rounded-md border border-zinc-600 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-400 hover:text-zinc-100"
              >
                Dodadi vo zavrseni vezbi
              </button>
            </div>
          ) : (
            <p className="text-zinc-400">
              Select one exercise from the suggestions to continue.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
