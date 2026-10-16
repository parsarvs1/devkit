# Hash Generator — Examples

Practical examples for the [Hash Generator](/tools/hash-generator). See the [full documentation](../tools/hash-generator.md).

All digests below were verified against a reference implementation (OpenSSL via Node.js `crypto`).

## Example 1: Hash "hello" with every algorithm

**Input:** `hello`

| Algorithm | Output |
|---|---|
| SHA-1 | `aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d` |
| SHA-256 | `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` |
| SHA-384 | `59e1748777448c69de6b800d7a33bbfb9ff1b463e44354c3553bcdb9c666fa90125a3c79f90397bdf5f6a13de828684f` |
| SHA-512 | `9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043` |

## Example 2: Hash "DevKit"

**Input:** `DevKit`

| Algorithm | Output |
|---|---|
| SHA-1 | `33d77a1ea4c9be4de94343ecaeb495815cc4338d` |
| SHA-256 | `cfa8d09c323fd520c97f9694260de869cb801d5a0dbe1978d4a7c9b909c371b9` |

## Example 3: The avalanche effect

Change a single character and the digest changes completely:

| Input | SHA-256 |
|---|---|
| `hello` | `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` |
| `hallo` (one letter changed) | `d3751d33f9cd5049c4af2b462735457e4d3baf130bcbb87f389e349fbaeb20b9` |
| `Hello` (capital H) | `753692ec36adb4c794c973945eb2a99c1649703ea6f76bf259abb4fb838e013e` |

The digests of `hello`, `hallo`, and `Hello` share no common prefix — a one-character change completely reshuffles the output.

## Example 4: Unicode input

Input is UTF-8 encoded before hashing, so accented characters change the digest:

**Input:** `héllo` → SHA-256 `3c48591d8d098a4538f5e013dfcf406e948eac4d3277b10bf614e295d6068179`

Compare with `hello` → `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`.

## Example 5: The empty string

The tool requires you to type something before the Generate button is enabled, but for reference the empty string hashes to:

| Algorithm | Output |
|---|---|
| SHA-1 | `da39a3ee5e6b4b0d3255bfef95601890afd80709` |
| SHA-256 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |

## Example 6: Verify a checksum

You downloaded a file whose documentation claims its SHA-256 is `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`. Type the file's *name* (`hello`) — no wait: to verify a file you would need to hash the file's bytes, which this text-only tool cannot do. Use it to verify digests of *text* values (passwords in tests, API keys in fixtures, configuration strings) instead.
