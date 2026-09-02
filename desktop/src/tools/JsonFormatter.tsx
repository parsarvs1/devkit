import { useState } from "react";
import {
  Braces,
  Check,
  Copy,
  Minimize2,
  Sparkles,
  Trash2,
} from "lucide-react";

import {
  formatJson,
  minifyJson,
  getJsonExample,
} from "../../../shared/jsonFormatter";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function handleFormat() {
    if (!input.trim()) {
      setError("Please enter some JSON.");
      setOutput("");
      return;
    }

    try {
      setOutput(formatJson(input));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid JSON. Please check your syntax.");
    }
  }

  function handleMinify() {
    if (!input.trim()) {
      setError("Please enter some JSON.");
      setOutput("");
      return;
    }

    try {
      setOutput(minifyJson(input));
      setError("");
    } catch {
      setOutput("");
      setError("Invalid JSON. Please check your syntax.");
    }
  }

  function handleExample() {
    setInput(getJsonExample());
    setOutput("");
    setError("");
    setCopied(false);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  async function handleCopy() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError("Could not copy the output.");
    }
  }

  return (
    <main className="json-page">
      <div className="page-header">
        <div>
          <div className="page-label">
            <Braces size={14} />
            DEVKIT TOOL
          </div>

          <h1>JSON Formatter</h1>

          <p>
            Format, minify and validate your JSON data.
          </p>
        </div>
      </div>

      <div className="json-grid">
        {/* INPUT */}

        <section className="editor-panel">
          <div className="panel-header">
            <div>
              <h2>Input</h2>
            </div>

            <div className="panel-actions">
              <button onClick={handleExample}>
                <Sparkles size={15} />
                Example
              </button>

              <button onClick={handleClear}>
                <Trash2 size={15} />
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError("");
            }}
            placeholder='{"name":"John","age":25}'
            spellCheck={false}
          />

          <div className="editor-buttons">
            <button
              className="primary-button"
              onClick={handleFormat}
            >
              <Sparkles size={16} />
              Format
            </button>

            <button
              className="secondary-button"
              onClick={handleMinify}
            >
              <Minimize2 size={16} />
              Minify
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </section>

        {/* OUTPUT */}

        <section className="editor-panel">
          <div className="panel-header">
            <div>
              <h2>Output</h2>
            </div>

            {output && (
              <button
                className="copy-button"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check size={15} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          <pre>
            {output || "Formatted JSON will appear here..."}
          </pre>
        </section>
      </div>
    </main>
  );
}