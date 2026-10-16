# HTTP Request Builder

Build and send HTTP requests directly from the browser and view the response.

- Tool page: [HTTP Request Builder](/tools/http-request-builder)
- Examples: [HTTP Request Builder examples](../examples/http-request-builder.md)

## Purpose

HTTP Request Builder is a browser-based client for constructing a single HTTP
request: pick a method, set a URL, add headers, optionally attach a body, and
send it. It is intended for quick, ad-hoc requests where a full API client would
be overkill.

## When to use it

- Trying an endpoint with a one-off `HEAD`, `POST`, or `PUT` request.
- Testing whether a header or body changes the response.
- Checking a status code and status text.

Use [API Tester](/tools/api-tester) when you need query parameters or a
response-time measurement.

## How to use it

1. Select the HTTP method.
2. Enter the request URL.
3. Add one or more headers.
4. If the method is not `GET` or `HEAD`, a body field appears — enter the
   request body.
5. Click **Send Request**.
6. Read the response on the right. Use **Copy** to copy the body.

## Inputs

| Input | Description |
| --- | --- |
| Method | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, or `HEAD`. |
| URL | The request URL. Values without an `http://` or `https://` scheme get `https://` prepended. |
| Headers | Key/value pairs sent as request headers. |
| Body | Free-text request body, shown for every method except `GET` and `HEAD`. |

## Options

- **URL normalization**: if the trimmed URL does not start with `http://` or
  `https://`, `https://` is prepended. This prevents a bare host from fetching
  the current site.
- **Body content type** defaults to `application/json` when a body is sent and
  no `Content-Type` header is set. A user-supplied `Content-Type` is respected.
- **JSON rendering**: the response is pretty-printed only when the response
  `Content-Type` contains `application/json`. Other responses are shown raw.
- **Clear** resets the method to `GET` and empties the URL, headers, body,
  response, and status.

## Output

- The HTTP status line, for example `200 OK`.
- The response body, pretty-printed as JSON when the `Content-Type` indicates
  JSON, otherwise shown as-is.

## Examples

See [HTTP Request Builder examples](../examples/http-request-builder.md) for
concrete requests and responses.

## Edge cases

- The body is sent for `POST`, `PUT`, `PATCH`, and `DELETE`, but not for `GET`
  or `HEAD`.
- Empty header names are skipped; values are not trimmed.
- A URL that is not an absolute URL is prefixed with `https://`.
- If the JSON pretty-print step fails, the raw text is shown instead.
- The status display includes the server-provided reason phrase when present.

## Limitations

- **Requests run from your browser.** Cross-origin responses are blocked unless
  the API sends permissive CORS headers, and `https` → `http` requests are
  blocked as mixed content. Both appear as `Failed to fetch` with an
  explanatory message.
- No query-parameter builder; parameters must be part of the URL.
- No response-time measurement and no response headers view.
- No authentication helpers, cookie handling, or redirect configuration.

## Privacy and security

Requests are issued directly from your browser. Headers and bodies (including
any tokens) are sent to the target URL and may appear in browser history and
developer tools. Avoid sending secrets to untrusted hosts.

## Related tools

- [API Tester](/tools/api-tester)
- [Tool Chaining](/tools/tool-chaining)
