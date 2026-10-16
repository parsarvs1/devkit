# URL Encoder / Decoder

## Purpose

The URL Encoder tool percent-encodes text for safe use in URL components and decodes percent-encoded strings back to readable text. It uses the standard `encodeURIComponent` / `decodeURIComponent` functions.

[Tool Page](/tools/url-encoder) · [Examples](../examples/url-encoder.md)

## When to use it

- Encode query parameter values for use in URLs
- Decode percent-encoded strings received from web APIs
- Verify that encoded URLs are correctly formatted
- Debug URL encoding issues in web applications

## How to use it

1. Enter or paste text in the **Input** field.
2. Click **Encode** to percent-encode the text, or **Decode** to decode it.
3. The result appears in the **Output** panel.
4. Click **Copy** to copy the output to your clipboard.
5. Click **Clear** to reset both fields.

## Inputs

| Input | Description |
|-------|-------------|
| Input text | Plain text to encode, or a percent-encoded string to decode |

## Options

There are no separate option toggles. The two action buttons (Encode / Decode) determine the operation.

## Output

- **Encoded output**: A percent-encoded string where unsafe characters are replaced with `%XX` hex sequences.
- **Decoded output**: The original text with percent-encoded sequences resolved.
- **Error messages**: "Enter some text first.", "Unable to encode the input.", "Enter some encoded text first.", or "Invalid encoded URL."

## Examples

See [Examples](../examples/url-encoder.md) for practical use cases including query parameters, special characters, and Unicode.

## Edge cases

- **Unicode text**: Characters like emoji and CJK are encoded as UTF-8 byte sequences in percent-encoding.
- **Empty input**: Both Encode and Decode buttons are disabled when the input is empty or whitespace-only.
- **Invalid percent-encoding**: Decoding a string with malformed `%` sequences shows "Invalid encoded URL."
- **Already-encoded input**: Encoding an already-encoded string will double-encode the `%` characters (e.g., `%20` becomes `%2520`).

## Limitations

- Uses `encodeURIComponent`, which encodes all characters except `A–Z a–z 0–9 - _ . ! ~ * ' ( )`. If you need `encodeURI` behavior (which preserves URL structural characters), this tool is not suitable.
- The tool does not handle full URLs — only URL components.
- Maximum input size is limited by browser memory.

## Privacy and security

All encoding and decoding runs locally in your browser. No data is transmitted to any server.

## Related tools

- [Base64](./base64.md) — encode/decode Base64 strings
- [Regex Tester](./regex-tester.md) — test regular expressions
- [Character Counter](./character-counter.md) — count characters, words, and more
