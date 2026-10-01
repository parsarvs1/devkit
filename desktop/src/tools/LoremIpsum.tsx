import { useState } from "react";
import {
  Check,
  Copy,
  FileText,
  RefreshCw,
  Trash2,
} from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
  "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
  "incididunt", "ut", "labore", "et", "dolore", "magna",
  "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis",
  "nostrud", "exercitation", "ullamco", "laboris", "nisi",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis",
  "aute", "irure", "dolor", "in", "reprehenderit", "in",
  "voluptate", "velit", "esse", "cillum", "dolore", "eu",
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat",
  "cupidatat", "non", "proident", "sunt", "in", "culpa",
  "qui", "officia", "deserunt", "mollit", "anim", "id",
  "est", "laborum", "sed", "circul", "per", "in", "ceptos",
  "hac", "habitasse", "platea", "dictumst", "et", "ultrices",
  "posuere", "cubilia", "curae", "donec", "pharetra", "augue",
  "nec", "ultricies", "eu", "rhoncus", "nunc", "non",
  "viverra", "quis", "varius", "mauris", "vestibulum", "sac",
];

function generateLoremText(paragraphsCount: number, sentencesPerParagraph: number): string {
  const paraCount = Math.max(1, Math.min(paragraphsCount, 10));
  const sentCount = Math.max(1, Math.min(sentencesPerParagraph, 20));
  const result: string[] = [];

  for (let p = 0; p < paraCount; p++) {
    const sentences: string[] = [];
    for (let s = 0; s < sentCount; s++) {
      const wordCount = Math.floor(Math.random() * 8) + 6;
      const words: string[] = [];
      for (let w = 0; w < wordCount; w++) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      sentences.push(words.join(" ") + ".");
    }
    result.push(sentences.join(" "));
  }

  return result.join("\n\n");
}

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(2);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    const text = generateLoremText(paragraphs, sentences);
    setOutput(text);
    setCopied(false);
  }

  async function handleCopy() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function handleClear() {
    setOutput("");
    setCopied(false);
  }

  return (
    <main className="tool-page">
      <div className="tool-page-header">
        <div>
          <div className="page-label">
            <FileText size={14} />
            DEVKIT TOOL
          </div>
          <h1>Lorem Ipsum Generator</h1>
          <p>Generate placeholder text with custom paragraph and sentence counts.</p>
        </div>
      </div>

      <section className="lorem-panel">
        <div className="panel-header">
          <h2>Configuration</h2>
          <div className="panel-actions">
            <button onClick={handleClear}>
              <Trash2 size={15} />
              Clear
            </button>
          </div>
        </div>

        <div className="lorem-controls">
          <div className="control-group">
            <label htmlFor="lorem-paragraphs">Paragraphs</label>
            <input
              id="lorem-paragraphs"
              type="number"
              min="1"
              max="10"
              value={paragraphs}
              onChange={(event) => {
                const value = Number(event.target.value);
                setParagraphs(
                  Number.isNaN(value) ? 1 : Math.min(Math.max(value, 1), 10)
                );
              }}
            />
          </div>

          <div className="control-group">
            <label htmlFor="lorem-sentences">Sentences per paragraph</label>
            <input
              id="lorem-sentences"
              type="number"
              min="1"
              max="20"
              value={sentences}
              onChange={(event) => {
                const value = Number(event.target.value);
                setSentences(
                  Number.isNaN(value) ? 1 : Math.min(Math.max(value, 1), 20)
                );
              }}
            />
          </div>

          <button
            className="primary-button"
            onClick={handleGenerate}
          >
            <RefreshCw size={16} />
            Generate
          </button>
        </div>
      </section>

      {output && (
        <section className="lorem-output">
          <div className="panel-header">
            <h2>Generated Text</h2>
            <button
              className="secondary-button"
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
          <div className="lorem-text">
            {output}
          </div>
        </section>
      )}
    </main>
  );
}
