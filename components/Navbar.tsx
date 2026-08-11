import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Code2 size={21} />

          <span className="text-lg font-semibold">
            DevKit
          </span>
        </Link>

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
        </div>

      </div>
    </nav>
  );
}