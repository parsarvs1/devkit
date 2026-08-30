"use client";

import Link from "next/link";
import { Code2, User, LogOut, Settings } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const isLoggedIn = status === "authenticated";

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2 text-white"
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

          {/* Loading */}

          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-900" />
          ) : isLoggedIn ? (

            /* Logged in */

            <div className="relative">

              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800">
                  <User size={14} />
                </div>

                <span>
                  {session?.user?.name || "Account"}
                </span>

                <span className="text-xs text-zinc-600">
                  ▾
                </span>
              </button>

              {/* Dropdown */}

              {open && (
                <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">

                  {/* User info */}

                  <div className="border-b border-zinc-800 px-4 py-3">

                    <p className="truncate text-sm font-medium text-white">
                      {session?.user?.name || "DevKit User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {session?.user?.email}
                    </p>

                  </div>

                  {/* Account */}

                  <div className="p-1">

                    <Link
                      href="/account"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <User size={16} />

                      Account
                    </Link>

                    {/* Settings */}

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Settings size={16} />

                      Settings
                    </button>

                  </div>

                  {/* Sign out */}

                  <div className="border-t border-zinc-800 p-1">

                    <button
                      type="button"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
                    >
                      <LogOut size={16} />

                      Sign out
                    </button>

                  </div>

                </div>
              )}

            </div>

          ) : (

            /* Logged out */

            <div className="flex items-center gap-3">

              <Link
                href="/login"
                className="transition hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Sign Up
              </Link>

            </div>

          )}

        </div>
      </div>
    </nav>
  );
}