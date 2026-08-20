import Link from "next/link";

import { Code2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2">
          <Code2
            size={21}
            className="text-zinc-300 transition group-hover:text-white"
          />

          <span className="text-lg font-semibold tracking-tight">DevKit</span>
        </Link>

        <div className="flex items-center gap-5 text-sm text-zinc-400">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>

          <Link href="/tools" className="transition hover:text-white">
            Tools
          </Link>

          <Link
            href="/about"
            className="hidden transition hover:text-white sm:block"
          >
            About
          </Link>
          <a
            href="https://github.com/parsarvs1/devkit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DevKit GitHub repository"
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
          >
            <Code2   size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
