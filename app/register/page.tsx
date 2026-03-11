"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(json.error ?? "Registration failed.");
      return;
    }

    setMessage(json.message ?? "Registration successful.");
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="min-h-screen px-6 py-14 text-zinc-100">
      <main className="mx-auto max-w-md space-y-6 rounded-2xl border border-slate-700/60 bg-slate-900/65 p-6 backdrop-blur">
        <h1 className="text-3xl font-semibold">Register</h1>
        <p className="text-sm text-slate-300">
          Create account and verify email before login.
        </p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-xl border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-300/80"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-300/80"
          />
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8)"
            className="w-full rounded-xl border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-300/80"
          />

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-300">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-slate-300">
          Already have account?{" "}
          <Link href="/login" className="text-emerald-300 hover:text-emerald-200">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}
