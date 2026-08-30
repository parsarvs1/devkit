import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

import {
  ArrowRight,
  Code2,
  LayoutDashboard,
  Settings,
  User,
  Wrench,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardStats from "@/components/DashboardStats";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userName =
    session.user.name || "Developer";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-14">

        {/* =========================
            Header
        ========================== */}

        <div className="mb-10">

          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
            <LayoutDashboard size={16} />

            Dashboard
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back, {userName}
          </h1>

          <p className="mt-3 text-zinc-500">
            Your personal DevKit workspace.
          </p>

        </div>

        {/* =========================
            Stats / Favorites /
            Recently Used
        ========================== */}

        <DashboardStats />

        {/* =========================
            Quick Access
        ========================== */}

        <div className="mt-8">

          <div className="mb-4">

            <h2 className="font-semibold">
              Quick Access
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Jump directly to the most useful parts of DevKit.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Tools */}

            <Link
              href="/tools"
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                  <Wrench
                    size={18}
                    className="text-zinc-400"
                  />
                </div>

                <ArrowRight
                  size={16}
                  className="text-zinc-700 transition group-hover:translate-x-1 group-hover:text-white"
                />

              </div>

              <h3 className="mt-5 font-medium">
                Browse Tools
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Explore all developer tools available in DevKit.
              </p>

            </Link>

            {/* Account */}

            <Link
              href="/account"
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                  <User
                    size={18}
                    className="text-zinc-400"
                  />
                </div>

                <ArrowRight
                  size={16}
                  className="text-zinc-700 transition group-hover:translate-x-1 group-hover:text-white"
                />

              </div>

              <h3 className="mt-5 font-medium">
                Account
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                View your profile and manage your account.
              </p>

            </Link>

            {/* Settings */}

            <Link
              href="/settings"
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                  <Settings
                    size={18}
                    className="text-zinc-400"
                  />
                </div>

                <ArrowRight
                  size={16}
                  className="text-zinc-700 transition group-hover:translate-x-1 group-hover:text-white"
                />

              </div>

              <h3 className="mt-5 font-medium">
                Settings
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Manage your DevKit preferences and settings.
              </p>

            </Link>

          </div>

        </div>

        {/* =========================
            Developer Workspace
        ========================== */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
                <Code2
                  size={22}
                  className="text-zinc-400"
                />
              </div>

              <div>

                <h2 className="font-semibold">
                  Developer Workspace
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Everything you need, in one place.
                </p>

              </div>

            </div>

            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Open Tools
              <ArrowRight size={15} />
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}