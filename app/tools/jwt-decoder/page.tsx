import { Suspense } from "react";
import JwtDecoderClient from "./JwtDecoderClient";

export default function JwtDecoderPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-zinc-950 text-white">
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-zinc-500">
              Loading JWT Decoder...
            </p>
          </div>
        </main>
      }
    >
      <JwtDecoderClient />
    </Suspense>
  );
}