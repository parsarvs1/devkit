# API Tester Examples

Practical requests for [API Tester](/tools/api-tester). See the
[documentation](../tools/api-tester.md) for the full description.

> Requests run from your browser and are subject to CORS. The response bodies
> below are illustrative: the exact body depends on the live service and may
> change over time.

## Example 1 — GET with query parameters

**Method:** `GET`

**URL:** `https://jsonplaceholder.typicode.com/todos/1`

**Params:**

| Key | Value |
| --- | --- |
| userId | 1 |

**Expected behavior:** the tool builds
`https://jsonplaceholder.typicode.com/todos/1?userId=1` and shows a `200`
status with a pretty-printed JSON body similar to:

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

## Example 2 — POST with a JSON body and a header

**Method:** `POST`

**URL:** `https://httpbin.org/post`

**Headers:**

| Header | Value |
| --- | --- |
| Authorization | Bearer my-token |

**Body:**

```json
{
  "name": "Parsa",
  "role": "developer"
}
```

**Expected behavior:** because no `Content-Type` header is set, the tool adds
`Content-Type: application/json` automatically. The status is `200`, and the
body is pretty-printed JSON. The `json` field echoes the posted body and the
`headers` field echoes the sent headers.

## Example 3 — A missing resource (404)

**Method:** `GET`

**URL:** `https://jsonplaceholder.typicode.com/todos/999999`

**Expected behavior:** the response status is `404`, shown in red, with a
small JSON body such as `{}`. The status is colored red because it is a `4xx`
code.

## Example 4 — Bare host normalization

**URL:** `api.example.com/users`

**Expected behavior:** the tool prepends `https://`, sending the request to
`https://api.example.com/users` instead of fetching the current site.

## Example 5 — A cross-origin request that is blocked

**Method:** `GET`

**URL:** `https://example.com/some-api`

**Expected behavior:** if the server does not return permissive CORS headers,
the browser blocks the response and the tool shows:

> The request was blocked. Browsers block cross-origin responses (CORS) unless
> the API sends permissive headers, and block https→http requests as mixed
> content. Requests run from your browser, not a server.

## Example 6 — Non-JSON response

**Method:** `GET`

**URL:** `https://example.com`

**Expected behavior:** the HTML body is displayed as raw text rather than
pretty-printed, because it does not parse as JSON.

## Copying and clearing

- **Copy** copies the response body shown in the panel.
- **Clear** resets the method, URL, params, headers, body, response, status,
  and error.
