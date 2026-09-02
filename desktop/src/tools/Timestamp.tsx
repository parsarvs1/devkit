import { useState } from "react";
import {
  CalendarClock,
  Check,
  Copy,
  Eraser,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import {
  unixToDate,
  dateToUnix,
  unixToMilliseconds,  
  formatDate,
  getCurrentUnix,
  getCurrentMilliseconds,
  getTimestampExample,
} from "../../../shared/timestamp";

type Mode = "unix" | "date";

export default function Timestamp() {
  const [mode, setMode] = useState<Mode>("unix");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [currentUnix, setCurrentUnix] = useState(
    getCurrentUnix()
  );

  const [currentMilliseconds, setCurrentMilliseconds] =
    useState(getCurrentMilliseconds());

  function handleConvert() {
    setError("");
    setOutput("");
    setCopied(false);

    if (!input.trim()) {
      setError(
        mode === "unix"
          ? "Please enter a Unix timestamp."
          : "Please enter a date."
      );

      return;
    }

    try {
      if (mode === "unix") {
        const value = Number(input.trim());

        if (!Number.isFinite(value)) {
          throw new Error("Invalid timestamp.");
        }

        const date = unixToDate(value);

        if (Number.isNaN(date.getTime())) {
          throw new Error("Invalid timestamp.");
        }

        setOutput(
          [
            `ISO: ${formatDate(date)}`,
            `Local: ${date.toLocaleString()}`,
            `Unix seconds: ${Math.floor(value)}`,
            `Milliseconds: ${unixToMilliseconds(value)}`,
          ].join("\n")
        );
      } else {
        const date = new Date(input.trim());

        if (Number.isNaN(date.getTime())) {
          throw new Error("Invalid date.");
        }

        const unix = dateToUnix(date);
        const milliseconds = date.getTime();

        setOutput(
          [
            `ISO: ${formatDate(date)}`,
            `Unix seconds: ${unix}`,
            `Milliseconds: ${milliseconds}`,
          ].join("\n")
        );
      }
    } catch {
      setError(
        mode === "unix"
          ? "Invalid Unix timestamp."
          : "Invalid date format."
      );
    }
  }

  function handleExample() {
    const example = getTimestampExample();

    if (mode === "unix") {
      setInput(String(example.unix));
    } else {
      setInput(example.date);
    }

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

  function handleModeChange(nextMode: Mode) {
    setMode(nextMode);
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  function refreshCurrentTime() {
    setCurrentUnix(getCurrentUnix());
    setCurrentMilliseconds(getCurrentMilliseconds());
  }

  async function handleCopy() {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError("Could not copy the result.");
    }
  }

  return (
    <main className="tool-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <CalendarClock size={14} />
            DEVKIT TOOL
          </div>

          <h1>Timestamp</h1>

          <p>
            Convert Unix timestamps and dates instantly.
          </p>
        </div>
      </div>

      {/* CURRENT TIMESTAMP */}

      <section className="timestamp-current">
        <div className="timestamp-current-header">
          <div>
            <div className="timestamp-current-label">
              CURRENT TIMESTAMP
            </div>

            <div className="timestamp-current-title">
              Current Unix Time
            </div>
          </div>

          <button
            className="timestamp-refresh"
            onClick={refreshCurrentTime}
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        <div className="timestamp-current-values">
          <div className="timestamp-value-card">
            <span>Seconds</span>

            <strong>
              {currentUnix}
            </strong>
          </div>

          <div className="timestamp-value-card">
            <span>Milliseconds</span>

            <strong>
              {currentMilliseconds}
            </strong>
          </div>
        </div>
      </section>

      {/* CONVERTER */}

      <section className="timestamp-panel">
        <div className="timestamp-mode-switch">
          <button
            className={
              mode === "unix"
                ? "timestamp-mode active"
                : "timestamp-mode"
            }
            onClick={() =>
              handleModeChange("unix")
            }
          >
            Unix → Date
          </button>

          <button
            className={
              mode === "date"
                ? "timestamp-mode active"
                : "timestamp-mode"
            }
            onClick={() =>
              handleModeChange("date")
            }
          >
            Date → Unix
          </button>
        </div>

        <div className="timestamp-grid">
          {/* INPUT */}

          <section className="timestamp-editor">
            <div className="panel-header">
              <h2>
                {mode === "unix"
                  ? "Unix Timestamp"
                  : "Date"}
              </h2>

              <div className="panel-actions">
                <button
                  onClick={handleExample}
                >
                  <Sparkles size={15} />
                  Example
                </button>

                <button
                  onClick={handleClear}
                >
                  <Eraser size={15} />
                  Clear
                </button>
              </div>
            </div>

            <input
              className="timestamp-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              placeholder={
                mode === "unix"
                  ? "1704067200"
                  : "2024-01-01T00:00:00Z"
              }
              spellCheck={false}
            />
          </section>

          {/* OUTPUT */}

          <section className="timestamp-editor">
            <div className="panel-header">
              <h2>Result</h2>

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

            <pre className="timestamp-output">
              {output ||
                "Converted result will appear here..."}
            </pre>
          </section>
        </div>

        <div className="editor-buttons">
          <button
            className="primary-button"
            onClick={handleConvert}
          >
            <Sparkles size={16} />

            {mode === "unix"
              ? "Convert to Date"
              : "Convert to Unix"}
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </section>
    </main>
  );
}