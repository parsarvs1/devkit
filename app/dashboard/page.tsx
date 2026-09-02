import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Settings,
  ShieldCheck,
  User,
  Wrench,
} from "lucide-react";

import { auth } from "@/auth";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardStats from "@/components/DashboardStats";
import EditProfile from "@/components/EditProfile";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  const userName =
    user.name ||
    user.email?.split("@")[0] ||
    "Developer";

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
            <Code2 size={16} />
            <span>Developer Workspace</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {userName}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Manage your profile, explore developer tools, and keep track of
            your DevKit workspace.
          </p>
        </div>

        {/* OVERVIEW */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Overview
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              A quick look at your DevKit activity.
            </p>
          </div>

          <DashboardStats />
        </section>

        {/* PERSONAL AREA */}
        <section className="mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Your Workspace
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Manage your profile and access the most important areas.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            {/* PROFILE */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Profile
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Personal Information
                  </h3>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-lg font-semibold text-zinc-200">
                  {userInitial}
                </div>
              </div>

              <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400">
                    <User size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">
                      {userName}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <EditProfile initialName={userName} />
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Quick Access
                </p>

                <h3 className="mt-1 text-xl font-semibold text-white">
                  Get Things Done
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Jump directly to the parts of DevKit you use most.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/tools"
                  className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 transition hover:border-zinc-700 hover:bg-zinc-950"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition group-hover:text-white">
                      <Wrench size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Developer Tools
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Browse all available tools
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={17}
                    className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-zinc-300"
                  />
                </Link>

                <Link
                  href="/settings"
                  className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 transition hover:border-zinc-700 hover:bg-zinc-950"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition group-hover:text-white">
                      <Settings size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Settings
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Manage your preferences
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={17}
                    className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-zinc-300"
                  />
                </Link>
              </div>

              {/* ACCOUNT STATUS */}
              <div className="mt-6 border-t border-zinc-800 pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck
                    size={17}
                    className="text-zinc-400"
                  />

                  <span className="text-sm font-medium text-zinc-300">
                    Account Status
                  </span>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                      Status
                    </span>

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-xs text-zinc-600">
                      User ID
                    </span>

                    <p className="mt-1 break-all font-mono text-xs text-zinc-400">
                      {user.id}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <SignOutButton />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPER WORKSPACE */}
        <section className="mt-10">
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300">
                  <Code2 size={20} />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Developer Workspace
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Your collection of practical developer utilities is ready.
                  Format JSON, decode JWTs, generate UUIDs, test regex, encode
                  data, work with hashes, URLs, timestamps, and more.
                </p>
              </div>

              <Link
                href="/tools"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Open DevKit Tools
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}