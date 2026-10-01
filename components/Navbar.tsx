"use client";

import Link from "next/link";

import {
  Code2,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Sun,
  Moon,
  Monitor,
  Check,
  Menu,
  X,
} from "lucide-react";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

import { useTheme } from "@/components/ThemeProvider";

type Theme = "light" | "dark" | "system";

export default function Navbar() {
  const { data: session, status } = useSession();

  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = status === "authenticated";

  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);
    setThemeOpen(false);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
    setThemeOpen(false);
    setOpen(false);
  }

  function getThemeIcon() {
    if (theme === "light") {
      return <Sun size={17} />;
    }

    if (theme === "dark") {
      return <Moon size={17} />;
    }

    return <Monitor size={17} />;
  }

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* =========================
            LOGO
        ========================== */}

        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 text-white"
        >
          <Code2 size={21} />

          <span className="text-lg font-semibold">
            DevKit
          </span>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">

          {/* Home */}

          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

          {/* Tools */}

          <Link
            href="/tools"
            className="transition hover:text-white"
          >
            Tools
          </Link>

          {/* About */}

          <Link
            href="/about"
            className="transition hover:text-white"
          >
            About
          </Link>

          {/* =========================
              THEME
          ========================== */}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setThemeOpen((value) => !value);
                setOpen(false);
              }}
              aria-label="Change theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            >
              {getThemeIcon()}
            </button>

            {themeOpen && (
              <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1 shadow-2xl">

                {/* Light */}

                <button
                  type="button"
                  onClick={() => changeTheme("light")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Sun size={16} />
                    Light
                  </span>

                  {theme === "light" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>

                {/* Dark */}

                <button
                  type="button"
                  onClick={() => changeTheme("dark")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Moon size={16} />
                    Dark
                  </span>

                  {theme === "dark" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>

                {/* System */}

                <button
                  type="button"
                  onClick={() => changeTheme("system")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Monitor size={16} />
                    System
                  </span>

                  {theme === "system" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* =========================
              AUTHENTICATION
          ========================== */}

          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-900" />
          ) : isLoggedIn ? (
            <div className="relative">

              {/* Dashboard Button */}

              <button
                type="button"
                onClick={() => {
                  setOpen((value) => !value);
                  setThemeOpen(false);
                }}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:text-white"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800">
                  <User size={14} />
                </div>

                <span>
                  {session?.user?.name || "Account"}
                </span>

                <span className="text-xs text-zinc-500">
                  ▼
                </span>
              </button>

              {/* Dashboard Dropdown */}

              {open && (
                <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">

                  {/* User Info */}

                  <div className="border-b border-zinc-800 px-4 py-3">
                    <p className="truncate text-sm font-medium text-white">
                      {session?.user?.name || "DevKit User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {session?.user?.email}
                    </p>
                  </div>

                  <div className="p-1">

                    {/* Dashboard */}

                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <LayoutDashboard size={16} />

                      Dashboard
                    </Link>

                    {/* Settings */}

                    <Link
                      href="/settings"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Settings size={16} />

                      Settings
                    </Link>
                  </div>

                  {/* Sign Out */}

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
            <Link
              href="/login"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* =========================
            MOBILE CONTROLS
        ========================== */}

        <div className="flex items-center gap-2 md:hidden">

          {/* Mobile Theme */}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setThemeOpen((value) => !value);
                setMobileOpen(false);
              }}
              aria-label="Change theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            >
              {getThemeIcon()}
            </button>

            {themeOpen && (
              <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1 shadow-2xl">

                {/* Light */}

                <button
                  type="button"
                  onClick={() => changeTheme("light")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Sun size={16} />
                    Light
                  </span>

                  {theme === "light" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>

                {/* Dark */}

                <button
                  type="button"
                  onClick={() => changeTheme("dark")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Moon size={16} />
                    Dark
                  </span>

                  {theme === "dark" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>

                {/* System */}

                <button
                  type="button"
                  onClick={() => changeTheme("system")}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Monitor size={16} />
                    System
                  </span>

                  {theme === "system" && (
                    <Check
                      size={15}
                      className="text-white"
                    />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Hamburger */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((value) => !value);
              setThemeOpen(false);
            }}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
          >
            {mobileOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}

      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">

            {/* Navigation */}

            <div className="space-y-1">

              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/tools"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                Tools
              </Link>

              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                About
              </Link>
            </div>

            {/* Divider */}

            <div className="my-3 border-t border-zinc-800" />

            {/* Authentication */}

            {status === "loading" ? (
              <div className="h-10 animate-pulse rounded-lg bg-zinc-900" />
            ) : isLoggedIn ? (
              <div className="space-y-1">

                {/* User */}

                <div className="mb-2 rounded-lg bg-zinc-900 px-3 py-3">
                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
                      <User size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {session?.user?.name || "DevKit User"}
                      </p>

                      <p className="truncate text-xs text-zinc-500">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dashboard */}

                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                >
                  <LayoutDashboard size={17} />

                  Dashboard
                </Link>

                {/* Settings */}

                <Link
                  href="/settings"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                >
                  <Settings size={17} />

                  Settings
                </Link>

                {/* Sign Out */}

                <button
                  type="button"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
                >
                  <LogOut size={17} />

                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-lg bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}