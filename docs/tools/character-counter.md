# Character Counter

## Purpose

The Character Counter provides real-time statistics about your text, including character count, word count, sentence count, line count, paragraph count, and estimated reading time.

[Tool Page](/tools/character-counter) · [Examples](../examples/character-counter.md)

## When to use it

- Check text length for character-limited fields (tweets, SMS, form inputs)
- Estimate reading time for articles and blog posts
- Analyze text structure (sentences, paragraphs, lines)
- Track writing progress toward word count goals

## How to use it

1. Type or paste text into the text area.
2. Statistics update automatically in real time as you type.
3. Click **Clear** to empty the text area and reset all counts.

## Inputs

| Input | Description |
|-------|-------------|
| Text | Any text content typed or pasted into the editor |

## Options

There are no separate option toggles. All statistics are calculated automatically and displayed simultaneously.

## Output

The following statistics are displayed in a sidebar panel:

| Statistic | Description |
|-----------|-------------|
| Characters | Total number of characters including spaces |
| Characters (no spaces) | Character count excluding all whitespace |
| Words | Number of whitespace-separated word tokens |
| Sentences | Number of sentence-ending punctuation marks (`.`, `!`, `?`) |
| Lines | Number of lines (split by newline characters) |
| Paragraphs | Number of paragraph blocks (separated by blank lines) |
| Reading time (min) | Estimated reading time at 200 words per minute (rounded up) |

## Examples

See [Examples](../examples/character-counter.md) for practical use cases including essays, tweets, and code comments.

## Edge cases

- **Empty input**: All counts show `0` when the text area is empty.
- **Whitespace-only input**: Characters shows the whitespace count, but words, sentences, paragraphs, and reading time all show `0`.
- **Multiple spaces**: Consecutive whitespace characters are treated as a single word separator.
- **Sentence counting**: Counts occurrences of `.`, `!`, and `?` — not actual sentence boundaries. Abbreviations like "Dr." or "e.g." will inflate the count.
- **Paragraph counting**: Paragraphs are separated by one or more blank lines (whitespace-only lines between content).
- **Reading time**: Calculated as `Math.ceil(words / 200)`. A single word shows `1` minute.

## Limitations

- Sentence counting is based on punctuation marks, not linguistic analysis.
- Reading time uses a fixed 200 WPM rate; actual reading speed varies by content complexity.
- No copy or export functionality.
- No character limit — input size is bounded only by browser memory.

## Privacy and security

All counting runs locally in your browser. No text is transmitted to any server.

## Related tools

- [Markdown Previewer](./markdown-preview.md) — preview rendered Markdown
- [Markdown Playground](./markdown-playground.md) — advanced Markdown editor
- [Regex Tester](./regex-tester.md) — test regular expressions
