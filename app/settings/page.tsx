"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Monitor,
  Moon,
  Sun,
  Check,
  Settings as SettingsIcon,
  User,
  Mail,
  Command,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Keyboard,
} from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";
import SignOutButton from "@/components/SignOutButton";

type Theme = "light" | "dark" | "system";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const themes: {
    value: Theme;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "light",
      label: "Light",
      description: "Use the light appearance.",
      icon: <Sun size={18} />,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Use the dark appearance.",
      icon: <Moon size={18} />,
    },
    {
      value: "system",
      label: "System",
      description: "Follow your device preference.",
      icon: <Monitor size={18} />,
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">

        {/* Back */}

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to dashboard
        </Link>

        {/* Header */}

        <div className="mt-8 flex items-center gap-4 sm:mt-10">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 sm:h-14 sm:w-14">
            <SettingsIcon size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Settings
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Customize your DevKit experience.
            </p>
          </div>
        </div>

        {/* =========================
            APPEARANCE
        ========================== */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 sm:mt-10">

          <div className="border-b border-zinc-800 px-5 py-5 sm:px-6">
            <h2 className="font-semibold">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Choose how DevKit looks.
            </p>
          </div>

          <div className="p-2 sm:p-3">

            {themes.map((item) => {
              const active = theme === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTheme(item.value)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition sm:px-4 sm:py-4 ${
                    active
                      ? "bg-zinc-800"
                      : "hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-zinc-700 text-white"
                          : "bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          active
                            ? "text-white"
                            : "text-zinc-300"
                        }`}
                      >
                        {item.label}
                      </p>

                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {item.description}
                      </p>
                    </div>

                  </div>

                  {active && (
                    <div className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-700">
                      <Check size={15} />
                    </div>
                  )}
                </button>
              );
            })}

          </div>
        </section>

        {/* Current Theme */}

        <section className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 sm:mt-6 sm:p-6">
          <div className="flex items-center justify-between gap-4">

            <div>
              <h2 className="font-semibold">
                Current theme
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Your selected appearance.
              </p>
            </div>

            <span className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium capitalize text-zinc-400">
              {theme}
            </span>

          </div>
        </section>

        {/* =========================
            ACCOUNT
        ========================== */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 sm:mt-6">

          <div className="border-b border-zinc-800 px-5 py-5 sm:px-6">
            <h2 className="font-semibold">
              Account
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Manage your account information.
            </p>
          </div>

          <div className="divide-y divide-zinc-800">

            {/* Profile */}

            <Link
              href="/dashboard"
              className="group flex items-center justify-between gap-4 px-5 py-5 transition hover:bg-zinc-900/70 sm:px-6"
            >
              <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500 transition group-hover:text-zinc-300">
                  <User size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-200">
                    Profile
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Manage your name and profile information.
                  </p>
                </div>

              </div>

              <ChevronRight
                size={17}
                className="shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-400"
              />
            </Link>

            {/* Email */}

            <div className="flex items-center gap-4 px-5 py-5 sm:px-6">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
                <Mail size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-200">
                  Email
                </p>

                <p className="mt-1 truncate text-xs text-zinc-500">
                  Your account email is managed by DevKit.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =========================
            PREFERENCES
        ========================== */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 sm:mt-6">

          <div className="border-b border-zinc-800 px-5 py-5 sm:px-6">
            <h2 className="font-semibold">
              Preferences
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Configure how you interact with DevKit.
            </p>
          </div>

          <div className="divide-y divide-zinc-800">

            {/* Command Palette */}

            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">

              <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
                  <Command size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-200">
                    Command Palette
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Quickly search and open DevKit tools.
                  </p>
                </div>

              </div>

              <div className="flex shrink-0 items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-500">
                <Keyboard size={13} />
                <span className="hidden sm:inline">
                  Ctrl
                </span>
                <span className="sm:hidden">
                  ⌘
                </span>
                <span>K</span>
              </div>

            </div>

            {/* Keyboard shortcut */}

            <div className="flex items-center gap-4 px-5 py-5 sm:px-6">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
                <Keyboard size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Keyboard shortcut
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Press Ctrl + K anywhere in DevKit to open the palette.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =========================
            SECURITY
        ========================== */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 sm:mt-6">

          <div className="border-b border-zinc-800 px-5 py-5 sm:px-6">
            <h2 className="font-semibold">
              Security
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Manage your current account session.
            </p>
          </div>

          <div className="divide-y divide-zinc-800">

            {/* Account status */}

            <div className="flex items-center gap-4 px-5 py-5 sm:px-6">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-emerald-500">
                <ShieldCheck size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-200">
                  Account status
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <p className="text-xs text-emerald-400">
                    Active
                  </p>
                </div>
              </div>

            </div>

            {/* Sign out */}

            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">

              <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
                  <LogOut size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    Sign out
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Sign out of your DevKit account.
                  </p>
                </div>

              </div>

              <SignOutButton />

            </div>

          </div>
        </section>

        {/* =========================
            MORE
        ========================== */}

        <section className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 sm:mt-6 sm:p-6">

          <h2 className="font-semibold">
            More settings
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Additional DevKit preferences and account controls
            will be added in future updates.
          </p>

        </section>

        {/* Footer spacing */}

        <div className="h-8" />

      </div>
    </main>
  );
}