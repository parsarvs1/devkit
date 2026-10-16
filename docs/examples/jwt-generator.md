# JWT Generator — Examples

Practical examples for the [JWT Generator](/tools/jwt-generator). See the [full documentation](../tools/jwt-generator.md).

All tokens below were produced by the tool's exact algorithm (HMAC via Web Crypto) and verified against a reference implementation.

## Example 1: HS256 with the example payload (no expiration)

**Inputs:**

- Payload: `{"sub":"1234567890","name":"John Doe","role":"admin"}`
- Secret: `your-256-bit-secret`
- Algorithm: `HS256`
- Add `iat`/`exp`: off

**Output:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIn0.ZhmtWZOhodjm5knipDZ6Hfp5iZUzZXRrYaUofWWDk7w
```

## Example 2: HS256 with a 1-hour expiration (fixed time)

Same inputs as Example 1, with "Add `iat` and `exp` claims" enabled and "Expires in" set to 1 hour. At the fixed generation time `iat` = 1700000000 (2023-11-14T22:13:20Z):

**Output:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMDM2MDB9.62QFEudgd9PMKiLFOo_SWuO84LF4s0LVjUH9KKwKCXM
```

In the tool itself, `iat` is the current time, so your token's `iat`/`exp` will differ — only the structure is fixed.

## Example 3: Same payload and secret with HS384

**Inputs:** as Example 1, Algorithm `HS384`.

**Output:**

```
eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIn0.KTSBkVzbMSVNcfjEEuESKArzYRJk2WkZfPtkULD7MiZ8_uwEOPpGgN5-FLKYFvVs
```

Note the header now declares `"alg":"HS384"` and the signature is longer (48 bytes).

## Example 4: Same payload and secret with HS512

**Inputs:** as Example 1, Algorithm `HS512`.

**Output:**

```
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIn0.P_W6iWifc9NtZoJiR5WXk_dstDOS_26p18hsMCydmEBho8YMmAf-SfAv8F7bdSME8sPDveNIhc4PyNcDvLpxA
```

The signature is 64 bytes — the longest of the three.

## Example 5: Secret length warning

With Algorithm `HS512` and the 20-byte secret `your-256-bit-secret`, the tool still signs the token but shows:

> Secret is 20 bytes; HS512 expects at least 64 bytes for security.

The warning is informational — it never blocks signing.

## Example 6: Error cases

| Input | Result |
|---|---|
| Payload `not json` | `Payload is not valid JSON.` |
| Payload `[1,2,3]` | `Payload must be a JSON object.` |
| Payload `null` | `Payload must be a JSON object.` |
| Empty secret | `Enter a secret to sign the token.` |
| Tampered share link | `Invalid or corrupted share link.` |

## Example 7: Round-trip with the decoder

Paste the token from Example 1 into the [JWT Decoder](/tools/jwt-decoder). You get back the header `{"alg":"HS256","typ":"JWT"}` and the payload `{"sub":"1234567890","name":"John Doe","role":"admin"}` — confirming the generator produces standard, interoperable JWTs. (Decoding shows the contents; it still does not prove the signature is valid.)
