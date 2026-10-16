# JWT Decoder — Examples

Practical examples for the [JWT Decoder](/tools/jwt-decoder). See the [full documentation](../tools/jwt-decoder.md).

## Example 1: Decode a standard token

**Input** (the classic example token):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Output — Header:**

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Output — Payload:**

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

The `iat` value 1516239022 is a Unix timestamp (2018-01-18T01:30:22Z). The signature segment is not displayed — the tool does not verify it.

## Example 2: Decode a token with expiry claims

**Input** (produced by the [JWT Generator](/tools/jwt-generator) with a 1-hour expiration at a fixed time):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMDM2MDB9.62QFEudgd9PMKiLFOo_SWuO84LF4s0LVjUH9KKwKCXM
```

**Output — Payload:**

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "role": "admin",
  "iat": 1700000000,
  "exp": 1700003600
}
```

`exp − iat` = 3600 seconds = 1 hour, matching the generator's "1 hour" option.

## Example 3: Malformed token

**Input:**

```
not-a-jwt
```

**Output:** error message `Invalid JWT. Please check that the token is valid.` — the token does not have three dot-separated segments.

## Example 4: Segment that is not valid JSON

**Input:**

```
eyJhbGciOiJIUzI1NiJ9.bm90LWpzb24.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Output:** the same error message — the payload segment decodes to `not-json`, which fails to parse.

## Example 5: Decoding is not verifying

Take the token from Example 1 and change the payload's `name` to `Jane Doe`, then re-encode the segments (the [Base64 Encoder](/tools/base64) can help). The decoder will happily show the modified payload — it has no way to know the signature no longer matches. **A decoded token is only as trustworthy as the signature check you perform elsewhere.** Always verify the signature with a trusted secret or public key before acting on a token's contents.
