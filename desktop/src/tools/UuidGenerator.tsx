import { useState } from "react";
import {
  Check,
  Copy,
  Dices,
  RefreshCw,
  Trash2,
} from "lucide-react";

import {
  generateUuid,
  generateUuids,
} from "../../../shared/uuid";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [multipleUuids, setMultipleUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState("");

  function handleGenerate() {
    setUuid(generateUuid());
    setMultipleUuids([]);
    setCopied("");
  }

  function handleGenerateMultiple() {
    const safeCount = Math.min(
      Math.max(count, 1),
      50
    );

    setMultipleUuids(generateUuids(safeCount));
    setUuid("");
    setCopied("");
  }

  async function handleCopy(
    value: string,
    id: string
  ) {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopied(id);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      setCopied("");
    }
  }

  async function handleCopyAll() {
    if (multipleUuids.length === 0) return;

    try {
      await navigator.clipboard.writeText(
        multipleUuids.join("\n")
      );

      setCopied("all");

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      setCopied("");
    }
  }

  function handleClear() {
    setUuid("");
    setMultipleUuids([]);
    setCopied("");
  }

  return (
    <main className="tool-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <Dices size={14} />
            DEVKIT TOOL
          </div>

          <h1>UUID Generator</h1>

          <p>
            Generate random UUID v4 identifiers instantly.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={handleClear}
        >
          <Trash2 size={15} />
          Clear
        </button>
      </div>

      <div className="uuid-layout">
        <section className="uuid-generator-panel">
          <div className="panel-header">
            <div>
              <h2>Generate UUID</h2>

              <p>
                Create a cryptographically random UUID v4.
              </p>
            </div>
          </div>

          <div className="uuid-single">
            <div className="uuid-value">
              {uuid || "Click generate to create a UUID"}
            </div>

            <div className="uuid-actions">
              <button
                className="primary-button"
                onClick={handleGenerate}
              >
                <RefreshCw size={16} />
                Generate
              </button>

              {uuid && (
                <button
                  className="secondary-button"
                  onClick={() =>
                    handleCopy(uuid, "single")
                  }
                >
                  {copied === "single" ? (
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
          </div>
        </section>

        <section className="uuid-generator-panel">
          <div className="panel-header">
            <div>
              <h2>Generate Multiple</h2>

              <p>
                Generate several UUIDs at once.
              </p>
            </div>
          </div>

          <div className="multiple-controls">
            <label htmlFor="uuid-count">
              Number of UUIDs
            </label>

            <input
              id="uuid-count"
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(event) => {
                const value = Number(
                  event.target.value
                );

                setCount(
                  Number.isNaN(value)
                    ? 1
                    : Math.min(
                        Math.max(value, 1),
                        50
                      )
                );
              }}
            />

            <button
              className="primary-button"
              onClick={handleGenerateMultiple}
            >
              <Dices size={16} />
              Generate {count}
            </button>
          </div>

          {multipleUuids.length > 0 && (
            <>
              <div className="uuid-list">
                {multipleUuids.map((item, index) => (
                  <div
                    className="uuid-list-item"
                    key={item}
                  >
                    <span className="uuid-index">
                      {index + 1}
                    </span>

                    <code>{item}</code>

                    <button
                      className="icon-button"
                      onClick={() =>
                        handleCopy(
                          item,
                          `uuid-${index}`
                        )
                      }
                      title="Copy UUID"
                    >
                      {copied === `uuid-${index}` ? (
                        <Check size={15} />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="secondary-button copy-all-button"
                onClick={handleCopyAll}
              >
                {copied === "all" ? (
                  <>
                    <Check size={15} />
                    Copied All!
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    Copy All
                  </>
                )}
              </button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}