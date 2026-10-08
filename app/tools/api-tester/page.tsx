"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Copy,
  Trash2,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type KeyValue = {
  key: string;
  value: string;
};

export default function ApiTesterPage() {
  const [method, setMethod] = useState<Method>("GET");
  const [url, setUrl] = useState("");

  const [params, setParams] = useState<KeyValue[]>([
    { key: "", value: "" },
  ]);

  const [headers, setHeaders] = useState<KeyValue[]>([
    { key: "", value: "" },
  ]);

  const [body, setBody] = useState("");

  const [activeTab, setActiveTab] = useState<
    "params" | "headers" | "body"
  >("params");

  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function updateItem(
    type: "params" | "headers",
    index: number,
    field: "key" | "value",
    value: string
  ) {
    const setter =
      type === "params" ? setParams : setHeaders;

    setter((items) =>
      items.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      )
    );
  }

  function addItem(type: "params" | "headers") {
    const setter =
      type === "params" ? setParams : setHeaders;

    setter((items) => [
      ...items,
      { key: "", value: "" },
    ]);
  }

  function removeItem(
    type: "params" | "headers",
    index: number
  ) {
    const setter =
      type === "params" ? setParams : setHeaders;

    setter((items) =>
      items.filter((_, i) => i !== index)
    );
  }

  function buildUrl(): string {
    try {
      const parsedUrl = new URL(url);

      params.forEach(({ key, value }) => {
        if (key.trim()) {
          parsedUrl.searchParams.set(
            key.trim(),
            value
          );
        }
      });

      return parsedUrl.toString();
    } catch {
      // The URL is not absolute. Prepend https:// so a bare host like
      // "api.example.com" doesn't silently fetch this site itself.
      return `https://${url}`;
    }
  }

  async function sendRequest() {
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");
    setStatus(null);
    setResponseTime(null);

    const start = performance.now();

    try {
      const requestHeaders: Record<string, string> = {};

      headers.forEach(({ key, value }) => {
        if (key.trim()) {
          requestHeaders[key.trim()] = value;
        }
      });

      const options: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (
        ["POST", "PUT", "PATCH"].includes(method) &&
        body.trim()
      ) {
        options.body = body;

        if (
          !Object.keys(requestHeaders).some(
            (key) => key.toLowerCase() === "content-type"
          )
        ) {
          requestHeaders["Content-Type"] =
            "application/json";
        }
      }

      const result = await fetch(buildUrl(), options);

      const end = performance.now();

      setStatus(result.status);
      setResponseTime(Math.round(end - start));

      const text = await result.text();

      try {
        const json = JSON.parse(text);

        setResponse(JSON.stringify(json, null, 2));
      } catch {
        setResponse(text);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Request failed.";

      // Browsers block most cross-origin reads and all https→http
      // requests, and both surface as a bare "Failed to fetch".
      if (/Failed to fetch/i.test(message)) {
        setError(
          "The request was blocked. Browsers block cross-origin responses (CORS) unless the API sends permissive headers, and block https→http requests as mixed content. Requests run from your browser, not a server."
        );
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function copyResponse() {
    if (!response) return;

    const ok = await copyToClipboard(response, setError);
    if (!ok) return;

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function clearAll() {
    setUrl("");
    setBody("");
    setResponse("");
    setStatus(null);
    setResponseTime(null);
    setError("");

    setParams([{ key: "", value: "" }]);
    setHeaders([{ key: "", value: "" }]);
  }

  const statusClass =
    status && status >= 200 && status < 300
      ? "text-green-400"
      : status && status >= 400
        ? "text-red-400"
        : "text-zinc-400";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* Navigation */}

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

      {/* Content */}

      <section className="mx-auto max-w-6xl px-6 py-14">

        <div className="mb-10">

          <p className="mb-2 text-sm text-zinc-500">
            DevKit Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            API Tester
          </h1>

          <p className="mt-3 text-zinc-400">
            Send HTTP requests and inspect API responses.
          </p>

        </div>

        {/* Request */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40">

          <div className="flex flex-col gap-3 border-b border-zinc-800 p-4 sm:flex-row">

            <select
              value={method}
              onChange={(e) =>
                setMethod(
                  e.target.value as Method
                )
              }
              className="h-11 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm font-medium outline-none focus:border-zinc-600"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>

            <input
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendRequest();
                }
              }}
              placeholder="https://api.example.com/users"
              className="h-11 min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 font-mono text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
            />

            <button
              onClick={sendRequest}
              disabled={loading}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send
                </>
              )}
            </button>

          </div>

          {/* Tabs */}

          <div className="flex border-b border-zinc-800">

            {[
              ["params", "Params"],
              ["headers", "Headers"],
              ["body", "Body"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() =>
                  setActiveTab(
                    value as
                      | "params"
                      | "headers"
                      | "body"
                  )
                }
                className={`px-5 py-3 text-sm transition ${
                  activeTab === value
                    ? "border-b border-white text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}

          </div>

          {/* Params */}

          {activeTab === "params" && (
            <div className="p-5">

              <div className="mb-3 grid grid-cols-[1fr_1fr_auto] gap-3 text-xs text-zinc-600">
                <span>Key</span>
                <span>Value</span>
                <span />
              </div>

              {params.map((item, index) => (
                <div
                  key={index}
                  className="mb-3 grid grid-cols-[1fr_1fr_auto] gap-3"
                >
                  <input
                    value={item.key}
                    onChange={(e) =>
                      updateItem(
                        "params",
                        index,
                        "key",
                        e.target.value
                      )
                    }
                    placeholder="page"
                    className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 font-mono text-sm outline-none placeholder:text-zinc-700 focus:border-zinc-600"
                  />

                  <input
                    value={item.value}
                    onChange={(e) =>
                      updateItem(
                        "params",
                        index,
                        "value",
                        e.target.value
                      )
                    }
                    placeholder="1"
                    className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 font-mono text-sm outline-none placeholder:text-zinc-700 focus:border-zinc-600"
                  />

                  <button
                    aria-label={`Remove parameter ${index + 1}`}
                    onClick={() =>
                      removeItem(
                        "params",
                        index
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 transition hover:text-red-400"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}

              <button
                onClick={() =>
                  addItem("params")
                }
                className="mt-2 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Plus size={15} />
                Add parameter
              </button>

            </div>
          )}

          {/* Headers */}

          {activeTab === "headers" && (
            <div className="p-5">

              <div className="mb-3 grid grid-cols-[1fr_1fr_auto] gap-3 text-xs text-zinc-600">
                <span>Header</span>
                <span>Value</span>
                <span />
              </div>

              {headers.map((item, index) => (
                <div
                  key={index}
                  className="mb-3 grid grid-cols-[1fr_1fr_auto] gap-3"
                >
                  <input
                    value={item.key}
                    onChange={(e) =>
                      updateItem(
                        "headers",
                        index,
                        "key",
                        e.target.value
                      )
                    }
                    placeholder="Authorization"
                    className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 font-mono text-sm outline-none placeholder:text-zinc-700 focus:border-zinc-600"
                  />

                  <input
                    value={item.value}
                    onChange={(e) =>
                      updateItem(
                        "headers",
                        index,
                        "value",
                        e.target.value
                      )
                    }
                    placeholder="Bearer token"
                    className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 font-mono text-sm outline-none placeholder:text-zinc-700 focus:border-zinc-600"
                  />

                  <button
                    aria-label={`Remove header ${index + 1}`}
                    onClick={() =>
                      removeItem(
                        "headers",
                        index
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 transition hover:text-red-400"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}

              <button
                onClick={() =>
                  addItem("headers")
                }
                className="mt-2 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Plus size={15} />
                Add header
              </button>

            </div>
          )}

          {/* Body */}

          {activeTab === "body" && (
            <div className="p-5">

              <textarea
                value={body}
                onChange={(e) =>
                  setBody(e.target.value)
                }
                placeholder={`{
  "name": "Parsa",
  "role": "developer"
}`}
                spellCheck={false}
                className="h-56 w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm leading-6 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
              />

            </div>
          )}

        </div>

        {/* Response */}

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40">

          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">

            <div className="flex items-center gap-4">

              <h2 className="text-sm font-medium">
                Response
              </h2>

              {status !== null && (
                <span
                  className={`text-xs font-medium ${statusClass}`}
                >
                  {status}
                </span>
              )}

              {responseTime !== null && (
                <span className="text-xs text-zinc-600">
                  {responseTime} ms
                </span>
              )}

            </div>

            <div className="flex items-center gap-4">

              {response && (
                <button
                  onClick={copyResponse}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Copy size={15} />
                  {copied
                    ? "Copied!"
                    : "Copy"}
                </button>
              )}

              <button
                onClick={clearAll}
                className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
              >
                <Trash2 size={15} />
                Clear
              </button>

            </div>

          </div>

          {error ? (
            <div className="p-5 text-sm text-red-400">
              {error}
            </div>
          ) : (
            <pre className="min-h-72 overflow-auto p-5 font-mono text-sm leading-6 text-zinc-300">
              {response ||
                "API response will appear here..."}
            </pre>
          )}

        </div>

      </section>
    </main>
  );
}