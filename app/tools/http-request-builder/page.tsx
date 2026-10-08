"use client";

import { useState } from "react";
import Link from "next/link";
import {
ArrowLeft,
Send,
Trash2,
Plus,
Copy,
Check,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

type HeaderItem = {
key: string;
value: string;
};

export default function HttpRequestBuilderPage() {
const [method, setMethod] = useState("GET");
const [url, setUrl] = useState("");
const [headers, setHeaders] = useState<HeaderItem[]>([
{ key: "", value: "" },
]);
const [body, setBody] = useState("");
const [response, setResponse] = useState("");
const [status, setStatus] = useState("");
const [loading, setLoading] = useState(false);
const [copied, setCopied] = useState(false);
const [error, setError] = useState("");

function addHeader() {
setHeaders([...headers, { key: "", value: "" }]);
}

function updateHeader(
index: number,
field: "key" | "value",
value: string
) {
const updated = headers.map((header, i) =>
  i === index ? { ...header, [field]: value } : header
);
setHeaders(updated);
}

function removeHeader(index: number) {
setHeaders(headers.filter((_, i) => i !== index));
}

function clearAll() {
setMethod("GET");
setUrl("");
setHeaders([{ key: "", value: "" }]);
setBody("");
setResponse("");
setStatus("");
setError("");
}

async function sendRequest() {
if (!url.trim()) {
setError("Please enter a request URL.");
return;
}

setLoading(true);
setError("");
setResponse("");
setStatus("");

try {
  const requestHeaders: Record<string, string> = {};

  headers.forEach((header) => {
    if (header.key.trim()) {
      requestHeaders[header.key.trim()] = header.value;
    }
  });

  const options: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (method !== "GET" && method !== "HEAD" && body.trim()) {
    options.body = body;

    // Default to JSON so a JSON body isn't sent as text/plain.
    if (
      !Object.keys(requestHeaders).some(
        (key) => key.toLowerCase() === "content-type"
      )
    ) {
      requestHeaders["Content-Type"] = "application/json";
    }
  }

  // A bare host would otherwise fetch this site itself.
  const targetUrl = /^https?:\/\//i.test(url.trim())
    ? url.trim()
    : `https://${url.trim()}`;

  const res = await fetch(targetUrl, options);

  setStatus(`${res.status} ${res.statusText}`);

  const contentType = res.headers.get("content-type") || "";
  const data = await res.text();

  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(data);
      setResponse(JSON.stringify(parsed, null, 2));
    } catch {
      setResponse(data);
    }
  } else {
    setResponse(data);
  }
} catch (err) {
  const message =
    err instanceof Error
      ? err.message
      : "Request failed. Check the URL and try again.";

  // Surface the real cause: browsers block cross-origin reads and
  // https→http requests, both reported as a bare "Failed to fetch".
  if (/Failed to fetch/i.test(message)) {
    setError(
      "The request was blocked. Browsers block cross-origin responses (CORS) unless the API sends permissive headers, and block https→http requests as mixed content."
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

return (
<main className="min-h-screen bg-zinc-950 text-white">
<nav className="border-b border-zinc-800">
<div className="mx-auto flex h-16 max-w-6xl items-center px-6">
<Link href="/tools" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white" >
<ArrowLeft size={18} />
Back to tools
</Link>
</div>
</nav>

  <section className="mx-auto max-w-6xl px-6 py-14">
    <div className="mb-10">
      <p className="mb-2 text-sm text-zinc-500">
        DevKit Tool
      </p>

      <h1 className="text-4xl font-bold">
        HTTP Request Builder
      </h1>

      <p className="mt-3 text-zinc-400">
        Build and send HTTP requests directly from your browser.
      </p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Request */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium">
            Request
          </h2>

          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <Trash2 size={15} />
            Clear
          </button>
        </div>

        <div className="flex gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-medium outline-none focus:border-zinc-600"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
            <option>HEAD</option>
          </select>

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/data"
            spellCheck={false}
            className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
          />
        </div>

        {/* Headers */}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">
              Headers
            </h2>

            <button
              onClick={addHeader}
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              <Plus size={15} />
              Add Header
            </button>
          </div>

          <div className="space-y-2">
            {headers.map((header, index) => (
              <div
                key={index}
                className="flex gap-2"
              >
                <input
                  value={header.key}
                  onChange={(e) =>
                    updateHeader(
                      index,
                      "key",
                      e.target.value
                    )
                  }
                  placeholder="Content-Type"
                  className="min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 font-mono text-xs outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                />

                <input
                  value={header.value}
                  onChange={(e) =>
                    updateHeader(
                      index,
                      "value",
                      e.target.value
                    )
                  }
                  placeholder="application/json"
                  className="min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 font-mono text-xs outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                />

                <button
                  onClick={() => removeHeader(index)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-zinc-500 transition hover:border-red-900 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}

        {method !== "GET" && method !== "HEAD" && (
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-medium">
              Body
            </h2>

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"name":"Parsa","role":"developer"}'
              spellCheck={false}
              className="h-48 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-4 font-mono text-sm leading-6 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
            />
          </div>
        )}

        <button
          onClick={sendRequest}
          disabled={loading}
          className="mt-5 flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />

          {loading ? "Sending..." : "Send Request"}
        </button>

        {error && (
          <p className="mt-3 rounded-lg border border-red-900/50 bg-red-950/20 p-3 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>

      {/* Response */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium">
              Response
            </h2>

            {status && (
              <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 font-mono text-xs text-zinc-400">
                {status}
              </span>
            )}
          </div>

          {response && (
            <button
              onClick={copyResponse}
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              {copied ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}

              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>

        <pre className="min-h-[520px] max-h-[700px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-6 text-zinc-300">
          {response ||
            "Response will appear here..."}
        </pre>
      </div>
    </div>
  </section>
</main>

);
}