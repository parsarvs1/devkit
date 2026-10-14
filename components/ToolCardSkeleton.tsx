
export default function ToolCardSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 sm:p-6 ${className}`}
    >
   

      <div className="flex items-start justify-between gap-4">
        <div className="h-11 w-11 rounded-xl border border-zinc-800 bg-zinc-800/60" />

        <div className="flex items-center gap-1">
          <div className="h-8 w-8 rounded-lg bg-zinc-800/60" />

          <div className="h-8 w-8 rounded-lg bg-zinc-800/60" />
        </div>
      </div>

    

      <div className="mt-5 space-y-2.5">
        <div className="h-4 w-2/5 rounded bg-zinc-800/60" />

        <div className="h-3 w-full rounded bg-zinc-800/40" />

        <div className="h-3 w-3/4 rounded bg-zinc-800/40" />
      </div>

    

      <div className="mt-5 h-3 w-1/4 rounded bg-zinc-800/40" />
    </div>
  );
}


export function ToolRowSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 ${className}`}
    >
      <div className="flex items-center gap-4">
 
        <div className="h-10 w-10 shrink-0 rounded-lg border border-zinc-800 bg-zinc-800/60" />

      

        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3.5 w-2/5 rounded bg-zinc-800/60" />

          <div className="h-2.5 w-1/4 rounded bg-zinc-800/40" />
        </div>

       

        <div className="flex shrink-0 items-center gap-1">
          <div className="h-8 w-8 rounded-lg bg-zinc-800/60" />

          <div className="h-8 w-8 rounded-lg bg-zinc-800/60" />
        </div>
      </div>
    </div>
  );
}
