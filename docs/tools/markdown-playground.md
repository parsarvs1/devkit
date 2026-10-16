# Markdown Playground

## Purpose

The Markdown Playground is an advanced Markdown editor with a live preview pane, source code view, example content loader, and a built-in quick reference. It provides everything you need to write, test, and copy Markdown content.

[Tool Page](/tools/markdown-playground) · [Examples](../examples/markdown-playground.md)

## When to use it

- Write and preview Markdown with the ability to toggle between rendered output and raw source
- Learn Markdown syntax using the built-in quick reference
- Copy formatted Markdown for use in other applications
- Start from a template using the example content loader

## How to use it

1. Type or paste Markdown in the left editor pane.
2. Toggle between **Preview** (rendered HTML) and **Source** (raw Markdown) in the right pane.
3. Click **Example** to load sample Markdown content.
4. Click **Copy** to copy the raw Markdown source to your clipboard.
5. Click **Clear** to empty the editor.

## Inputs

| Input | Description |
|-------|-------------|
| Markdown source | Raw Markdown text entered in the left editor pane |

## Options

| Option | Description |
|--------|-------------|
| Preview / Source toggle | Switches the right pane between rendered HTML and raw Markdown display |
| Example button | Loads predefined sample Markdown into the editor |
| Copy button | Copies the raw Markdown source to the clipboard |

## Output

- **Preview pane**: Rendered HTML of your Markdown (headings, bold, italic, lists, links, code blocks, blockquotes, etc.).
- **Source pane**: The raw Markdown text as typed.
- **Quick reference**: A static reference section at the bottom showing basic Markdown syntax.
- **Copy confirmation**: The Copy button briefly shows "Copied!" when successful.

## Examples

See [Examples](../examples/markdown-playground.md) for practical Markdown snippets and their rendered output.

## Edge cases

- **Empty input**: Both Preview and Source panes show placeholder text when the editor is empty.
- **Copy with empty editor**: The Copy button is disabled when the editor is empty or contains only whitespace.
- **Large documents**: Very long documents may cause slight rendering lag, but there is no hard character limit.

## Limitations

- No export to HTML or file download.
- No toolbar for inserting Markdown syntax.
- The quick reference covers only basic syntax (headings, bold, italic, inline code).
- Rendering is handled by `react-markdown` with default styling; custom CSS is not supported.

## Privacy and security

All rendering runs locally in your browser. No Markdown content is transmitted to any server. Links in the preview open with `rel="noopener noreferrer"` to prevent reverse tabnapping.

## Related tools

- [Markdown Previewer](./markdown-preview.md) — simpler two-pane Markdown preview
- [Character Counter](./character-counter.md) — count characters, words, and more
- [Base64](./base64.md) — encode/decode Base64 strings
