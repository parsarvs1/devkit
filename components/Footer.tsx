import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-medium">
            DevKit
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Useful tools for developers.
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm text-zinc-500">

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

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
            aria-label="GitHub"
          >
            <Code2 size={18} />
          </a>

        </div>

      </div>
    </footer>
  );
}