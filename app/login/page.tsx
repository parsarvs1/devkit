"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

import {
  Code2,
  ArrowLeft,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Email or password is incorrect.");
        setLoading(false);
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">

        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to DevKit
        </Link>

        <div className="mb-8">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
            <Code2 size={22} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Sign in to access your DevKit account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Email
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Password
            </label>

            <div className="relative">
              <Lock
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-white transition hover:text-zinc-300"
          >
            Create one
          </Link>
        </p>

      </div>
    </main>
  );
}