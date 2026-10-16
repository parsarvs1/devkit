# JSON to Zod

## Purpose

The JSON to Zod tool converts a JSON document into a [Zod](https://zod.dev/) validation schema. It analyzes the structure of the JSON — objects, arrays, primitives, and null — and generates corresponding Zod schema code. The output includes the necessary `import { z } from "zod"` statement, a `RootSchema` constant, and an exported `Root` type inferred from the schema.

## When to use it

- You have a JSON API response and want to generate a Zod schema for runtime validation.
- You want to scaffold a Zod schema from example data.
- You need a starting point for form validation or request validation.
- You want both a runtime schema and a TypeScript type derived from it.

## How to use it

1. Open the [JSON to Zod tool page](/tools/json-to-zod).
2. Paste your JSON into the **JSON Input** textarea. A sample is pre-loaded.
3. Click **Convert to Zod**.
4. The generated Zod schema appears in the **Zod Schema** output panel.
5. Click **Copy** to copy the output to your clipboard.
6. Click **Clear** to reset both panels.

## Options

| Option | Description |
|---|---|
| **Convert to Zod** | Parses the input JSON and generates a Zod schema. |
| **Copy** | Copies the generated Zod schema to the clipboard. Disabled when there is no output. |
| **Clear** | Clears both input and output panels. |

There are no configurable settings. The conversion always produces a schema with 2-space indentation and uses the conventions described below.

## Output

The output is a string of TypeScript code containing:

- `import { z } from "zod";`
- A `const RootSchema = ...` declaration.
- `export type Root = z.infer<typeof RootSchema>;`

### Type mapping

| JSON type | Zod schema |
|---|---|
| `string` | `z.string()` |
| `number` | `z.number()` |
| `boolean` | `z.boolean()` |
| `null` | `z.null()` |
| `object` | `z.object({ ... })` |
| `array` (homogeneous) | `z.array(ItemType)` |
| `array` (mixed types) | `z.array(z.union([TypeA, TypeB]))` |
| `array` (empty) | `z.array(z.unknown())` |

### Key formatting

- Object keys that are valid JavaScript identifiers (match `/^[A-Za-z_$][A-Za-z0-9_$]*$/`) are used as-is.
- All other keys are wrapped in double quotes.

### Root value handling

- If the root value is an **object**, the schema is wrapped in `z.object({ ... })`.
- If the root value is an **array** or **primitive**, the schema is generated directly without a `z.object` wrapper (e.g., `const RootSchema = z.array(z.string());`).

## Examples

### Basic object

**Input:**
```json
{
  "name": "Parsa",
  "age": 20,
  "active": true,
  "skills": ["Next.js", "TypeScript"]
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  name: z.string(),
  age: z.number(),
  active: z.boolean(),
  skills: z.array(z.string()),
});

export type Root = z.infer<typeof RootSchema>;
```

### Nested objects

**Input:**
```json
{
  "user": {
    "name": "Alice",
    "address": {
      "city": "Berlin",
      "zip": "10115"
    }
  }
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  user: z.object({
    name: z.string(),
    address: z.object({
      city: z.string(),
      zip: z.string(),
    }),
  }),
});

export type Root = z.infer<typeof RootSchema>;
```

### Mixed-type array

**Input:**
```json
{
  "values": [1, "two", true]
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  values: z.array(z.union([z.number(), z.string(), z.boolean()])),
});

export type Root = z.infer<typeof RootSchema>;
```

### Empty array

**Input:**
```json
{
  "items": []
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  items: z.array(z.unknown()),
});

export type Root = z.infer<typeof RootSchema>;
```

### Null value

**Input:**
```json
{
  "deletedAt": null
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  deletedAt: z.null(),
});

export type Root = z.infer<typeof RootSchema>;
```

### Non-identifier keys

**Input:**
```json
{
  "first-name": "Alice",
  "2fa": true
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  "first-name": z.string(),
  "2fa": z.boolean(),
});

export type Root = z.infer<typeof RootSchema>;
```

### Root is an array

**Input:**
```json
[1, 2, 3]
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.array(z.number());

export type Root = z.infer<typeof RootSchema>;
```

### Root is a primitive

**Input:**
```json
"hello"
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.string();

export type Root = z.infer<typeof RootSchema>;
```

See [Examples](../examples/json-to-zod.md) for more scenarios.

## Edge cases

- **Empty input:** The Convert button is always enabled, but if the input is empty or whitespace, `JSON.parse` will throw and the error `"Invalid JSON. Please check your input."` is displayed.
- **Root is null:** Produces `const RootSchema = z.null();`.
- **Root is an array of objects:** The schema is `z.array(z.object({ ... }))` — a single `z.object` wrapper inside `z.array`.
- **Deeply nested objects:** Each nesting level is wrapped in its own `z.object`. There is no depth limit.
- **Keys with special characters:** Keys that are not valid JavaScript identifiers are wrapped in double quotes.
- **Array union deduplication:** If an array contains `[1, 2, 3]`, the types are deduplicated to `[z.number()]`, producing `z.array(z.number())` — not `z.array(z.union([z.number(), z.number(), z.number()]))`.

## Limitations

- No support for JSON5 or comments in input.
- No literal type inference — a string value produces `z.string()`, not `z.literal("value")`.
- No optional field detection — all fields are required in the generated schema.
- No support for Zod refinements, transforms, or superRefine — only basic type inference.
- No support for `Date`, `RegExp`, or other non-JSON types — these cannot be represented in JSON input.
- The tool does not validate against a JSON schema; it only infers types from the provided data.
- No file upload — input must be pasted or typed into the textarea.

## Privacy and security

All processing happens entirely in the browser. No JSON data is sent to any server. This tool does not have a Share button, so no data is encoded into URLs.

## Related tools

- [JSON Formatter](json-formatter.md) — format and minify JSON.
- [JSON Validator](json-validator.md) — validate JSON and get detailed error locations.
- [JSON to TypeScript](json-to-typescript.md) — convert JSON to TypeScript interfaces.
