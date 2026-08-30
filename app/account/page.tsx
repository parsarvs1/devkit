import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  User,
  Mail,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Star,
  Clock3,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-16">

        {/* Header */}

        <div className="mb-10">
          <p className="mb-2 text-sm text-zinc-500">
            Account
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back,{" "}
            {session.user.name || "Developer"}
          </h1>

          <p className="mt-3 text-zinc-500">
            Manage your DevKit account and tools.
          </p>
        </div>

        {/* Profile */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
                <User
                  size={24}
                  className="text-zinc-400"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  {session.user.name ||
                    "DevKit User"}
                </h2>

                <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                  <Mail size={14} />

                  {session.user.email}
                </div>
              </div>

            </div>

            <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-500">
              <ShieldCheck size={15} />

              Account active
            </div>

          </div>

        </div>

        {/* Tools */}

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          {/* Favorites */}

          <Link
            href="/tools"
            className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                <Star
                  size={19}
                  className="text-zinc-400"
                />
              </div>

              <ArrowRight
                size={17}
                className="text-zinc-700 transition group-hover:text-zinc-300"
              />

            </div>

            <h3 className="mt-5 font-semibold">
              Favorite Tools
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Quickly access the developer tools
              you use most.
            </p>

          </Link>

          {/* Recently Used */}

          <Link
            href="/tools"
            className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                <Clock3
                  size={19}
                  className="text-zinc-400"
                />
              </div>

              <ArrowRight
                size={17}
                className="text-zinc-700 transition group-hover:text-zinc-300"
              />

            </div>

            <h3 className="mt-5 font-semibold">
              Recently Used
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Continue using the tools you recently
              opened.
            </p>

          </Link>

        </div>

        {/* Account Settings */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

          <h2 className="font-semibold">
            Account Settings
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your account preferences.
          </p>

          <div className="mt-5 border-t border-zinc-800 pt-5">

            <button
              type="button"
              className="flex items-center gap-2 text-sm text-red-400 transition hover:text-red-300"
            >
              <LogOut size={16} />

              Sign out
            </button>

          </div>

        </div>

      </section>

      <Footer />
    </main>
  );
}