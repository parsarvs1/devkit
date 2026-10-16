# Tool Chaining Examples

Practical chains for [Tool Chaining](/tools/tool-chaining). See the
[documentation](../tools/tool-chaining.md) for the full description.

Each example lists the steps in order and the final output.

## Example 1 — JSON to TypeScript (the default chain)

**Steps:**

1. JSON Formatter
2. JSON → TypeScript

**Chain input:**

```json
{
  "name": "Parsa",
  "age": 20,
  "developer": true
}
```

**Final output:**

```ts
interface Root {
  name: string;
  age: number;
  developer: boolean;
}
```

The first step re-serializes the JSON with two-space indentation; the second
step reads it and emits the interface.

## Example 2 — JSON to a Zod schema

**Steps:**

1. JSON → Zod

**Chain input:**

```json
{
  "user": { "name": "a", "age": 1 },
  "tags": ["x", "y"],
  "score": 5,
  "empty": [],
  "mixed": [1, "a"]
}
```

**Final output:**

```ts
import { z } from "zod";

export const schema = z.object({
  "user": z.object({
  "name": z.string(),
  "age": z.number(),
}),
  "tags": z.array(z.string()),
  "score": z.number(),
  "empty": z.array(z.unknown()),
  "mixed": z.array(z.number()),
});
```

Note that the array element type is inferred from the first element, so `mixed`
becomes `z.array(z.number())`.

## Example 3 — Normalize then hash JSON

**Steps:**

1. JSON Formatter
2. Hash Generator

**Chain input (compact JSON):**

```json
{"name":"Parsa","age":20,"developer":true}
```

**Final output (SHA-256 hex of the formatted JSON):**

```
3c337ca5a446123fc26a712d1204a739765a0540ec7ad8207e77c51e8ca9bd3e
```

## Example 4 — Decode Base64

**Steps:**

1. Base64

**Chain input:**

```
aGVsbG8=
```

**Final output:**

```
hello
```

Because the input is valid Base64, the step decodes it. Non-Base64 input such
as `hello` would instead be encoded to `aGVsbG8=`.

## Example 5 — Convert a Unix timestamp

**Steps:**

1. Timestamp

**Chain input:**

```
1700000000
```

**Final output:**

```
2023-11-14T22:13:20.000Z
```

Numbers below `10000000000` are treated as seconds; larger numbers are treated
as milliseconds.

## Example 6 — Sign a JWT

**Steps:**

1. JWT Generator

**Chain input (last line is the secret):**

```
{"sub":"123","name":"John"}
secret
```

**Final output:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiSm9obiJ9.GjA3qJod-V7bWgXvYQNZRynF7HeINz_x1fpbKHRzMSo
```

The payload is the first line and the secret is the second. With only one line
of input, the secret defaults to `secret`.

## Example 7 — A chain that stops on error

**Steps:**

1. JSON Validator
2. JSON → TypeScript

**Chain input:**

```json
{ "name": "Parsa" }
```

**Expected behavior:** the first step returns the fixed string
`Valid JSON ✓`. The second step tries to parse that as JSON and fails, so the
chain stops and displays the JSON parse error. Intermediate output is not
returned.

## Adding, reordering, and removing steps

- **Add Tool** appends a JSON Formatter step.
- The up/down arrows change a step's position.
- The trash button removes a step.
- **Reset** restores the default JSON Formatter → JSON → TypeScript chain.
- **Copy** copies the final output.
