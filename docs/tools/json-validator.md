# JSON Validator

## Purpose

The JSON Validator is a client-side tool that checks whether input is valid JSON and, if so, provides detailed statistics and warnings. It performs real-time validation on every keystroke and pinpoints syntax errors with exact line and column numbers, a code excerpt, and a caret indicator showing the error location.

## When to use it

- You need to verify that a JSON document parses correctly.
- You want to find exactly where a syntax error is (line and column).
- You want statistics about a JSON document: root type, size, key count, array item count, and maximum nesting depth.
- You want to detect duplicate keys or numbers that exceed JavaScript's safe integer range.
- You want a formatted (pretty-printed) version of your JSON after validating it.

## How to use it

1. Open the [JSON Validator tool page](/tools/json-validator).
2. Paste your JSON into the **Input** textarea. Validation runs automatically on every keystroke — there is no submit button.
3. The **Result** panel updates instantly:
   - **Valid JSON** shows a green confirmation, statistics cards, any warnings, and a formatted output.
   - **Invalid JSON** shows a red error banner with the error message, and for each issue: the line and column number, a code excerpt, and a caret (`^`) pointing to the error position.
4. Click **Example** to load a valid sample, or **Broken** to load a sample with a trailing comma.
5. Click **Copy formatted** to copy the pretty-printed JSON to your clipboard.
6. Click **Clear** to reset the input.

You can also load a shared state: if the URL contains a `?state=...` parameter, the input is hydrated from it automatically on page load.

## Options

| Option | Description |
|---|---|
| **Example** | Loads a pre-built valid JSON document into the input. |
| **Broken** | Loads a JSON document containing a trailing comma (invalid) to demonstrate error reporting. |
| **Clear** | Clears the input and result panels. |
| **Copy formatted** | Copies the formatted (2-space indented) JSON to the clipboard. Only visible when the input is valid. |

There are no configurable settings. Validation is always on and runs on every keystroke.

## Output

### Valid JSON

When the input parses successfully, the result panel shows:

- A green **"Valid JSON"** confirmation banner.
- **Statistics cards:**
  - **Root type** — `object`, `array`, `string`, `number`, `boolean`, or `null`.
  - **Size** — the byte size of the input string (formatted as B, KB, or MB).
  - **Keys** — total number of object keys across all nesting levels.
  - **Array items** — total number of array elements across all nesting levels.
  - **Max depth** — the deepest nesting level (root is depth 0).
  - **Warnings** — the number of warnings found.
- **Warnings** (if any): each warning includes a message and a JSON path.
- **Formatted output** — the pretty-printed JSON (2-space indent).

### Invalid JSON

When the input fails to parse, the result panel shows:

- A red **"Invalid JSON"** banner with a summary error message including line and column.
- For each detected issue:
  - **Line and column** numbers.
  - **Code excerpt** — the full line (or a cropped window for long lines) with a caret (`^`) pointing to the error column.

## Examples

### Valid JSON with statistics

**Input:**
```json
{
  "name": "Parsa",
  "role": "Developer",
  "active": true,
  "preferences": {
    "theme": "dark",
    "editor": {
      "fontFamily": "JetBrains Mono",
      "fontSize": 14
    }
  },
  "skills": ["Next.js", "React", "TypeScript"]
}
```

**Result:**
- Status: **Valid JSON**
- Root type: `object`
- Size: ~180 B
- Keys: 8
- Array items: 3
- Max depth: 3
- Warnings: 0

### Trailing comma error

**Input:**
```json
{
  "name": "Parsa",
  "age": 20,
  "skills": ["Next.js", "TypeScript",]
}
```

**Result:**
- Status: **Invalid JSON**
- Error: `Unexpected trailing comma at line 4, column 26.`
- Issue: Line 4, column 26
- Excerpt:
```
  "skills": ["Next.js", "TypeScript",]
                         ^
```

### Duplicate key warning

**Input:**
```json
{
  "name": "Alice",
  "name": "Bob"
}
```

**Result:**
- Status: **Valid JSON** (with 1 warning)
- Warning: `Key "name" appears 2 times. Duplicate keys keep only the last value.` at path `(document)`

### Unsafe integer warning

**Input:**
```json
{
  "id": 9007199254740993
}
```

**Result:**
- Status: **Valid JSON** (with 1 warning)
- Warning: `Number 9007199254740993 exceeds the safe integer range (±2^53 - 1) and loses precision when parsed.` at path `id`

See [Examples](../examples/json-validator.md) for more scenarios.

## Edge cases

- **Empty input:** Returns a result with `valid: false` and the message `"Empty input. Paste some JSON to validate."` — but the UI shows an empty state panel instead (the `result` is `null` when input is blank).
- **Whitespace-only input:** Treated as empty (the check is `!input.trim()`).
- **Multiple trailing commas:** All trailing commas are detected and reported as separate issues.
- **Long error lines:** If the line containing the error exceeds 72 characters, the excerpt is cropped to a 72-character window centered on the error column, and the caret position is adjusted accordingly.
- **Duplicate keys:** Detected by scanning all quoted strings followed by a colon. The warning count reflects total occurrences (e.g., a key appearing 3 times reports "appears 3 times").
- **Non-object root:** A JSON array or primitive at the root is valid and statistics are computed accordingly (e.g., root type `array`).

## Limitations

- No JSON5 support (comments, trailing commas, unquoted keys are all invalid).
- No schema validation — only syntax checking.
- The duplicate key detector is a heuristic: it scans for quoted strings followed by a colon, which may produce false positives in rare cases (e.g., a string value that looks like `"key":` inside a nested string).
- The unsafe integer check only flags numbers that are integers but exceed `Number.MAX_SAFE_INTEGER` (±2^53 - 1). Floating-point numbers that lose precision are not flagged.
- No file upload — input must be pasted or typed into the textarea.

## Privacy and security

All processing happens entirely in the browser. No JSON data is sent to any server. The Share button encodes the input into the URL using base64url encoding — anyone with the link can see the input, so avoid sharing sensitive data.

## Related tools

- [JSON Formatter](json-formatter.md) — format and minify JSON.
- [JSON to TypeScript](json-to-typescript.md) — convert JSON to TypeScript interfaces.
- [JSON to Zod](json-to-zod.md) — convert JSON to Zod validation schemas.
