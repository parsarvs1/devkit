"use client";

import { useState } from "react";
import Link from "next/link";
import {
ArrowLeft,
Check,
Copy,
Eye,
EyeOff,
ShieldCheck,
Trash2,
X,
} from "lucide-react";

type Strength = {
label: string;
score: number;
};

function analyzePassword(password: string): Strength {
if (!password) {
return {
label: "Empty",
score: 0,
};
}

let score = 0;

if (password.length >= 8) score++;
if (password.length >= 12) score++;
if (/[a-z]/.test(password)) score++;
if (/[A-Z]/.test(password)) score++;
if (/[0-9]/.test(password)) score++;
if (/[^A-Za-z0-9]/.test(password)) score++;

if (score <= 2) {
return {
label: "Weak",
score: 1,
};
}

if (score <= 4) {
return {
label: "Medium",
score: 2,
};
}

if (score === 5) {
return {
label: "Strong",
score: 3,
};
}

return {
label: "Very Strong",
score: 4,
};
}

export default function PasswordStrengthPage() {
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [copied, setCopied] = useState(false);

const strength = analyzePassword(password);

const checks = [
{
label: "At least 8 characters",
passed: password.length >= 8,
},
{
label: "At least 12 characters",
passed: password.length >= 12,
},
{
label: "Contains lowercase letters",
passed: /[a-z]/.test(password),
},
{
label: "Contains uppercase letters",
passed: /[A-Z]/.test(password),
},
{
label: "Contains numbers",
passed: /[0-9]/.test(password),
},
{
label: "Contains special characters",
passed: /[^A-Za-z0-9]/.test(password),
},
];

function clearAll() {
setPassword("");
setCopied(false);
}

async function copyPassword() {
if (!password) return;

try {
  await navigator.clipboard.writeText(password);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 1500);
} catch {
  setCopied(false);
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
        Password Strength Analyzer
      </h1>

      <p className="mt-3 max-w-2xl text-zinc-400">
        Analyze the strength of your password directly in
        your browser.
      </p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Password Input */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium">
            Password
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

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter a password..."
            spellCheck={false}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 pr-14 font-mono text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((current) => !current)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {/* Strength */}

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-zinc-400"
              />

              <span className="text-sm font-medium">
                Password Strength
              </span>
            </div>

            <span className="text-sm font-medium text-zinc-300">
              {strength.label}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-2 rounded-full ${
                  strength.score >= level
                    ? "bg-white"
                    : "bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Checks */}

      <div>
        <h2 className="mb-3 text-sm font-medium">
          Security Checks
        </h2>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="space-y-4">
            {checks.map((check) => (
              <div
                key={check.label}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-sm text-zinc-400">
                  {check.label}
                </span>

                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    check.passed
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-950 text-zinc-700"
                  }`}
                >
                  {check.passed ? (
                    <Check size={14} />
                  ) : (
                    <X size={14} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-3 text-sm font-medium">
            Recommendations
          </h2>

          <ul className="space-y-2 text-sm text-zinc-500">
            {password.length < 12 && (
              <li>
                • Use at least 12 characters.
              </li>
            )}

            {!/[A-Z]/.test(password) && (
              <li>
                • Add uppercase letters.
              </li>
            )}

            {!/[a-z]/.test(password) && (
              <li>
                • Add lowercase letters.
              </li>
            )}

            {!/[0-9]/.test(password) && (
              <li>
                • Add numbers.
              </li>
            )}

            {!/[^A-Za-z0-9]/.test(password) && (
              <li>
                • Add special characters.
              </li>
            )}

            {password.length >= 12 &&
              /[A-Z]/.test(password) &&
              /[a-z]/.test(password) &&
              /[0-9]/.test(password) &&
              /[^A-Za-z0-9]/.test(password) && (
                <li className="text-zinc-300">
                  • Great! Your password meets all
                  basic strength requirements.
                </li>
              )}
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <p className="text-xs leading-5 text-zinc-600">
        Your password is analyzed locally in your browser.
        It is not sent to a server by this tool.
      </p>
    </div>
  </section>
</main>

);
}