# Tool Chaining

Connect several DevKit tools into a single pipeline where each step's output
becomes the next step's input.

- Tool page: [Tool Chaining](/tools/tool-chaining)
- Examples: [Tool Chaining examples](../examples/tool-chaining.md)

## Purpose

Tool Chaining lets you run multiple transformations back to back without
copying and pasting between tools. You define an ordered list of steps, provide
one input, and the tool feeds the result of each step into the next, returning
only the final output.

## When to use it

- Normalizing JSON and immediately converting it to TypeScript or a Zod schema.
- Decoding Base64 and then formatting the result.
- Hashing or otherwise transforming a value as part of a repeatable workflow.
- Demonstrating a multi-step developer workflow in one place.

## How to use it

1. Add or reorder steps in the **Your Chain** panel. Each step has a dropdown
   to choose its tool, a remove button, and up/down arrows to reorder.
2. Enter the chain input in the **Chain Input** panel. This is the input to the
   first step.
3. Click **Run Chain**.
4. Read the final result in **Final Output** and copy it if needed.

The default chain is **JSON Formatter → JSON → TypeScript**. **Reset** restores
that default chain. **Add Tool** appends a new step using JSON Formatter.

## Inputs

| Input | Description |
| --- | --- |
| Chain input | The single string fed into the first step. |
| Steps | An ordered list of tools chosen from the supported set. |

## Options

- **Add Tool** — append a step.
- **Remove step** — delete a step.
- **Move up / down** — change a step's position in the chain.
- **Step tool dropdown** — choose which tool the step runs.
- **Reset** — restore the default two-step chain and clear the output.
- **Run Chain** — execute every step in order.
- **Copy** — copy the final output.

### Supported tools

| Step tool | Behavior |
| --- | --- |
| JSON Formatter | Parses the input and re-serializes it with two-space indentation. |
| JSON Validator | Parses the input and returns `Valid JSON ✓`. |
| JSON → TypeScript | Emits an `interface Root { ... }` from a JSON object. |
| JSON → Zod | Emits a `z.object({ ... })` schema from a JSON object. |
| Base64 | Decodes Base64 if possible, otherwise encodes the input. |
| Hash Generator | Returns the SHA-256 hex digest of the input. |
| Color Converter | Converts between HEX and RGB color formats. |
| Timestamp | Converts a Unix timestamp or date to the other representation. |
| UUID Generator | Returns a random UUID. |
| JWT Generator | Signs a JSON payload into a JWT (HS256). |

## Output

The final value produced by the last step. Errors are shown inline and abort the
chain.

## Examples

See [Tool Chaining examples](../examples/tool-chaining.md) for the default
JSON→TypeScript chain, a JSON→Zod chain, and a JWT chain.

## Edge cases

- A chain cannot run while it has no steps or the input is empty; **Run Chain**
  is disabled in those cases.
- Each step receives exactly one string. A step that returns empty output passes
  an empty string to the next step.
- If any step throws, the whole chain stops and its error message is displayed.
  Intermediate results are discarded.
- **Base64** auto-detects direction: input that is valid Base64 is decoded,
  anything else is encoded. This means a plain word such as `hello` is encoded,
  while `aGVsbG8=` is decoded to `hello`.
- **JSON Validator** returns the fixed string `Valid JSON ✓`, which is not valid
  JSON and cannot be fed into a JSON-consuming step.
- **JSON → TypeScript** and **JSON → Zod** require the JSON root to be an
  object; arrays and primitives produce an error.
- **Color Converter** accepts only `#RGB`/`#RRGGBB` or `rgb(r, g, b)`. RGB
  channel values are clamped to `0`–`255`.
- **Timestamp** treats numbers below `10000000000` as seconds and larger numbers
  as milliseconds.
- **JWT Generator** uses the last non-empty line of the input as the signing
  secret and the remaining lines as the JSON payload. With a single line, the
  secret defaults to `secret`.
- **UUID Generator** is random, so running the same chain twice produces
  different output.

## Limitations

- Only the ten supported tools are available; most other DevKit tools cannot be
  chained.
- The chain is a linear pipeline — there is no branching, looping, or
  conditional logic.
- There are no per-step configuration options; each tool uses its default
  behavior.
- The chain is not saved; reloading the page resets it to the default.

## Privacy and security

All transformations run in the browser. Hashing, UUID generation, and JWT
signing use the Web Crypto API locally. The JWT secret you supply stays in the
browser and is never transmitted. Do not enter production secrets.

## Related tools

- [JSON Formatter](/tools/json-formatter)
- [JSON → TypeScript](/tools/json-to-typescript)
- [JSON → Zod](/tools/json-to-zod)
- [SQL Formatter](/tools/sql-formatter)
