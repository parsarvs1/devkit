import Link from "next/link";

import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}

          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <Code2
                size={19}
                className="text-zinc-400"
              />

              <span className="text-sm font-semibold">
                DevKit
              </span>
            </Link>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Simple, fast and useful developer tools,
              available directly in your browser.
            </p>
          </div>

          {/* Links */}

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
              Explore
            </p>

            <div className="flex flex-col gap-2 text-sm text-zinc-500">
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
            </div>
          </div>

          {/* Project */}

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
              Project
            </p>

            <a
              href="https://github.com/parsarvs1/devkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>


        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-900 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} DevKit. All rights reserved.
          </p>

          <p>
            Built for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}