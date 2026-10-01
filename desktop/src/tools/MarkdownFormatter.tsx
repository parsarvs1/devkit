import { useState } from "react";
import {
  Check,
  Copy,
  Eraser,
  Sparkles,
  Type,
} from "lucide-react";

import {
  formatMarkdown,
  getMarkdownExample,
  validateMarkdown,
} from "../../../shared/markdownFormatter";

export default function MarkdownFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function handleFormat() {
    if (!input.trim()) {
      setError("Please enter some Markdown text.");
      setOutput("");
      return;
    }

    try {
      const validation = validateMarkdown(input);
      if (!validation.isValid) {
        setError(validation.error || "Invalid Markdown format.");
        setOutput("");
        return;
      }

      const formatted = formatMarkdown(input);
      setOutput(formatted);
      setError("");
    } catch (err) {
      setOutput("");
      setError("Error formatting Markdown. Please check your syntax.");
    }
  }

  function handleExample() {
    const example = getMarkdownExample();
    setInput(example);
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
    <main className="tool-page markdown-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <Type size={14} />
            DEVKIT TOOL
          </div>

          <h1>Markdown Formatter</h1>

          <p>
            Format and validate Markdown text instantly.
          </p>
        </div>

      <section className="markdown-panel">
        <div className="panel-header">
          <div>
            <h2>Markdown Input</h2>
          </div>

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
          placeholder="# Your Markdown here...\n\nStart typing your Markdown and see it formatted live!\n\n**Features:**\n- Headers: # ## ###\n- **Bold** and *italic*\n- \`inline code\`\n- [Links](https://example.com)\n- Lists and tables\n- And more..."
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
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </section>

      {output && (
        <section className="markdown-panel">
          <div className="panel-header">
            <div>
              <h2>Formatted Output</h2>
            </div>

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
          </div>

          <div className="markdown-output">
            <pre>{output}</pre>
          </div>
        </section>
      )}
    </main>
  );