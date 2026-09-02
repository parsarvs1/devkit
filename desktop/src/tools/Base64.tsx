import { useState } from "react";
import {
  Check,
  Copy,
  Eraser,
  FileCode2,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import {
  encodeBase64,
  decodeBase64,
  getBase64Example,
} from "../../../shared/base64";

type Mode = "encode" | "decode";

export default function Base64() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function handleConvert() {
    setError("");
    setOutput("");
    setCopied(false);

    if (!input.trim()) {
      setError("Please enter some text.");
      return;
    }

    try {
      const result =
        mode === "encode"
          ? encodeBase64(input)
          : decodeBase64(input);

      setOutput(result);
    } catch {
      setError(
        mode === "encode"
          ? "Could not encode the input."
          : "Invalid Base64 string."
      );
    }
  }

  function handleExample() {
    const example = getBase64Example();

    setInput(
      mode === "encode"
        ? example.encode
        : example.decode
    );

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
      setError("Could not copy the output.");
    }
  }

  return (
    <main className="tool-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <FileCode2 size={14} />
            DEVKIT TOOL
          </div>

          <h1>Base64 Encoder / Decoder</h1>

          <p>
            Encode text to Base64 or decode Base64 strings
            directly on your computer.
          </p>
        </div>
      </div>

      <section className="base64-panel">
        <div className="base64-mode-switch">
          <button
            className={
              mode === "encode"
                ? "base64-mode active"
                : "base64-mode"
            }
            onClick={() => handleModeChange("encode")}
          >
            <LockKeyhole size={15} />
            Encode
          </button>

          <button
            className={
              mode === "decode"
                ? "base64-mode active"
                : "base64-mode"
            }
            onClick={() => handleModeChange("decode")}
          >
            <FileCode2 size={15} />
            Decode
          </button>
        </div>

        <div className="base64-grid">
          <section className="base64-editor">
            <div className="panel-header">
              <h2>
                {mode === "encode"
                  ? "Text"
                  : "Base64"}
              </h2>

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

            <textarea
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 to decode..."
              }
              spellCheck={false}
            />
          </section>

          <section className="base64-editor">
            <div className="panel-header">
              <h2>
                {mode === "encode"
                  ? "Base64"
                  : "Decoded Text"}
              </h2>

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

            <textarea
              value={output}
              readOnly
              placeholder={
                mode === "encode"
                  ? "Encoded Base64 will appear here..."
                  : "Decoded text will appear here..."
              }
              spellCheck={false}
            />
          </section>
        </div>

        <div className="editor-buttons">
          <button
            className="primary-button"
            onClick={handleConvert}
          >
            <Sparkles size={16} />

            {mode === "encode"
              ? "Encode"
              : "Decode"}
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