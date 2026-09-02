import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Eraser,
  Pipette,
  Sparkles,
} from "lucide-react";

import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  rgbString,
  hslString,
  getColorExample,
} from "../../../shared/colorConverter";

export default function ColorConverter() {
  const [hex, setHex] = useState("#8B5CF6");

  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const color = useMemo(() => {
    try {
      const rgb = hexToRgb(hex);

      return {
        rgb,
        hsl: rgbToHsl(
          rgb.r,
          rgb.g,
          rgb.b
        ),
      };
    } catch {
      return null;
    }
  }, [hex]);

  function handleChange(value: string) {
    setHex(value);
    setError("");
    setCopied("");
  }

  function handleExample() {
    const example = getColorExample();

    setHex(example.hex);
    setError("");
    setCopied("");
  }

  function handleClear() {
    setHex("");
    setError("");
    setCopied("");
  }

  function handleConvert() {
    try {
      hexToRgb(hex);
      setError("");
    } catch {
      setError("Please enter a valid HEX color.");
    }
  }

  async function handleCopy(
    value: string,
    type: string
  ) {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      setError("Could not copy the value.");
    }
  }

  const rgbValue = color
    ? rgbString(color.rgb)
    : "—";

  const hslValue = color
    ? hslString(color.hsl)
    : "—";

  const hexValue =
    color && hex
      ? rgbToHex(
          color.rgb.r,
          color.rgb.g,
          color.rgb.b
        )
      : "—";

  return (
    <main className="tool-page color-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <Pipette size={14} />
            DEVKIT TOOL
          </div>

          <h1>Color Converter</h1>

          <p>
            Convert HEX colors to RGB and HSL instantly.
          </p>
        </div>
      </div>

      <section className="color-panel">
        {/* HEADER */}

        <div className="panel-header">
          <h2>COLOR INPUT</h2>

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

        {/* INPUT */}

        <div className="color-input-section">
          <div className="color-input-wrapper">
            <div
              className="color-preview"
              style={{
                backgroundColor:
                  color
                    ? hexValue
                    : "#18181b",
              }}
            />

            <input
              type="text"
              value={hex}
              onChange={(event) =>
                handleChange(
                  event.target.value
                )
              }
              placeholder="#8B5CF6"
              spellCheck={false}
              aria-label="HEX color"
            />
          </div>

          <button
            className="primary-button"
            onClick={handleConvert}
          >
            <Sparkles size={16} />
            Convert
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* RESULTS */}

        <div className="color-results">
          {/* HEX */}

          <div className="color-result-card">
            <div className="color-result-header">
              <span>HEX</span>

              {color && (
                <button
                  className="color-copy"
                  onClick={() =>
                    handleCopy(
                      hexValue,
                      "hex"
                    )
                  }
                >
                  {copied === "hex" ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <strong className="color-result-value">
              {hexValue}
            </strong>
          </div>

          {/* RGB */}

          <div className="color-result-card">
            <div className="color-result-header">
              <span>RGB</span>

              {color && (
                <button
                  className="color-copy"
                  onClick={() =>
                    handleCopy(
                      rgbValue,
                      "rgb"
                    )
                  }
                >
                  {copied === "rgb" ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <strong className="color-result-value">
              {rgbValue}
            </strong>
          </div>

          {/* HSL */}

          <div className="color-result-card">
            <div className="color-result-header">
              <span>HSL</span>

              {color && (
                <button
                  className="color-copy"
                  onClick={() =>
                    handleCopy(
                      hslValue,
                      "hsl"
                    )
                  }
                >
                  {copied === "hsl" ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <strong className="color-result-value">
              {hslValue}
            </strong>
          </div>
        </div>

        {/* COLOR PREVIEW */}

        <div className="color-large-preview">
          <div
            className="color-preview-box"
            style={{
              backgroundColor:
                color
                  ? hexValue
                  : "#18181b",
            }}
          />

          <div className="color-preview-info">
            <span>PREVIEW</span>

            <strong>
              {color
                ? hexValue
                : "Invalid color"}
            </strong>

            {color && (
              <p>
                {rgbValue} · {hslValue}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}