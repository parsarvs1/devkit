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
    <div className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/60 sm:min-h-[220px] sm:p-6">


      <Link
        href={href}
        aria-label={`Open ${name}`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

     

      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/5 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

     

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition-all duration-200 group-hover:border-zinc-700 group-hover:bg-zinc-800 group-hover:text-white sm:h-11 sm:w-11">
          <Icon size={19} strokeWidth={1.8} />
        </div>

     

        <div className="relative z-20 flex items-center">
          <PinButton href={href} />
        </div>
      </div>

      

      <div className="pointer-events-none relative mt-5 sm:mt-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <h3 className="min-w-0 font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
            {name}
          </h3>

          {category && (
            <span className="whitespace-nowrap rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
              {category}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
      </div>

     

      <div className="pointer-events-none relative mt-auto pt-5 sm:pt-6">
        <div className="flex items-center whitespace-nowrap text-xs font-medium text-zinc-600 transition-colors group-hover:text-zinc-400">
          Open tool
          <ArrowUpRight
            size={13}
            className="ml-1 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </div>
  );
}
