"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type VerifyState = "loading" | "success" | "error";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<VerifyState>("loading");
  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setState("error");
        setMessage("Missing verification token.");
        return;
      }

      const response = await fetch(`/api/auth/verify?token=${token}`);
      const json = await response.json();

      if (!response.ok) {
        setState("error");
        setMessage(json.error ?? "Verification failed.");
        return;
      }

      setState("success");
      setMessage(json.message ?? "Email verified.");
    }

    verify();
  }, [token]);

  return (
    <div className="min-h-screen px-6 py-14 text-zinc-100">
      <main className="mx-auto max-w-md space-y-6 rounded-2xl border border-slate-700/60 bg-slate-900/65 p-6 backdrop-blur">
        <h1 className="text-3xl font-semibold">Email Verification</h1>
        <p
          className={`text-sm ${
            state === "success"
              ? "text-emerald-300"
              : state === "error"
                ? "text-rose-300"
                : "text-slate-300"
          }`}
        >
          {message}
        </p>

        {state !== "loading" ? (
          <Link
            href="/login"
            className="inline-block rounded-xl bg-emerald-300 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-200"
          >
            Go to login
          </Link>
        ) : null}
      </main>
    </div>
  );
}
