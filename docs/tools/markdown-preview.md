# Markdown Previewer

## Purpose

The Markdown Previewer provides a side-by-side editor and live preview for Markdown. As you type Markdown source on the left, the rendered HTML appears on the right in real time.

[Tool Page](/tools/markdown-preview) · [Examples](../examples/markdown-preview.md)

## When to use it

- Preview Markdown before publishing to blogs, documentation, or README files
- Learn Markdown syntax by seeing live rendered output
- Draft and iterate on formatted text quickly

## How to use it

1. The editor loads with sample Markdown content to demonstrate features.
2. Edit or replace the text in the left pane.
3. The right pane renders the Markdown as formatted HTML automatically.
4. Click **Clear** to empty the editor and start fresh.

## Inputs

| Input | Description |
|-------|-------------|
| Markdown source | Raw Markdown text entered in the left editor pane |

## Options

There are no separate option toggles. The preview updates automatically on every keystroke.

## Output

The right pane displays the rendered HTML output of your Markdown, including:

- Headings (`h1`–`h6`)
- Bold and italic text
- Ordered and unordered lists
- Links (open in a new tab with `rel="noopener noreferrer"`)
- Inline code and code blocks
- Blockquotes
- Horizontal rules
- Tables (GFM)

## Examples

See [Examples](../examples/markdown-preview.md) for practical Markdown snippets and their rendered output.

## Edge cases

- **Empty input**: The preview pane shows placeholder text when the editor is empty or contains only whitespace.
- **Invalid Markdown**: The renderer is lenient; malformed syntax renders as plain text rather than throwing errors.
- **Large documents**: Very long documents may cause slight rendering lag, but there is no hard character limit.

## Limitations

- No copy button — you must select and copy text manually.
- No export to HTML or file download.
- No toolbar for inserting Markdown syntax.
- Rendering is handled by `react-markdown` with default styling; custom CSS is not supported.

## Privacy and security

All rendering runs locally in your browser. No Markdown content is transmitted to any server. Links in the preview open with `rel="noopener noreferrer"` to prevent reverse tabnapping.

## Related tools

- [Markdown Playground](./markdown-playground.md) — advanced Markdown editor with source view and examples
- [Character Counter](./character-counter.md) — count characters, words, and more
- [Regex Tester](./regex-tester.md) — test regular expressions
