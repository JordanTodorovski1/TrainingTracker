import { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";

export const dynamic = "force-dynamic";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen px-6 py-14 text-zinc-100">
          <main className="mx-auto max-w-md rounded-2xl border border-slate-700/60 bg-slate-900/65 p-6 backdrop-blur">
            <p className="text-sm text-slate-300">Verifying email...</p>
          </main>
        </div>
      }
    >
      <VerifyEmailClient />
    </Suspense>
  );
}
