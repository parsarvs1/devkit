# JSON to TypeScript

## Purpose

The JSON to TypeScript tool converts a JSON document into TypeScript interface definitions. It analyzes the structure of the JSON — objects, arrays, primitives, and null — and generates corresponding TypeScript types. Nested objects are extracted into separately named interfaces, and the root type is exported as a type alias.

## When to use it

- You have a JSON API response and want to generate TypeScript types for it.
- You want to scaffold TypeScript interfaces from example data.
- You need type definitions for a configuration file or data structure.
- You want to quickly prototype types before refining them manually.

## How to use it

1. Open the [JSON to TypeScript tool page](/tools/json-to-typescript).
2. Paste your JSON into the **JSON Input** textarea. A sample is pre-loaded.
3. Click **Convert to TypeScript**.
4. The generated TypeScript interfaces appear in the **TypeScript** output panel.
5. Click **Copy** to copy the output to your clipboard.
6. Click **Clear** to reset both panels.

## Options

| Option | Description |
|---|---|
| **Convert to TypeScript** | Parses the input JSON and generates TypeScript interface definitions. |
| **Copy** | Copies the generated TypeScript to the clipboard. Disabled when there is no output. |
| **Clear** | Clears both input and output panels. |

There are no configurable settings. The conversion always produces interfaces with 2-space indentation and uses the naming conventions described below.

## Output

The output is a string of TypeScript code containing:

- One `interface` declaration for each nested object, named using the conventions below.
- A final `export type Root = ...;` alias for the root type.

### Type mapping

| JSON type | TypeScript type |
|---|---|
| `string` | `string` |
| `number` | `number` |
| `boolean` | `boolean` |
| `null` | `null` |
| `object` | Generated `interface` (named) |
| `array` (homogeneous) | `ItemType[]` |
| `array` (mixed types) | `(TypeA \| TypeB)[]` |
| `array` (empty) | `unknown[]` |

### Interface naming conventions

- The root object's interface is named `RootShape` (the root type alias is `Root`).
- A nested object's interface name is derived from the parent interface name + the capitalized key name. For example, a key `address` inside `RootShape` produces an interface named `RootShapeAddress`.
- Key names are sanitized: non-alphanumeric characters (except `_` and `$`) are removed before capitalizing.
- If an interface name is already taken, a numeric suffix is appended: `RootShapeAddress2`, `RootShapeAddress3`, etc.
- Object keys that are not valid JavaScript identifiers (e.g., contain hyphens or start with a digit) are quoted in the interface definition.

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
interface RootShape {
  name: string;
  age: number;
  active: boolean;
  skills: string[];
}

export type Root = RootShape;
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
interface RootShapeUserAddress {
  city: string;
  zip: string;
}

interface RootShapeUser {
  name: string;
  address: RootShapeUserAddress;
}

interface RootShape {
  user: RootShapeUser;
}

export type Root = RootShape;
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
interface RootShape {
  values: (number | string | boolean)[];
}

export type Root = RootShape;
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
interface RootShape {
  items: unknown[];
}

export type Root = RootShape;
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
interface RootShape {
  deletedAt: null;
}

export type Root = RootShape;
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
interface RootShape {
  "first-name": string;
  "2fa": boolean;
}

export type Root = RootShape;
```

### Root is an array

**Input:**
```json
[1, 2, 3]
```

**Output:**
```typescript
export type Root = number[];
```

### Root is a primitive

**Input:**
```json
"hello"
```

**Output:**
```typescript
export type Root = string;
```

See [Examples](../examples/json-to-typescript.md) for more scenarios.

## Edge cases

- **Empty input:** The Convert button is always enabled, but if the input is empty or whitespace, `JSON.parse` will throw and the error `"Invalid JSON. Please check your input."` is displayed.
- **Root is null:** Produces `export type Root = null;`.
- **Root is an array of objects:** Each object in the array generates its own interface. If the objects have the same structure, they share the same interface name (the first one wins; subsequent identical structures reuse the name).
- **Deeply nested objects:** Each nesting level produces a new interface. There is no depth limit, but very deep structures produce many interfaces.
- **Duplicate interface names:** Resolved by appending a numeric suffix (e.g., `RootShapeMeta2`).
- **Keys with special characters:** Non-alphanumeric characters are stripped for interface naming purposes, but the original key is preserved (quoted if necessary) in the interface body.

## Limitations

- No support for JSON5 or comments in input.
- No union type detection across array items beyond what is present in the data — if an array contains `[1, 2]`, the type is `number[]`, not `1 | 2` (literal types are not inferred).
- No optional field detection — all fields are required in the generated interfaces.
- No support for `Date`, `RegExp`, or other non-JSON types — these cannot be represented in JSON input.
- The tool does not validate against a JSON schema; it only infers types from the provided data.
- No file upload — input must be pasted or typed into the textarea.

## Privacy and security

All processing happens entirely in the browser. No JSON data is sent to any server. This tool does not have a Share button, so no data is encoded into URLs.

## Related tools

- [JSON Formatter](json-formatter.md) — format and minify JSON.
- [JSON Validator](json-validator.md) — validate JSON and get detailed error locations.
- [JSON to Zod](json-to-zod.md) — convert JSON to Zod validation schemas.
