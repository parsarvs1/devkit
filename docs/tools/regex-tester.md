# Regex Tester

## Purpose

The Regex Tester lets you test a regular expression against a block of text and see all matches instantly in the browser. It runs the pattern in a Web Worker so catastrophic backtracking cannot freeze the tab, and falls back to main-thread execution in older browsers.

[Tool Page](/tools/regex-tester) · [Examples](../examples/regex-tester.md)

## When to use it

- Validate that a pattern matches the strings you expect
- Debug why a regex is not capturing the right values
- Check whether a pattern causes catastrophic backtracking
- Prototype expressions before embedding them in code

## How to use it

1. Enter a regular expression pattern (without the surrounding slashes) in the pattern field.
2. Optionally change the flags (default: `g`).
3. Paste or type the text to test in the text area.
4. Click **Test Regex**.
5. Matches appear as a numbered list on the right.

Click **Clear** to reset the pattern, flags, and text.

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| Pattern | The regular expression source, entered between visual `/` delimiters | *(empty)* |
| Flags | Standard JS flags such as `g`, `i`, `m`, `s`, `u` | `g` |
| Text | The string to test the pattern against | *(empty)* |

## Options

There are no separate option toggles. Behavior is controlled entirely by the pattern and flags fields.

## Output

- **Matches**: A numbered list of full match strings returned by `String.prototype.match`. With the `g` flag, every match is listed; without `g`, only the first match appears. Capture groups are not displayed individually — only the full matched substrings.
- **Errors**: Inline error messages for empty patterns, invalid regex syntax, oversized input, and timeouts.

## Examples

See [Examples](../examples/regex-tester.md) for practical use cases including email extraction, URL matching, and backtracking detection.

## Edge cases

- **Catastrophic backtracking**: Patterns such as `(a+)+$` will time out after 3 seconds and display a dedicated timeout message.
- **No matches**: The output area shows placeholder text when no matches are found.
- **Empty pattern**: Submitting with an empty pattern shows "Please enter a regular expression."
- **Oversized text**: Input exceeding 100,000 characters is rejected with an explanatory error.
- **Stale results**: If you run a second test before the first finishes, only the latest results are shown.

## Limitations

- Match results are full-match strings only; capture groups are not individually listed.
- Text input is capped at 100,000 characters.
- Regex execution times out after 3 seconds.
- Requires JavaScript. The tool is client-side only.

## Privacy and security

All matching runs locally in your browser. No pattern or text is transmitted to any server.

## Related tools

- [Base64](./base64.md) — encode/decode Base64 strings
- [URL Encoder](./url-encoder.md) — percent-encode URL components
- [Character Counter](./character-counter.md) — count characters, words, and more
