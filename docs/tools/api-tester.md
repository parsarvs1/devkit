# API Tester

Send HTTP requests from the browser and inspect the response body, status
code, and timing.

- Tool page: [API Tester](/tools/api-tester)
- Examples: [API Tester examples](../examples/api-tester.md)

## Purpose

API Tester is a lightweight, browser-based HTTP client. It lets you issue a
request to a URL, attach query parameters, headers, and (for methods that
support them) a request body, then read the raw response.

## When to use it

- Manually probing a REST endpoint during development.
- Checking whether a request returns the expected status code and body.
- Reproducing a call with a specific header or query parameter.
- Inspecting a JSON response in a pretty-printed view.

It is not a full API client: there is no collection/history, no authentication
wizard, and no environment variables.

## How to use it

1. Choose an HTTP method from the dropdown.
2. Enter the request URL. Pressing `Enter` in the URL field sends the request.
3. Use the **Params**, **Headers**, and **Body** tabs to add query parameters,
   headers, and a body.
4. Click **Send**.
5. Read the response in the panel below. Use **Copy** to copy the body, or
   **Clear** to reset the form.

## Inputs

| Input | Description |
| --- | --- |
| Method | `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`. |
| URL | The request URL. If it is not absolute, `https://` is prepended automatically. |
| Params | Key/value pairs added to the query string. |
| Headers | Key/value pairs sent as request headers. |
| Body | Free-text request body. Sent only for `POST`, `PUT`, and `PATCH`. |

## Options

- **Query parameters** are appended with `URLSearchParams.set`. A key is trimmed;
  empty keys are ignored. Setting the same key twice overwrites the previous
  value.
- **Body content type** defaults to `application/json` when a body is sent and no
  `Content-Type` header is set. If you supply your own `Content-Type`, it is
  respected.
- **Response rendering**: the body is read as text. If it parses as JSON it is
  pretty-printed with two-space indentation; otherwise the raw text is shown.
  This happens regardless of the response `Content-Type` header.
- **Copy** writes the current response body to the clipboard. **Clear** resets
  the method, URL, params, headers, body, and response.

## Output

- The response body (pretty-printed JSON when possible, otherwise raw text).
- The numeric HTTP status code, colored green for `2xx` and red for `4xx`.
- The elapsed time in milliseconds, measured around the request only.

## Examples

See [API Tester examples](../examples/api-tester.md) for concrete requests and
the responses they produce.

## Edge cases

- A bare host such as `api.example.com` is treated as `https://api.example.com`
  rather than fetching the current site.
- Empty parameter keys are skipped; values are not trimmed.
- A non-JSON response is shown verbatim, including HTML and empty bodies.
- A response that is valid JSON but has a non-JSON `Content-Type` is still
  pretty-printed, because the tool attempts `JSON.parse` on the text.
- The response time is a client-side measurement and includes browser
  processing, not just server latency.

## Limitations

- **Requests run from your browser**, not from a server. Cross-origin responses
  are blocked unless the API returns permissive CORS headers, and
  `https` → `http` requests are blocked as mixed content. Both surface as
  `Failed to fetch` with an explanatory message.
- Response headers are not displayed.
- There is no support for cookies, redirects configuration, multipart bodies,
  or streaming.
- The response is always read as text; binary payloads are not handled
  specially.

## Privacy and security

Requests are made directly from your browser to the target URL. Any credentials
you type into headers or the body travel to that URL and may be visible in the
browser's history, the URL, and developer tools. Do not send secrets to
third-party or untrusted endpoints.

## Related tools

- [HTTP Request Builder](/tools/http-request-builder)
- [Tool Chaining](/tools/tool-chaining)
