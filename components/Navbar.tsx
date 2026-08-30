"use client";

import Link from "next/link";
import { Code2, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  return (
    <nav className="border-b border-zinc-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Code2 size={21} />

          <span className="text-lg font-semibold">
            DevKit
          </span>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-6 text-sm text-zinc-400">

          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/tools"
            className="transition hover:text-white"
          >
            Tools
          </Link>

          <Link
            href="/about"
            className="transition hover:text-white"
          >
            About
          </Link>

          {status === "loading" ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-zinc-900" />
          ) : isLoggedIn ? (
            <div className="flex items-center gap-3">

              <Link
                href="/account"
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                <User size={16} />

                <span>
                  {session?.user?.name || "Account"}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-zinc-500 transition hover:text-white"
              >
                Sign out
              </button>

            </div>
          ) : (
            <Link
              href="/signup"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Sign Up
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}