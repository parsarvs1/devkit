"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Monitor,
  Moon,
  Sun,
  Check,
  Settings as SettingsIcon,
} from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";

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
      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Back */}

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>

        {/* Header */}

        <div className="mt-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
            <SettingsIcon size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Settings
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Customize your DevKit experience.
            </p>
          </div>
        </div>

        {/* Appearance */}

        <section className="mt-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30">

          <div className="border-b border-zinc-800 px-6 py-5">
            <h2 className="font-semibold">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Choose how DevKit looks.
            </p>
          </div>

          <div className="p-3">

            {themes.map((item) => {
              const active = theme === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTheme(item.value)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-4 text-left transition ${
                    active
                      ? "bg-zinc-800"
                      : "hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        active
                          ? "bg-zinc-700 text-white"
                          : "bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <p
                        className={`text-sm font-medium ${
                          active
                            ? "text-white"
                            : "text-zinc-300"
                        }`}
                      >
                        {item.label}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        {item.description}
                      </p>
                    </div>

                  </div>

                  {active && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700">
                      <Check size={15} />
                    </div>
                  )}
                </button>
              );
            })}

          </div>
        </section>

        {/* Current theme */}

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">

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

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">

          <h2 className="font-semibold">
            More settings
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            More DevKit preferences will be available here
            in future updates.
          </p>

        </section>

      </div>
    </main>
  );
}