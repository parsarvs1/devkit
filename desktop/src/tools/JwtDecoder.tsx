import { useState } from "react";
import {
  Copy,
  Check,
  Trash2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import {
  decodeJwt,
  formatJwtPart,
  getJwtExample,
} from "../../../shared/jwt";

interface JwtDecoderProps {
  onBack: () => void;
}

export default function JwtDecoder({ onBack }: JwtDecoderProps) {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  function handleDecode() {
    if (!token.trim()) {
      setError("Please enter a JWT token.");
      setHeader("");
      setPayload("");
      setSignature("");
      return;
    }

    try {
      const decoded = decodeJwt(token);

      setHeader(formatJwtPart(decoded.header));
      setPayload(formatJwtPart(decoded.payload));
      setSignature(decoded.signature);
      setError("");
    } catch (err) {
      setHeader("");
      setPayload("");
      setSignature("");

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JWT token.");
      }
    }
  }

  function handleExample() {
    setToken(getJwtExample());
    setHeader("");
    setPayload("");
    setSignature("");
    setError("");
    setCopied("");
  }

  function handleClear() {
    setToken("");
    setHeader("");
    setPayload("");
    setSignature("");
    setError("");
    setCopied("");
  }

  async function handleCopy(
    value: string,
    type: "header" | "payload" | "signature"
  ) {
    if (!value) return;

    await navigator.clipboard.writeText(value);

    setCopied(type);

    setTimeout(() => {
      setCopied("");
    }, 1500);
  }

  return (
    <main className="tool-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <ShieldCheck size={14} />
            DEVKIT TOOL
          </div>

          <h1>JWT Decoder</h1>

          <p>
            Decode JWT tokens and inspect their header, payload and signature.
          </p>
        </div>

        <button className="back-button" onClick={onBack}>
          Back
        </button>
      </div>

      <section className="jwt-input-panel">
        <div className="panel-header">
          <div>
            <h2>JWT Token</h2>
            <p>Paste your JWT token below.</p>
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
          value={token}
          onChange={(event) => {
            setToken(event.target.value);
            setError("");
          }}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          spellCheck={false}
        />

        <button className="primary-button decode-button" onClick={handleDecode}>
          <ShieldCheck size={16} />
          Decode JWT
        </button>

        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </section>

      {(header || payload || signature) && (
        <div className="jwt-results">
          <JwtResult
            title="Header"
            value={header}
            onCopy={() => handleCopy(header, "header")}
            copied={copied === "header"}
          />

          <JwtResult
            title="Payload"
            value={payload}
            onCopy={() => handleCopy(payload, "payload")}
            copied={copied === "payload"}
          />

          <JwtResult
            title="Signature"
            value={signature}
            onCopy={() => handleCopy(signature, "signature")}
            copied={copied === "signature"}
          />
        </div>
      )}
    </main>
  );
}

interface JwtResultProps {
  title: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}

function JwtResult({
  title,
  value,
  onCopy,
  copied,
}: JwtResultProps) {
  return (
    <section className="jwt-result-panel">
      <div className="panel-header">
        <div>
          <h2>{title}</h2>
        </div>

        <button className="copy-button" onClick={onCopy}>
          {copied ? (
            <>
              <Check size={15} />
              Copied
            </>
          ) : (
            <>
              <Copy size={15} />
              Copy
            </>
          )}
        </button>
      </div>

      <pre>{value}</pre>
    </section>
  );
}