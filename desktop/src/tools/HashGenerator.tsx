import { useState } from "react";
import {
  Check,
  Clipboard,
  Eraser,
  Hash,
  Sparkles,
} from "lucide-react";

import {
  generateHash,
  getHashExample,
  type HashAlgorithm,
} from "../../../shared/hash";

const algorithms: HashAlgorithm[] = [
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
];

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] =
    useState<HashAlgorithm>("SHA-256");

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) {
      setError("Please enter some text to hash.");
      setResult("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const hash = await generateHash(input, algorithm);

      setResult(hash);
    } catch {
      setError("Could not generate the hash.");
      setResult("");
    } finally {
      setLoading(false);
    }
  }

  function handleExample() {
    const example = getHashExample();

    setInput(example.input);
    setAlgorithm(example.algorithm);
    setResult("");
    setError("");
    setCopied(false);
  }

  function handleClear() {
    setInput("");
    setResult("");
    setError("");
    setCopied(false);
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
      setError("Could not copy the hash.");
    }
  }

  return (
    <main className="tool-page hash-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <Hash size={14} />
            DEVKIT TOOL
          </div>

          <h1>Hash Generator</h1>

          <p>
            Generate secure hashes from text using popular SHA
            algorithms.
          </p>
        </div>
      </div>

      <section className="hash-panel">
        <div className="panel-header">
          <h2>HASH INPUT</h2>

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

        <div className="hash-controls">
          <div className="hash-algorithm">
            <label htmlFor="hash-algorithm">
              Algorithm
            </label>

            <select
              id="hash-algorithm"
              value={algorithm}
              onChange={(event) =>
                setAlgorithm(
                  event.target.value as HashAlgorithm
                )
              }
            >
              {algorithms.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hash-editor">
          <label htmlFor="hash-input">
            Input
          </label>

          <textarea
            id="hash-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError("");
            }}
            placeholder="Enter text to generate a hash..."
            spellCheck={false}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          className="primary-button hash-generate-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          <Sparkles size={16} />

          {loading
            ? "Generating..."
            : "Generate Hash"}
        </button>

        <div className="hash-result">
          <div className="hash-result-header">
            <div>
              <span>RESULT</span>

              <strong>
                {algorithm}
              </strong>
            </div>

            {result && (
              <button
                className="hash-copy"
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

          <div className="hash-result-value">
            {result || (
              <span>
                Your generated hash will appear here...
              </span>
            )}
          </div>
        </div>

        <div className="hash-info">
          <div>
            <span>ALGORITHM</span>
            <strong>{algorithm}</strong>
          </div>

          <div>
            <span>HASH LENGTH</span>
            <strong>
              {algorithm === "SHA-1"
                ? "160 bits"
                : algorithm === "SHA-256"
                  ? "256 bits"
                  : algorithm === "SHA-384"
                    ? "384 bits"
                    : "512 bits"}
            </strong>
          </div>

          <div>
            <span>OUTPUT</span>
            <strong>HEX</strong>
          </div>
        </div>
      </section>
    </main>
  );
}