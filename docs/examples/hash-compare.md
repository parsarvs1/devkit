# Hash Compare — Examples

Practical examples for the [Hash Compare](/tools/hash-compare). See the [full documentation](../tools/hash-compare.md).

## Example 1: Identical SHA-256 values match

**Hash #1:** `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`
**Hash #2:** `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`

**Result:** **Hashes Match** — both fields are detected as `SHA-256` (64 hex characters).

## Example 2: Comparison is case-insensitive

**Hash #1:** `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`
**Hash #2:** `2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824`

**Result:** **Hashes Match** — values are lowercased before comparing.

## Example 3: Different inputs produce different hashes

**Hash #1:** `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` *(SHA-256 of `hello`)*
**Hash #2:** `cfa8d09c323fd520c97f9694260de869cb801d5a0dbe1978d4a7c9b909c371b9` *(SHA-256 of `DevKit`)*

**Result:** **Hashes Do Not Match** — both detected as `SHA-256`, but the values differ.

## Example 4: MD5 values

**Hash #1:** `5d41402abc4b2a76b9719d911017c592`
**Hash #2:** `5d41402abc4b2a76b9719d911017c592`

**Result:** **Hashes Match** — both detected as `MD5` (32 hex characters).

## Example 5: Whitespace is ignored

**Hash #1:** `  2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824  `
**Hash #2:** `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`

**Result:** **Hashes Match** — leading/trailing whitespace is trimmed before comparing.

## Example 6: Identical non-hash strings also "match"

**Hash #1:** `hello`
**Hash #2:** `hello`

**Result:** **Hashes Match** — but both fields are detected as `Unknown` (5 characters is not a known digest length). The tool compares strings; it does not check that they are valid hashes.

## Example 7: One field empty

**Hash #1:** `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`
**Hash #2:** *(empty)*

**Result:** **Waiting for hashes** — no verdict until both fields are filled.

## Example 8: Different lengths never match

**Hash #1:** `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` *(64 chars, SHA-256)*
**Hash #2:** `aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d` *(40 chars, SHA-1)*

**Result:** **Hashes Do Not Match** — the values differ in both length and content.
