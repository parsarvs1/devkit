# UUID Generator

## Purpose

Generates a random UUID (Universally Unique Identifier) using the browser's built-in `crypto.randomUUID()` method. The UUID follows the standard 8-4-4-4-12 hexadecimal format defined in RFC 4122.

## When to use it

- You need a unique identifier for a database record, session token, or resource ID.
- You want a quick, cryptographically secure UUID without installing a library.
- You need a UUID v4 (random) for testing or development purposes.

## How to use it

1. Navigate to the [UUID Generator tool page](/tools/uuid-generator).
2. Click the **Generate UUID** button.
3. A random UUID appears in the output area.
4. Click **Copy** to copy the UUID to your clipboard.
5. Click **Clear** to remove the current UUID and start fresh.

## Inputs

This tool has no input fields. UUID generation is entirely random and requires no user-provided data.

## Options

| Option | Description |
|--------|-------------|
| Generate UUID | Produces a new random UUID each time it is clicked |
| Copy | Copies the currently displayed UUID to the clipboard |
| Clear | Removes the displayed UUID and resets the tool |

## Output

A single UUID string in the standard format:

```
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```

Where `x` is a random hexadecimal digit and `y` is one of `8`, `9`, `a`, or `b` (indicating UUID version 4).

**Note:** The output is nondeterministic. Each click of **Generate UUID** produces a different value. The specific UUID you receive will vary every time.

## Examples

See [UUID Generator Examples](../examples/uuid-generator.md) for practical use cases.

## Edge cases

- **Non-secure context:** If the page is served over plain HTTP (not localhost), `crypto.randomUUID()` is unavailable. The tool displays an error message: "UUID generation is unavailable in this context (secure context required)."
- **Clipboard permission denied:** If the browser blocks clipboard access, the copy operation fails silently or shows an error.

## Limitations

- Only generates UUID version 4 (random). Other versions (time-based v1, name-based v3/v5) are not supported.
- No bulk generation — only one UUID per click.
- No option to specify a format (with or without hyphens).

## Privacy and security

- UUIDs are generated entirely in the browser using the Web Crypto API. No data is sent to any server.
- The randomness source is cryptographically secure (`crypto.randomUUID()`), making the output suitable for security-sensitive identifiers.
- Generated UUIDs are not stored or logged anywhere.

## Related tools

- [Timestamp Converter](timestamp.md) — for generating time-based unique values
- [Unix Timestamp Converter](unix-timestamp-converter.md) — for converting between timestamps and dates
