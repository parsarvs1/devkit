import { useState } from "react";

import {
  Check,
  Clipboard,
  Code2,
  Eraser,
  Link,
  Sparkles,
} from "lucide-react";

import {
  decodeUrl,
  encodeUrl,
  getUrlExample,
} from "../../../shared/url";

type UrlMode = "encode" | "decode";

export default function UrlEncoder() {
  const [mode, setMode] =
    useState<UrlMode>("encode");

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function clearResult() {
    setResult("");
    setError("");
    setCopied(false);
  }

  function handleModeChange(nextMode: UrlMode) {
    setMode(nextMode);
    clearResult();
  }

  function handleExample() {
    const example = getUrlExample();

    setMode("encode");
    setInput(example.input);

    clearResult();
  }

  function handleClear() {
    setInput("");
    clearResult();
  }

  function handleConvert() {
    if (!input.trim()) {
      setError(
        mode === "encode"
          ? "Please enter a URL or text to encode."
          : "Please enter an encoded URL to decode."
      );

      setResult("");
      return;
    }

    try {
      setError("");

      const converted =
        mode === "encode"
          ? encodeUrl(input)
          : decodeUrl(input);

      setResult(converted);
    } catch {
      setResult("");

      setError(
        "Could not decode the value. Please check the input."
      );
    }
  }

  async function handleCopy() {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError("Could not copy the result.");
    }
  }

  return (
    <main className="tool-page url-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <Link size={14} />
            DEVKIT TOOL
          </div>

          <h1>URL Encoder / Decoder</h1>

          <p>
            Encode or decode URLs and query parameters
            safely.
          </p>
        </div>
      </div>

      <section className="url-panel">
        <div className="panel-header">
          <h2>URL CONVERTER</h2>

          <div className="panel-actions">
            <button onClick={handleExample}>
              <Sparkles size={15} />
              Example
            </button>

            <button onClick={handleClear}>
              <Eraser size={15} />
              Clear
            </button>
          </div>
        </div>

        <div className="url-mode-switch">
          <button
            className={
              mode === "encode"
                ? "active"
                : ""
            }
            onClick={() =>
              handleModeChange("encode")
            }
          >
            Encode
          </button>

          <button
            className={
              mode === "decode"
                ? "active"
                : ""
            }
            onClick={() =>
              handleModeChange("decode")
            }
          >
            Decode
          </button>
        </div>

        <div className="url-editor">
          <label htmlFor="url-input">
            {mode === "encode"
              ? "INPUT"
              : "ENCODED URL"}
          </label>

          <textarea
            id="url-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              clearResult();
            }}
            placeholder={
              mode === "encode"
                ? "Enter URL or text..."
                : "Paste encoded URL..."
            }
            spellCheck={false}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          className="primary-button url-convert-button"
          onClick={handleConvert}
        >
          <Code2 size={16} />

          {mode === "encode"
            ? "Encode URL"
            : "Decode URL"}
        </button>

        <div className="url-result">
          <div className="url-result-header">
            <div>
              <span>RESULT</span>

              <strong>
                {mode === "encode"
                  ? "ENCODED"
                  : "DECODED"}
              </strong>
            </div>

            {result && (
              <button
                className="url-copy"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard size={14} />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          <div className="url-result-value">
            {result || (
              <span>
                Your converted URL will appear here...
              </span>
            )}
          </div>
        </div>

        <div className="url-info">
          <div>
            <span>MODE</span>

            <strong>
              {mode === "encode"
                ? "Encode"
                : "Decode"}
            </strong>
          </div>

          <div>
            <span>METHOD</span>

            <strong>
              encodeURIComponent
            </strong>
          </div>

          <div>
            <span>PROCESSING</span>

            <strong>
              Browser Only
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}