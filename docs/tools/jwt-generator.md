# JWT Generator

Sign JSON Web Tokens with an HMAC secret, entirely in your browser. [Open the tool](/tools/jwt-generator) · [Examples](../examples/jwt-generator.md)

## Purpose

Create signed JWTs from a JSON payload using the HMAC algorithms HS256, HS384, or HS512. The token is signed with your secret via the Web Crypto API and is regenerated live as you edit the payload, secret, algorithm, or expiration. Useful for testing authentication flows, mocking API tokens, and learning how signed tokens are constructed.

## When to use it

- You need a realistic, correctly signed JWT to test an API or authentication middleware in development.
- You want to see how `iat`/`exp` claims change a token's payload.
- You want to compare how HS256, HS384, and HS512 affect token length and header.
- You are debugging why a token was rejected (wrong algorithm, missing claims, expired `exp`).

## How to use it

1. Enter a JSON **payload** — it must be a JSON object (click **Example** to load one).
2. Enter the signing **secret**.
3. Choose an **algorithm** and, optionally, an **expiration** window.
4. The **signed token** appears automatically in the output pane — no button press needed. It regenerates whenever any input changes.
5. **Copy** the token, or **Share** to copy a link that embeds your payload, secret, and algorithm in the URL.
6. **Clear** resets all fields.

## Inputs

| Input | Required | Description |
|---|---|---|
| Payload | Yes | A JSON object, e.g. `{"sub":"1234567890","name":"John Doe"}`. Arrays, `null`, and non-JSON text are rejected. |
| Secret | Yes | The HMAC signing secret. Any non-empty string is accepted. |

## Options

| Option | Default | Description |
|---|---|---|
| Algorithm | `HS256` | `HS256` (HMAC-SHA-256), `HS384` (HMAC-SHA-384), or `HS512` (HMAC-SHA-512). |
| Expires in | 1 day | Adds `exp` as `iat + seconds`. Options: 1 hour, 1 day, 7 days, 30 days. Disabled when the expiration checkbox is unchecked. |
| Add `iat` and `exp` claims | On | Adds `iat` (issued-at, current Unix time) and `exp` (expiry) to the payload before signing. Uncheck to sign the payload exactly as entered. |

The **Example** button loads the payload `{"sub":"1234567890","name":"John Doe","role":"admin"}` and the secret `your-256-bit-secret` with HS256 selected.

## Output

A signed JWT string (`header.payload.signature`) in the output pane, plus a note reminding you that tokens are signed locally and must be kept safe.

### Secret length warning

When the secret is non-empty but shorter than the algorithm's recommended HMAC key length, an amber warning appears:

| Algorithm | Minimum recommended secret length |
|---|---|
| HS256 | 32 bytes |
| HS384 | 48 bytes |
| HS512 | 64 bytes |

This is a **warning only** — shorter secrets are still accepted and signed.

## Examples

With payload `{"sub":"1234567890","name":"John Doe","role":"admin"}`, secret `your-256-bit-secret`, HS256, and expiration disabled, the tool produces exactly:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIn0.ZhmtWZOhodjm5knipDZ6Hfp5iZUzZXRrYaUofWWDk7w
```

Generated at a fixed time (`iat` = 1700000000) with a 1-hour expiration, the same inputs produce:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMDM2MDB9.62QFEudgd9PMKiLFOo_SWuO84LF4s0LVjUH9KKwKCXM
```

See [Examples](../examples/jwt-generator.md) for HS384/HS512 variants and error cases.

## Edge cases

- **Payload must be a JSON object** — `null`, arrays, and scalars show `Payload must be a JSON object.`
- **Invalid JSON** shows `Payload is not valid JSON.`
- **Empty secret** shows `Enter a secret to sign the token.`
- If the payload already contains `iat` or `exp`, the tool's generated values overwrite them when the expiration option is enabled.
- `iat`/`exp` are derived from the **local clock** (`Date.now()`), so tokens generated on machines with skewed clocks will contain skewed times.
- Share links that were tampered with or corrupted show `Invalid or corrupted share link.`
- Signing failures (e.g. no secure context) show `Failed to sign the token. Please try again.`

## Limitations

- **HMAC only.** Only HS256/HS384/HS512 are supported. Asymmetric algorithms (RS256, ES256, PS256, EdDSA) and unsecured JWTs (`alg: none`) are not available.
- **This tool signs; it does not verify.** To check a token, use the [JWT Decoder](/tools/jwt-decoder) for contents — and verify the signature in your own backend before trusting it.
- Nothing here validates your payload against any JWT specification beyond JSON-parsing it; you are responsible for correct claims (`iss`, `aud`, `exp`, ...).
- The Web Crypto API requires a **secure context** (HTTPS or localhost). On an insecure origin, signing will fail with the generic error above.

## Privacy and security

- Tokens are signed **locally** in your browser; the payload and secret are never sent to a server.
- **The Share feature embeds your payload *and secret* in the URL** (Base64URL-encoded, not encrypted). Anyone who receives the link can read the secret and forge tokens with it. Never share links containing real credentials.
- Anyone holding the secret can forge tokens. Treat generated secrets like passwords.
- This tool is intended for development and testing. For production token issuance, use a maintained library and a secrets manager.

## Related tools

- [JWT Decoder](/tools/jwt-decoder) — inspect the tokens you create (remember: decoding ≠ verifying).
- [Timestamp](/tools/timestamp) — convert the `iat`/`exp` Unix timestamps in a payload to human-readable dates.
