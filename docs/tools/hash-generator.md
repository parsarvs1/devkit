# Hash Generator

Generate SHA-1, SHA-256, SHA-384, or SHA-512 hashes from text, directly in your browser. [Open the tool](/tools/hash-generator) · [Examples](../examples/hash-generator.md)

## Purpose

Compute a cryptographic hash (digest) of any text you type. The same input always produces the same fixed-length hex string, and even a tiny change in the input produces a completely different hash. This is useful for checksums, verifying test fixtures, comparing expected digests, and learning how hash functions behave.

## When to use it

- You need the SHA-256 (or other SHA hash) of a string for a test fixture, a checksum, or documentation.
- You want to confirm that a hash you were given matches known input.
- You want to demonstrate the avalanche effect (how one changed character alters the digest).
- You are comparing digest lengths across SHA variants.

Do **not** use this tool to hash passwords for storage — see [Limitations](#limitations).

## How to use it

1. Type or paste text into the **Input** field.
2. Select an **algorithm**: SHA-1, SHA-256, SHA-384, or SHA-512.
3. Click **Generate Hash**.
4. The lowercase hex digest appears in the **Output** pane — click **Copy** to copy it.
5. **Clear** resets both fields.

## Inputs

| Input | Required | Description |
|---|---|---|
| Text | Yes | Any text, encoded as UTF-8 before hashing. |

## Options

| Option | Default | Description |
|---|---|---|
| Algorithm | `SHA-256` | `SHA-1`, `SHA-256`, `SHA-384`, or `SHA-512`. |

## Output

A lowercase hexadecimal string whose length depends on the algorithm:

| Algorithm | Digest length (hex chars) |
|---|---|
| SHA-1 | 40 |
| SHA-256 | 64 |
| SHA-384 | 96 |
| SHA-512 | 128 |

Hashing the text `hello`:

```
SHA-1:   aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
SHA-256: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
SHA-384: 59e1748777448c69de6b800d7a33bbfb9ff1b463e44354c3553bcdb9c666fa90125a3c79f90397bdf5f6a13de828684f
SHA-512: 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043
```

See [Examples](../examples/hash-generator.md) for more inputs, including the empty string.

## Edge cases

- **Empty input** — the Generate button is disabled and attempting to hash shows `Enter some text first.` (An empty string *is* hashable; the tool simply requires you to type something first.)
- **Very long input** — the textarea accepts arbitrarily long text; hashing is done in one call to `crypto.subtle.digest`, so extremely large inputs are limited only by browser memory.
- **Unicode** — input is UTF-8 encoded, so `héllo` and `hello` hash differently.
- **Hashing failure** (for example, no secure context) shows `Unable to generate hash.`

## Limitations

- **Text only.** There is no file-upload option; you cannot hash files with this tool.
- **No salt.** These are plain, unsalted digests. Do not use them to store or verify passwords — use a password hashing function (bcrypt, scrypt, Argon2) with per-password salts instead.
- **SHA-1 is cryptographically broken.** It is offered for compatibility with legacy checksums and systems; do not rely on it for collision resistance or security.
- **A hash proves nothing by itself.** Knowing that `X` hashes to `Y` does not tell you what `X` was, and anyone can recompute a hash — hashes provide no authentication unless combined with a secret (e.g. HMAC) or a signature.
- The Web Crypto API requires a **secure context** (HTTPS or localhost).

## Privacy and security

- Hashing is performed **locally** in your browser; your text is never sent to a server.
- Because common inputs are trivial to recompute, hashing sensitive text here reveals nothing to a third party — but also gains you nothing security-wise.

## Related tools

- [Hash Compare](/tools/hash-compare) — check whether two hash values are identical.
- [JWT Generator](/tools/jwt-generator) — uses HMAC-SHA-256/384/512 (keyed hashing) to sign tokens.
