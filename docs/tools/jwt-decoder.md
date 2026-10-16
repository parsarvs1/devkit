# JWT Decoder

Decode a JSON Web Token (JWT) and inspect its header and payload. [Open the tool](/tools/jwt-decoder) · [Examples](../examples/jwt-decoder.md)

## Purpose

A JWT is a three-part, Base64URL-encoded string: `header.payload.signature`. The header and payload are plain JSON — they are *encoded*, not encrypted. This tool splits a token, decodes the first two segments, and pretty-prints them so you can see exactly what a token contains (algorithm, claims, expiry, custom fields) without writing code.

## When to use it

- You received a JWT (from an API response, a cookie, a log file, a colleague) and want to see what is inside it.
- You want to inspect claims such as `sub`, `iss`, `aud`, `exp`, or `iat` to debug an authentication or session issue.
- You want to check which algorithm a token declares before verifying it elsewhere.
- You are learning how JWTs are structured.

Do **not** use this tool to decide whether a token is authentic — see [Limitations](#limitations).

## How to use it

1. Paste a JWT into the **JWT Token** field (or open a shared link that already contains a token).
2. Click **Decode JWT**. If you arrived via a share link, the token is decoded automatically on page load.
3. Read the **Header** and **Payload** panes, which show the decoded JSON.
4. Use **Copy** on either pane to copy that JSON to your clipboard, or **Share** to copy a link that embeds the token in the URL.
5. **Clear** resets the page and removes the token.

## Inputs

| Input | Required | Description |
|---|---|---|
| JWT token | Yes | A string with exactly three dot-separated segments (`header.payload.signature`). |

## Options

This tool has no configurable options. Decoding behavior is fixed: Base64URL-decode segment 1, Base64URL-decode segment 2, parse both as JSON, display.

## Output

- **Header pane** — the decoded header as pretty-printed JSON (typically `alg` and `typ`, plus any custom header fields).
- **Payload pane** — the decoded payload as pretty-printed JSON (registered claims and any custom claims).
- **Error message** — `Invalid JWT. Please check that the token is valid.` when the token does not have three segments or a segment is not valid JSON.

## Examples

Decoding the well-known example token:

```
Input:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header:  {"alg":"HS256","typ":"JWT"}
Payload: {"sub":"1234567890","name":"John Doe","iat":1516239022}
```

See [Examples](../examples/jwt-decoder.md) for more, including malformed tokens.

## Edge cases

- A token with fewer or more than three dot-separated segments shows the invalid-token error.
- A segment that is not valid Base64URL, or that decodes to something that is not valid JSON, shows the same error.
- The payload may be any valid JSON value (object, array, string, number); the panes render whatever `JSON.parse` returns.
- A token with an empty header or payload segment (e.g. `..signature`) is rejected.
- The third segment (the signature) is never displayed and never examined.

## Limitations

- **Decoding is not verification.** Anyone can construct an arbitrary header and payload, Base64URL-encode them, and attach any signature string. The decoded contents are fully attacker-controlled until the signature is checked against a trusted secret or public key. This tool performs **no signature verification** — it does not have your secret, and it does not trust the decoded content.
- The `alg` field shown in the header is whatever the token *claims*. A token may claim `HS256`, `none`, or anything else; that says nothing about how it was actually signed.
- To authenticate a token, verify its signature in your backend with a library appropriate to the algorithm, and validate claims (`exp`, `iss`, `aud`, ...) yourself. Treat this tool as an inspector, not an authenticator.

## Privacy and security

- Tokens are decoded locally in your browser; they are not sent to a server by this tool.
- The **Share** feature copies a URL containing the token in the `?token=` query parameter. URLs can leak through browser history, referrer headers, and logs — do not share links containing live session tokens or credentials.
- Never paste production credentials, API keys, or personal data into any web tool unless you trust the environment.

## Related tools

- [JWT Generator](/tools/jwt-generator) — sign a JWT with an HMAC secret (the counterpart to this tool).
- [Base64 Encoder](/tools/base64) — the encoding JWT segments use is a Base64URL variant.
