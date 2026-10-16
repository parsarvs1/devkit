# Base64 Encoder / Decoder

## Purpose

The Base64 tool encodes plain text to Base64 and decodes Base64 strings back to readable text. It handles Unicode correctly by using UTF-8 encoding before Base64 conversion.

[Tool Page](/tools/base64) · [Examples](../examples/base64.md)

## When to use it

- Encode text for safe transmission in URLs, JSON, or email
- Decode Base64 data received from APIs or configuration files
- Verify that a Base64 string is valid
- Convert binary-safe representations of text

## How to use it

1. Enter or paste text in the **Input** field.
2. Click **Encode** to convert text to Base64, or **Decode** to convert Base64 back to text.
3. The result appears in the **Output** panel.
4. Click **Copy** to copy the output to your clipboard.
5. Click **Clear** to reset both fields.

## Inputs

| Input | Description |
|-------|-------------|
| Input text | Plain text to encode, or a Base64 string to decode |

## Options

There are no separate option toggles. The two action buttons (Encode / Decode) determine the operation.

## Output

- **Encoded output**: A Base64 string (ASCII characters only: `A–Z`, `a–z`, `0–9`, `+`, `/`, and `=` padding).
- **Decoded output**: The original UTF-8 text.
- **Error messages**: "Unable to encode the text." or "Invalid Base64 string."

## Examples

See [Examples](../examples/base64.md) for practical use cases including Unicode, JSON payloads, and data URIs.

## Edge cases

- **Unicode text**: Characters like emoji and CJK are encoded as UTF-8 bytes before Base64 conversion, so they round-trip correctly.
- **Empty input**: Both Encode and Decode buttons are disabled when the input is empty or whitespace-only.
- **Invalid Base64**: Decoding a string with invalid characters or incorrect padding shows "Invalid Base64 string."
- **Whitespace in Base64**: The decoder does not strip whitespace; any non-Base64 character will cause a decode error.

## Limitations

- Maximum input size is limited by browser memory; extremely large strings may cause performance issues.
- The tool does not handle binary data directly — only text.
- Base64 is encoding, not encryption. It provides no security.

## Privacy and security

All encoding and decoding runs locally in your browser. No data is transmitted to any server.

## Related tools

- [URL Encoder](./url-encoder.md) — percent-encode URL components
- [Regex Tester](./regex-tester.md) — test regular expressions
- [Character Counter](./character-counter.md) — count characters, words, and more
