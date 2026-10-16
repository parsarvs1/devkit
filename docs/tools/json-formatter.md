# JSON Formatter

## Purpose

The JSON Formatter is a client-side tool that takes raw JSON input and either pretty-prints it with consistent 2-space indentation or minifies it into a single compact line. It provides immediate visual feedback when the input is not valid JSON.

## When to use it

- You have minified or poorly indented JSON and want it human-readable.
- You need to shrink JSON payloads to a single line for logging, URLs, or storage.
- You want a quick sanity check that your JSON parses correctly.
- You want to share a JSON snippet with someone via a URL (the Share button encodes the input into the link).

## How to use it

1. Open the [JSON Formatter tool page](/tools/json-formatter).
2. Paste your JSON into the **Input** textarea (or click **Example** to load a sample).
3. Click **Format** to pretty-print with 2-space indentation, or **Minify** to collapse it to a single line.
4. The result appears in the **Output** panel. Click **Copy** to copy it to your clipboard.
5. Click **Clear** to reset both panels.

You can also load a shared state: if the URL contains a `?state=...` parameter, the input is hydrated from it automatically on page load.

## Options

| Option | Description |
|---|---|
| **Format** | Pretty-prints the JSON using `JSON.stringify(parsed, null, 2)` — 2-space indentation. |
| **Minify** | Compacts the JSON using `JSON.stringify(parsed)` — no whitespace. |
| **Example** | Loads a pre-built sample JSON document into the input. |
| **Clear** | Clears both input and output. |
| **Copy** | Copies the current output to the clipboard. |
| **Share** | Generates a URL with the current input encoded in the `?state=` query parameter. |

There are no configurable settings such as indent size or key ordering — the tool always uses 2-space indentation and preserves the original key order.

## Output

- **Valid JSON:** The formatted or minified string appears in the output panel.
- **Invalid JSON:** The output panel is cleared and an error message is displayed: `"Invalid JSON. Please check your syntax."`

## Examples

### Format valid JSON

**Input:**
```json
{"name":"John","age":25,"skills":["JavaScript","TypeScript"]}
```

**Output (Format):**
```json
{
  "name": "John",
  "age": 25,
  "skills": [
    "JavaScript",
    "TypeScript"
  ]
}
```

### Minify valid JSON

**Input:**
```json
{
  "name": "John",
  "age": 25,
  "skills": [
    "JavaScript",
    "TypeScript"
  ]
}
```

**Output (Minify):**
```json
{"name":"John","age":25,"skills":["JavaScript","TypeScript"]}
```

### Invalid JSON

**Input:**
```json
{"name":"John","age":25,}
```

**Output:** Error message displayed — `"Invalid JSON. Please check your syntax."`

See [Examples](../examples/json-formatter.md) for more scenarios.

## Edge cases

- **Empty input:** Both Format and Minify buttons are disabled when the input is empty or whitespace-only.
- **Whitespace-only input:** Buttons are disabled (the check is `!input.trim()`).
- **Large documents:** The tool handles large JSON strings without debouncing; performance depends on the browser's `JSON.parse` and `JSON.stringify`.
- **Non-object root:** A JSON primitive (string, number, boolean, null) at the root is valid and will be formatted/minified like any other value.
- **Unicode:** Unicode characters are preserved as-is (not escaped) in the output.

## Limitations

- No configurable indent size — always 2 spaces.
- No key sorting — original key order is preserved.
- No JSON5 support (comments, trailing commas, unquoted keys are all invalid).
- No streaming or file upload — input must be pasted or typed into the textarea.
- The Share URL can become very long for large documents since the entire input is base64-encoded into the query string.

## Privacy and security

All processing happens entirely in the browser. No JSON data is sent to any server. The Share button encodes the input into the URL using base64url encoding — anyone with the link can see the input, so avoid sharing sensitive data.

## Related tools

- [JSON Validator](json-validator.md) — validate JSON and get detailed error locations.
- [JSON to TypeScript](json-to-typescript.md) — convert JSON to TypeScript interfaces.
- [JSON to Zod](json-to-zod.md) — convert JSON to Zod validation schemas.
