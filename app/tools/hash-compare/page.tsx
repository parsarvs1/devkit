"use client";

import { useState } from "react";
import Link from "next/link";
import {
ArrowLeft,
Check,
Copy,
Equal,
ShieldCheck,
Trash2,
X,
} from "lucide-react";

function detectHashType(hash: string): string {
const value = hash.trim();

if (!value) {
return "Unknown";
}

if (/^[a-fA-F0-9]{32}$/.test(value)) {
return "MD5";
}

if (/^[a-fA-F0-9]{40}$/.test(value)) {
return "SHA-1";
}

if (/^[a-fA-F0-9]{56}$/.test(value)) {
return "SHA-224";
}

if (/^[a-fA-F0-9]{64}$/.test(value)) {
return "SHA-256";
}

if (/^[a-fA-F0-9]{96}$/.test(value)) {
return "SHA-384";
}

if (/^[a-fA-F0-9]{128}$/.test(value)) {
return "SHA-512";
}

return "Unknown";
}

export default function HashComparePage() {
const [hashOne, setHashOne] = useState("");
const [hashTwo, setHashTwo] = useState("");
const [copied, setCopied] = useState("");

const normalizedOne = hashOne.trim().toLowerCase();
const normalizedTwo = hashTwo.trim().toLowerCase();

const hasBothHashes =
normalizedOne.length > 0 &&
normalizedTwo.length > 0;

const isMatch =
hasBothHashes &&
normalizedOne === normalizedTwo;

const typeOne = detectHashType(hashOne);
const typeTwo = detectHashType(hashTwo);

function clearAll() {
setHashOne("");
setHashTwo("");
setCopied("");
}

async function copyHash(
value: string,
type: string
) {
if (!value.trim()) return;

try {
  await navigator.clipboard.writeText(value.trim());

  setCopied(type);

  setTimeout(() => {
    setCopied("");
  }, 1500);
} catch {
  setCopied("");
}

}

return (
<main className="min-h-screen bg-zinc-950 text-white">
<nav className="border-b border-zinc-800">
<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
<Link href="/tools" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white" >
<ArrowLeft size={18} />
Back to tools
</Link>

      <button
        onClick={clearAll}
        className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
      >
        <Trash2 size={15} />
        Clear
      </button>
    </div>
  </nav>

  <section className="mx-auto max-w-6xl px-6 py-14">
    <div className="mb-10">
      <p className="mb-2 text-sm text-zinc-500">
        DevKit Tool
      </p>

      <h1 className="text-4xl font-bold">
        Hash Compare
      </h1>

      <p className="mt-3 max-w-2xl text-zinc-400">
        Compare two hash values and check whether they
        are identical.
      </p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Hash One */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium">
              Hash #1
            </h2>

            {hashOne && (
              <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 font-mono text-xs text-zinc-500">
                {typeOne}
              </span>
            )}
          </div>

          {hashOne && (
            <button
              onClick={() =>
                copyHash(hashOne, "hash-one")
              }
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              {copied === "hash-one" ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}

              {copied === "hash-one"
                ? "Copied!"
                : "Copy"}
            </button>
          )}
        </div>

        <textarea
          value={hashOne}
          onChange={(event) =>
            setHashOne(event.target.value)
          }
          placeholder="Enter first hash..."
          spellCheck={false}
          className="h-40 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
        />
      </div>

      {/* Hash Two */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium">
              Hash #2
            </h2>

            {hashTwo && (
              <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 font-mono text-xs text-zinc-500">
                {typeTwo}
              </span>
            )}
          </div>

          {hashTwo && (
            <button
              onClick={() =>
                copyHash(hashTwo, "hash-two")
              }
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              {copied === "hash-two" ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}

              {copied === "hash-two"
                ? "Copied!"
                : "Copy"}
            </button>
          )}
        </div>

        <textarea
          value={hashTwo}
          onChange={(event) =>
            setHashTwo(event.target.value)
          }
          placeholder="Enter second hash..."
          spellCheck={false}
          className="h-40 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
        />
      </div>
    </div>

    {/* Result */}

    <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col items-center justify-center py-8 text-center">
        {!hasBothHashes ? (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950">
              <Equal
                size={24}
                className="text-zinc-600"
              />
            </div>

            <h2 className="text-lg font-semibold">
              Waiting for hashes
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Enter both hash values to compare them.
            </p>
          </>
        ) : isMatch ? (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
              <Check size={26} />
            </div>

            <h2 className="text-lg font-semibold">
              Hashes Match
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Both hash values are identical.
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950">
              <X
                size={26}
                className="text-zinc-500"
              />
            </div>

            <h2 className="text-lg font-semibold">
              Hashes Do Not Match
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              The two hash values are different.
            </p>
          </>
        )}
      </div>
    </div>

    {/* Information */}

    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck size={17} />
          <h3 className="text-sm font-medium">
            Local Processing
          </h3>
        </div>

        <p className="text-xs leading-5 text-zinc-500">
          Hashes are compared directly in your browser.
          They are not uploaded to a server.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-2 text-sm font-medium">
          Hash #1
        </h3>

        <p className="font-mono text-xs text-zinc-500">
          {hashOne
            ? `${hashOne.trim().length} characters`
            : "No hash entered"}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-2 text-sm font-medium">
          Hash #2
        </h3>

        <p className="font-mono text-xs text-zinc-500">
          {hashTwo
            ? `${hashTwo.trim().length} characters`
            : "No hash entered"}
        </p>
      </div>
    </div>
  </section>
</main>

);
}