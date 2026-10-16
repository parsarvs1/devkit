"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Trash2, Check, Network } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

import RecentToolTracker from "@/components/RecentToolTracker";
import TrackToolUsage from "@/components/TrackToolUsage";

function ipToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const v = Number(p);
    if (v < 0 || v > 255) return null;
    n = (n << 8) + v;
  }
  // convert to unsigned
  return n >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

function calc(cidr: string) {
  const [ip, prefixStr] = cidr.trim().split("/");
  if (!ip || !prefixStr) return null;
  const ipNum = ipToInt(ip);
  const p = Number(prefixStr);
  if (ipNum === null || !Number.isInteger(p) || p < 0 || p > 32) return null;
  const mask = p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0;
  const network = (ipNum & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = Math.pow(2, 32 - p);
  let firstHost = network;
  let lastHost = broadcast;
  if (p <= 30) {
    firstHost = (network + 1) >>> 0;
    lastHost = (broadcast - 1) >>> 0;
  }
  const wildcard = (~mask) >>> 0;
  return { ip, p, mask: intToIp(mask), wildcard: intToIp(wildcard), network: intToIp(network), broadcast: intToIp(broadcast), firstHost: intToIp(firstHost), lastHost: intToIp(lastHost), total, usable: p <= 30 ? total - 2 : p === 31 ? 2 : 1 };
}

export default function CidrCalculatorPage() {
  const [input, setInput] = useState("192.168.1.0/24");
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");

  const r = calc(input);
  const valid = r !== null;

  async function copyValue(key: string, value: string) {
    const ok = await copyToClipboard(value, setError);
    if (ok) {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    }
  }

  function clearAll() {
    setInput("");
    setError("");
    setCopied(null);
  }

  const rows = r
    ? [
        ["CIDR", `${r.network}/${r.p}`],
        ["Network Address", r.network],
        ["Broadcast Address", r.broadcast],
        ["Subnet Mask", r.mask],
        ["Wildcard Mask", r.wildcard],
        ["First Usable Host", r.firstHost],
        ["Last Usable Host", r.lastHost],
        ["Total Addresses", r.total.toString()],
        ["Usable Hosts", r.usable.toString()],
      ]
    : [];

  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-white">
      <TrackToolUsage toolName="CIDR Calculator" toolHref="/tools/cidr-calculator" category="Networking" />
      <RecentToolTracker name="CIDR Calculator" href="/tools/cidr-calculator" />

      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link href="/tools" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-14">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <Network size={20} />
            </div>
            <p className="text-sm text-zinc-500">DevKit Tool</p>
          </div>
          <h1 className="text-4xl font-bold">CIDR Calculator</h1>
          <p className="mt-3 text-zinc-400">Calculate network details from a CIDR block.</p>
        </div>

        <div className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">CIDR (e.g. 192.168.1.0/24)</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="10.0.0.0/16"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-violet-600 focus:outline-none"
            />
          </div>

          {!valid && input.trim() && (
            <p className="text-sm text-red-400" role="alert">Invalid CIDR block.</p>
          )}

          {valid && (
            <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-950">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-zinc-400">{k}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-zinc-200">{v}</span>
                    <button
                      type="button"
                      onClick={() => copyValue(k, v)}
                      className="text-zinc-500 transition hover:text-white"
                      aria-label={`Copy ${k}`}
                    >
                      {copied === k ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={clearAll}
              className="rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-3 text-sm text-zinc-400 transition hover:text-white"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
        </div>
      </section>
    </main>
  );
}