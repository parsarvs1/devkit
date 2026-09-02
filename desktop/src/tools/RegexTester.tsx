import { useState } from "react";
import {
  Check,
  Copy,
  Eraser,
  Play,
  Regex,
  Sparkles,
} from "lucide-react";

import {
  getRegexExample,
  testRegex,
  type RegexResult,
} from "../../../shared/regex";

interface RegexTesterProps {
  onBack: () => void;
}

export default function RegexTester({
  onBack,
}: RegexTesterProps) {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const [result, setResult] = useState<RegexResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function handleTest() {
    setError("");
    setResult(null);
    setCopied(false);

    try {
      const regexResult = testRegex(pattern, flags, text);
      setResult(regexResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to test the regular expression."
      );
    }
  }

  function handleExample() {
    const example = getRegexExample();

    setPattern(example.pattern);
    setFlags(example.flags);
    setText(example.text);

    setResult(null);
    setError("");
    setCopied(false);
  }

  function handleClear() {
    setPattern("");
    setFlags("g");
    setText("");
    setResult(null);
    setError("");
    setCopied(false);
  }

  async function handleCopyMatches() {
    if (!result || result.matches.length === 0) {
      return;
    }

    const value = result.matches
      .map((match) => match.match)
      .join("\n");

    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError("Could not copy the matches.");
    }
  }

  return (
    <main className="tool-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <Regex size={14} />
            DEVKIT TOOL
          </div>

          <h1>Regex Tester</h1>

          <p>
            Test regular expressions and inspect every match
            instantly.
          </p>
        </div>

        <button className="back-button" onClick={onBack}>
          Back
        </button>
      </div>

      <section className="regex-panel">
        <div className="panel-header">
          <div>
            <h2>Regular Expression</h2>
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

        <div className="regex-input-row">
          <div className="regex-pattern">
            <span>/</span>

            <input
              value={pattern}
              onChange={(event) => {
                setPattern(event.target.value);
                setError("");
              }}
              placeholder="Enter regex pattern..."
              spellCheck={false}
            />

            <span>/</span>
          </div>

          <input
            className="flags-input"
            value={flags}
            onChange={(event) => {
              setFlags(event.target.value);
              setError("");
            }}
            placeholder="flags"
            spellCheck={false}
          />
        </div>

        <div className="flags-hint">
          Common flags: <strong>g</strong> global ·{" "}
          <strong>i</strong> ignore case · <strong>m</strong>{" "}
          multiline · <strong>s</strong> dotAll
        </div>
      </section>

      <section className="regex-panel">
        <div className="panel-header">
          <div>
            <h2>Test String</h2>
          </div>
        </div>

        <textarea
          className="regex-textarea"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setError("");
          }}
          placeholder="Enter text to test..."
          spellCheck={false}
        />

        <div className="editor-buttons">
          <button
            className="primary-button"
            onClick={handleTest}
          >
            <Play size={16} />
            Test Regex
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </section>

      {result && (
        <section className="regex-panel">
          <div className="panel-header">
            <div>
              <h2>Matches</h2>

              <p className="result-count">
                {result.count}{" "}
                {result.count === 1 ? "match" : "matches"} found
              </p>
            </div>

            {result.matches.length > 0 && (
              <button
                className="copy-button"
                onClick={handleCopyMatches}
              >
                {copied ? (
                  <>
                    <Check size={15} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    Copy Matches
                  </>
                )}
              </button>
            )}
          </div>

          {result.matches.length === 0 ? (
            <div className="empty-result">
              No matches found.
            </div>
          ) : (
            <div className="regex-results">
              {result.matches.map((match, index) => (
                <div
                  className="regex-result-item"
                  key={`${match.index}-${index}`}
                >
                  <div className="match-number">
                    #{index + 1}
                  </div>

                  <div className="match-content">
                    <code>{match.match}</code>

                    <span>
                      Position: {match.index}
                    </span>
                  </div>

                  {match.groups.length > 0 && (
                    <div className="capture-groups">
                      <div className="capture-title">
                        Capture Groups
                      </div>

                      {match.groups.map((group, groupIndex) => (
                        <div
                          className="capture-group"
                          key={groupIndex}
                        >
                          <span>
                            ${groupIndex + 1}
                          </span>

                          <code>
                            {group ?? "undefined"}
                          </code>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}