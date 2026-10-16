# Hash Compare

Compare two hash values and check whether they are identical. [Open the tool](/tools/hash-compare) · [Examples](../examples/hash-compare.md)

## Purpose

Quickly check whether two hash strings are equal. The tool compares the values character-by-character (case-insensitively), shows the detected hash type of each value, and reports match / no-match. Handy for verifying checksums from different sources and spotting transcription errors.

## When to use it

- You have two digests from different tools or sources and want to confirm they are the same value.
- You are verifying a checksum printed in documentation against one produced by your own pipeline.
- You want to confirm two values differ before debugging further upstream.

## How to use it

1. Paste the first hash into **Hash #1**.
2. Paste the second hash into **Hash #2**.
3. The result pane updates immediately:
   - **Waiting for hashes** — one or both fields are empty.
   - **Hashes Match** — the normalized values are identical.
   - **Hashes Do Not Match** — they differ.
4. Each field shows a badge with the detected hash type and its character count; **Copy** copies either value, and **Clear** resets the page.

## Inputs

| Input | Required | Description |
|---|---|---|
| Hash #1 | Yes (for a verdict) | Any string, expected to be a hex digest. |
| Hash #2 | Yes (for a verdict) | Any string, expected to be a hex digest. |

## Options

This tool has no configurable options. Both fields accept free text.

## Output

- A verdict: **Hashes Match** or **Hashes Do Not Match** (or **Waiting for hashes** until both fields are filled).
- A detected type badge next to each field (see below).
- A character count for each filled field.

### Hash type detection

The type badge is inferred **purely from the length of the trimmed value**:

| Length (hex chars) | Detected type |
|---|---|
| 32 | MD5 |
| 40 | SHA-1 |
| 56 | SHA-224 |
| 64 | SHA-256 |
| 96 | SHA-384 |
| 128 | SHA-512 |
| anything else | Unknown |

## Examples

```
Hash #1: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
Hash #2: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
Result:  Hashes Match (both detected as SHA-256)
```

```
Hash #1: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
Hash #2: 2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824
Result:  Hashes Match (comparison is case-insensitive)
```

See [Examples](../examples/hash-compare.md) for mismatches, odd-length values, and non-hash inputs.

## Edge cases

- **Comparison is case-insensitive** — values are trimmed and lowercased before comparing, so `ABC…` and `abc…` match.
- **Whitespace is ignored** — leading/trailing spaces are trimmed before comparing.
- **Any two identical strings "match"** — the tool does not check that the values are valid hex or genuine hashes. Two copies of `hello` report **Hashes Match** with type **Unknown**.
- **Different lengths can never match** — the verdict is strict string equality of the normalized values.
- **Empty fields** — if either field is empty, the tool shows **Waiting for hashes** rather than a verdict.
- **Type detection is by length only** — a 32-character hex string is labeled `MD5` even if it was never produced by MD5; a 33-character value is `Unknown` even if it looks like a hash.

## Limitations

- This is a **lexical comparison only**. The tool never recomputes a hash from source data, so it cannot tell you *what* was hashed — only whether two strings are equal.
- It cannot detect whether two digests were produced by the same algorithm from different inputs (that is exactly what a mismatch means, but diagnosing why requires the source data).
- Hash type detection is a length-based hint, not an identification.

## Privacy and security

- Values are compared **locally** in your browser; they are never uploaded.
- A matching pair of hashes proves only that two strings are equal — not that either is authentic, untampered, or safe to use.

## Related tools

- [Hash Generator](/tools/hash-generator) — produce a SHA hash from text to compare against an expected value.
