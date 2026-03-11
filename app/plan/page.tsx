import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import PlanClient from "./plan-client";

export const dynamic = "force-dynamic";

export default async function PlanPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen px-6 py-12 text-zinc-100">
          <main className="mx-auto max-w-3xl">
            <p className="text-zinc-400">Loading training plan...</p>
          </main>
        </div>
      }
    >
      <PlanClient />
    </Suspense>
  );
}
