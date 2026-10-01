import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PinButton from "@/components/PinButton";
interface ToolCardProps {
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
  category?: string;
}

export default function ToolCard({
  name,
  description,
  icon: Icon,
  href,
  category,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-200px flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/60 sm:min-h-[220px] sm:p-6"
    >
      {/* Glow */}

      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/5 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      {/* Top */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition-all duration-200 group-hover:border-zinc-700 group-hover:bg-zinc-800 group-hover:text-white sm:h-11 sm:w-11">
          <Icon
            size={19}
            strokeWidth={1.8}
          />
        </div>

        <div className="flex items-center gap-1">
  <PinButton href={href} />

  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-all duration-200 group-hover:bg-zinc-800 group-hover:text-zinc-300">
    <ArrowUpRight
      size={17}
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </div>
</div>
      </div>

      {/* Content */}

      <div className="relative mt-5 sm:mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
            {name}
          </h3>

          {category && (
            <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
              {category}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          {description}
        </p>
      </div>

      {/* Bottom */}

      <div className="relative mt-auto pt-5 sm:pt-6">
        <div className="flex items-center text-xs font-medium text-zinc-600 transition-colors group-hover:text-zinc-400">
          Open tool

          <ArrowUpRight
            size={13}
            className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}