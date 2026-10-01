"use client";

import { useState } from "react";

import { ChevronDown, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "Is DevKit free to use?",
    answer:
      "Yes. Every tool is completely free to use with no hidden costs, no paywalls and no usage limits.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. All tools work without signing up. Creating an account is optional and only unlocks extras like pinned tools, favorites and your recent activity.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Most tools run entirely in your browser, so your data never leaves your device. Nothing is uploaded to a server unless a tool clearly says otherwise.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes. DevKit is a Progressive Web App, so you can install it and keep using your favorite tools even without an internet connection.",
  },
  {
    question: "Is it open source?",
    answer:
      "Yes. The code is public on GitHub. You can explore it, report issues or contribute a new tool yourself.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
        <HelpCircle size={14} />
        FAQ
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Questions, answered.
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
        Everything you might want to know before getting started.
      </p>

      <div className="mt-10 space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className={`overflow-hidden rounded-2xl border transition ${
                isOpen
                  ? "border-zinc-700 bg-zinc-900/60"
                  : "border-zinc-800/80 bg-zinc-900/30"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              >
                <span className="text-sm font-medium text-white sm:text-base">
                  {item.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`shrink-0 text-zinc-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-zinc-300" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-6 text-zinc-500 sm:px-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
