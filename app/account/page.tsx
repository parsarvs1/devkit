"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  Settings,
} from "lucide-react";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-6 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-6 space-y-4">
              <div className="h-12 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-12 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (status !== "authenticated") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <ShieldCheck
                size={26}
                className="text-zinc-600 dark:text-zinc-300"
              />
            </div>

            <h1 className="mt-5 text-2xl font-bold">
              Login required
            </h1>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              You need to be logged in to view your account.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">

        {/* Back */}

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {/* Header */}

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Account
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Manage your DevKit account and profile.
          </p>
        </div>

        {/* Profile */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">

          {/* Profile header */}

          <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <User
                  size={28}
                  className="text-zinc-600 dark:text-zinc-300"
                />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold">
                  {user?.name || "DevKit User"}
                </h2>

                <p className="mt-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
                  {user?.email || "No email available"}
                </p>
              </div>

            </div>
          </div>

          {/* Account information */}

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">

            {/* Name */}

            <div className="flex items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <User size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Name
                  </p>

                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Your display name
                  </p>
                </div>

              </div>

              <span className="max-w-[180px] truncate text-sm text-zinc-600 dark:text-zinc-300">
                {user?.name || "Not set"}
              </span>
            </div>

            {/* Email */}

            <div className="flex items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Your account email
                  </p>
                </div>

              </div>

              <span className="max-w-[220px] truncate text-sm text-zinc-600 dark:text-zinc-300">
                {user?.email || "Not available"}
              </span>
            </div>

            {/* Account status */}

            <div className="flex items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Account status
                  </p>

                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Current authentication status
                  </p>
                </div>

              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Authenticated
              </span>
            </div>

          </div>
        </section>

        {/* Actions */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2">

          <Link
            href="/settings"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <Settings size={18} />
            </div>

            <h3 className="mt-4 font-semibold">
              Settings
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Manage your preferences and account settings.
            </p>
          </Link>

          <button
            type="button"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="group rounded-2xl border border-red-200 bg-white p-6 text-left transition hover:border-red-300 hover:bg-red-50 dark:border-red-950 dark:bg-zinc-900 dark:hover:border-red-900 dark:hover:bg-red-950/20"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <LogOut size={18} />
            </div>

            <h3 className="mt-4 font-semibold">
              Sign out
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Sign out of your DevKit account.
            </p>
          </button>

        </section>

      </div>
    </main>
  );
}