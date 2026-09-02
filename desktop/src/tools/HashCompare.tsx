import { useState } from "react";
import {
  Check,
  Clipboard,
  Eraser,
  GitCompare,
  Sparkles,
  X,
} from "lucide-react";

import {
  compareHashes,
  getHashCompareExample,
  hashText,
  type HashCompareAlgorithm,
} from "../../../shared/hashCompare";

const algorithms: HashCompareAlgorithm[] = [
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
];

type CompareMode = "hashes" | "text";

export default function HashCompare() {
  const [mode, setMode] =
    useState<CompareMode>("hashes");

  const [hashA, setHashA] = useState("");
  const [hashB, setHashB] = useState("");

  const [text, setText] = useState("");
  const [expectedHash, setExpectedHash] =
    useState("");

  const [algorithm, setAlgorithm] =
    useState<HashCompareAlgorithm>("SHA-256");

  const [result, setResult] = useState<
    boolean | null
  >(null);

  const [generatedHash, setGeneratedHash] =
    useState("");

  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  function clearResult() {
    setResult(null);
    setGeneratedHash("");
    setError("");
    setCopied(false);
  }

  function handleModeChange(
    nextMode: CompareMode
  ) {
    setMode(nextMode);
    clearResult();
  }

  function handleExample() {
    const example =
      getHashCompareExample();

    setMode("text");
    setText(example.text);
    setAlgorithm(example.algorithm);

    setExpectedHash(
      "a1f775d5f5f7b2c2f8a0a9f8d0b5e3d1"
    );

    setHashA("");
    setHashB("");

    clearResult();
  }

  function handleClear() {
    setHashA("");
    setHashB("");
    setText("");
    setExpectedHash("");

    clearResult();
  }

  function handleCompareHashes() {
    if (!hashA.trim() || !hashB.trim()) {
      setError(
        "Please enter both hashes to compare."
      );
      setResult(null);
      return;
    }

    setError("");

    const matches = compareHashes(
      hashA,
      hashB
    );

    setResult(matches);
  }

  async function handleCompareText() {
    if (!text.trim()) {
      setError(
        "Please enter text to hash."
      );
      setResult(null);
      return;
    }

    if (!expectedHash.trim()) {
      setError(
        "Please enter the expected hash."
      );
      setResult(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const generated =
        await hashText(
          text,
          algorithm
        );

      setGeneratedHash(generated);

      const matches = compareHashes(
        generated,
        expectedHash
      );

      setResult(matches);
    } catch {
      setError(
        "Could not generate or compare the hash."
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!generatedHash) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        generatedHash
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError(
        "Could not copy the generated hash."
      );
    }
  }

  return (
    <main className="tool-page hash-compare-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <GitCompare size={14} />
            DEVKIT TOOL
          </div>

          <h1>Hash Compare</h1>

          <p>
            Compare two hashes or verify a hash
            against generated text.
          </p>
        </div>
      </div>

      <section className="hash-compare-panel">
        <div className="panel-header">
          <h2>COMPARE HASHES</h2>

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

        <div className="hash-compare-mode">
          <button
            className={
              mode === "hashes"
                ? "active"
                : ""
            }
            onClick={() =>
              handleModeChange("hashes")
            }
          >
            Hash A vs Hash B
          </button>

          <button
            className={
              mode === "text"
                ? "active"
                : ""
            }
            onClick={() =>
              handleModeChange("text")
            }
          >
            Text vs Hash
          </button>
        </div>

        {mode === "hashes" && (
          <div className="hash-compare-grid">
            <div className="hash-compare-editor">
              <label htmlFor="hash-a">
                HASH A
              </label>

              <textarea
                id="hash-a"
                value={hashA}
                onChange={(event) => {
                  setHashA(
                    event.target.value
                  );
                  clearResult();
                }}
                placeholder="Paste first hash..."
                spellCheck={false}
              />
            </div>

            <div className="hash-compare-editor">
              <label htmlFor="hash-b">
                HASH B
              </label>

              <textarea
                id="hash-b"
                value={hashB}
                onChange={(event) => {
                  setHashB(
                    event.target.value
                  );
                  clearResult();
                }}
                placeholder="Paste second hash..."
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {mode === "text" && (
          <>
            <div className="hash-compare-algorithm">
              <label htmlFor="compare-algorithm">
                Algorithm
              </label>

              <select
                id="compare-algorithm"
                value={algorithm}
                onChange={(event) => {
                  setAlgorithm(
                    event.target
                      .value as HashCompareAlgorithm
                  );
                  clearResult();
                }}
              >
                {algorithms.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="hash-compare-editor">
              <label htmlFor="compare-text">
                TEXT
              </label>

              <textarea
                id="compare-text"
                value={text}
                onChange={(event) => {
                  setText(
                    event.target.value
                  );
                  clearResult();
                }}
                placeholder="Enter text to hash..."
                spellCheck={false}
              />
            </div>

            <div className="hash-compare-editor hash-compare-expected">
              <label htmlFor="expected-hash">
                EXPECTED HASH
              </label>

              <textarea
                id="expected-hash"
                value={expectedHash}
                onChange={(event) => {
                  setExpectedHash(
                    event.target.value
                  );
                  clearResult();
                }}
                placeholder="Paste the expected hash..."
                spellCheck={false}
              />
            </div>
          </>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          className="primary-button hash-compare-button"
          onClick={
            mode === "hashes"
              ? handleCompareHashes
              : handleCompareText
          }
          disabled={loading}
        >
          <GitCompare size={16} />

          {loading
            ? "Comparing..."
            : "Compare"}
        </button>

        {mode === "text" &&
          generatedHash && (
            <div className="hash-compare-generated">
              <div className="hash-compare-generated-header">
                <div>
                  <span>
                    GENERATED HASH
                  </span>

                  <strong>
                    {algorithm}
                  </strong>
                </div>

                <button
                  className="hash-compare-copy"
                  onClick={
                    handleCopy
                  }
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Clipboard
                        size={14}
                      />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="hash-compare-generated-value">
                {generatedHash}
              </div>
            </div>
          )}

        {result !== null && (
          <div
            className={`hash-compare-result ${
              result
                ? "hash-compare-match"
                : "hash-compare-mismatch"
            }`}
          >
            <div className="hash-compare-result-icon">
              {result ? (
                <Check size={22} />
              ) : (
                <X size={22} />
              )}
            </div>

            <div>
              <strong>
                {result
                  ? "Hashes Match"
                  : "Hashes Do Not Match"}
              </strong>

              <p>
                {result
                  ? "The provided values are identical."
                  : "The provided values are different."}
              </p>
            </div>
          </div>
        )}

        <div className="hash-compare-info">
          <div>
            <span>MODE</span>

            <strong>
              {mode === "hashes"
                ? "Hash vs Hash"
                : "Text vs Hash"}
            </strong>
          </div>

          <div>
            <span>COMPARISON</span>

            <strong>
              Case Insensitive
            </strong>
          </div>

          <div>
            <span>LOCAL</span>

            <strong>
              Browser Only
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}