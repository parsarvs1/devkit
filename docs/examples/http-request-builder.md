# HTTP Request Builder Examples

Practical requests for [HTTP Request Builder](/tools/http-request-builder). See
the [documentation](../tools/http-request-builder.md) for the full description.

> Requests run from your browser and are subject to CORS. The response bodies
> below are illustrative: the exact body depends on the live service and may
> change over time.

## Example 1 — Simple GET

**Method:** `GET`

**URL:** `https://jsonplaceholder.typicode.com/posts/1`

**Expected behavior:** the status line shows `200 OK`, and the body is
pretty-printed JSON because the response `Content-Type` is `application/json`:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\n..."
}
```

## Example 2 — POST with a body and headers

**Method:** `POST`

**URL:** `https://httpbin.org/post`

**Headers:**

| Header | Value |
| --- | --- |
| Content-Type | application/json |

**Body:**

```json
{
  "name": "Parsa",
  "role": "developer"
}
```

**Expected behavior:** the tool shows `200 OK` and pretty-prints the JSON
response. Because `Content-Type` is supplied, the default is not applied.

## Example 3 — HEAD request

**Method:** `HEAD`

**URL:** `https://jsonplaceholder.typicode.com/posts`

**Expected behavior:** the body panel is shown for `HEAD` requests too (the
body field is hidden, but the response area is still displayed). The status line
shows the response status.

## Example 4 — DELETE request

**Method:** `DELETE`

**URL:** `https://jsonplaceholder.typicode.com/posts/1`

**Expected behavior:** the tool shows the response status and body. The body
field is available because `DELETE` is not `GET` or `HEAD`.

## Example 5 — URL without a scheme

**URL:** `api.example.com/data`

**Expected behavior:** the tool normalizes the URL to
`https://api.example.com/data` before sending.

## Example 6 — Cross-origin request blocked

**URL:** `https://example.com/api`

**Expected behavior:** if CORS headers are missing, the tool shows:

> The request was blocked. Browsers block cross-origin responses (CORS) unless
> the API sends permissive headers, and block https→http requests as mixed
> content.

## Copying and clearing

- **Copy** copies the response body.
- **Clear** resets the method to `GET` and empties the URL, headers, body,
  response, and status.
