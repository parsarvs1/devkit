"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  RefreshCw,
  LockKeyhole,
} from "lucide-react";

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generateSecurePassword(
  length: number,
  useUppercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
) {
  let characters = lowercase;

  if (useUppercase) {
    characters += uppercase;
  }

  if (useNumbers) {
    characters += numbers;
  }

  if (useSymbols) {
    characters += symbols;
  }

  const randomValues = new Uint32Array(length);

  crypto.getRandomValues(randomValues);

  return Array.from(
    randomValues,
    (value) => characters[value % characters.length]
  ).join("");
}

function getPasswordStrength(
  password: string
) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      label: "Weak",
      width: "20%",
    };
  }

  if (score === 3) {
    return {
      label: "Fair",
      width: "50%",
    };
  }

  if (score === 4) {
    return {
      label: "Strong",
      width: "75%",
    };
  }

  return {
    label: "Very Strong",
    width: "100%",
  };
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] =
    useState(true);
  const [useNumbers, setUseNumbers] =
    useState(true);
  const [useSymbols, setUseSymbols] =
    useState(true);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    const result = generateSecurePassword(
      length,
      useUppercase,
      useNumbers,
      useSymbols
    );

    setPassword(result);
    setCopied(false);
  }

  async function copyPassword() {
    if (!password) return;

    await navigator.clipboard.writeText(password);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  const strength = password
    ? getPasswordStrength(password)
    : null;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to tools
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <LockKeyhole size={20} />
            </div>

            <p className="text-sm text-zinc-500">
              DevKit Tool
            </p>
          </div>

          <h1 className="text-4xl font-bold">
            Password Generator
          </h1>

          <p className="mt-3 text-zinc-400">
            Generate strong random passwords securely in
            your browser.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          {/* Password */}

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Generated Password
              </h2>

              {password && (
                <button
                  onClick={copyPassword}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Copy size={15} />

                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>

            <div className="min-h-16 break-all rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm text-zinc-300">
              {password ||
                "Your generated password will appear here..."}
            </div>
          </div>

          {/* Length */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm text-zinc-400">
                Password Length
              </label>

              <span className="font-mono text-sm text-white">
                {length}
              </span>
            </div>

            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) =>
                setLength(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* Options */}

          <div className="mt-8 space-y-4">
            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-zinc-400">
                Uppercase letters
              </span>

              <input
                type="checkbox"
                checked={useUppercase}
                onChange={(e) =>
                  setUseUppercase(e.target.checked)
                }
                className="h-4 w-4"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-zinc-400">
                Numbers
              </span>

              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) =>
                  setUseNumbers(e.target.checked)
                }
                className="h-4 w-4"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-zinc-400">
                Symbols
              </span>

              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) =>
                  setUseSymbols(e.target.checked)
                }
                className="h-4 w-4"
              />
            </label>
          </div>

          {/* Generate */}

          <button
            onClick={generate}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <RefreshCw size={16} />
            Generate Password
          </button>
        </div>

        {/* Strength */}

        {password && strength && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium">
                Password Strength
              </h2>

              <span className="text-sm text-zinc-400">
                {strength.label}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-white transition-all"
                style={{
                  width: strength.width,
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <h2 className="text-sm font-medium">
            Privacy
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Passwords are generated locally in your browser
            using the Web Crypto API. Your generated password
            is not sent to a server.
          </p>
        </div>
      </section>
    </main>
  );
}