# JSON to Zod Examples

All examples show the exact input and the exact output produced by the tool.

---

## Example 1: Basic object

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

---

## Example 2: Nested objects

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

Note: Nested object fields use a fixed 2-space indent regardless of nesting depth — the schema generator does not add extra indentation for deeper levels.

---

## Example 3: Mixed-type array

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

---

## Example 4: Empty array

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

---

## Example 5: Null value

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

---

## Example 6: Non-identifier keys

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

---

## Example 7: Root is an array

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

---

## Example 8: Root is a primitive string

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

---

## Example 9: Root is null

**Input:**
```json
null
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.null();

export type Root = z.infer<typeof RootSchema>;
```

---

## Example 10: Array of objects

**Input:**
```json
{
  "users": [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
  ]
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  users: z.array(z.object({
  name: z.string(),
  age: z.number(),
})),
});

export type Root = z.infer<typeof RootSchema>;
```

---

## Example 11: Array with null values

**Input:**
```json
{
  "data": [null, null]
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  data: z.array(z.null()),
});

export type Root = z.infer<typeof RootSchema>;
```

---

## Example 12: Deeply nested structure

**Input:**
```json
{
  "company": {
    "name": "Acme",
    "address": {
      "street": "Main St",
      "city": "Springfield"
    }
  }
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  company: z.object({
  name: z.string(),
  address: z.object({
  street: z.string(),
  city: z.string(),
}),
}),
});

export type Root = z.infer<typeof RootSchema>;
```

---

## Example 13: Boolean and number primitives

**Input:**
```json
{
  "active": true,
  "count": 42,
  "ratio": 3.14,
  "name": "test"
}
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.object({
  active: z.boolean(),
  count: z.number(),
  ratio: z.number(),
  name: z.string(),
});

export type Root = z.infer<typeof RootSchema>;
```

---

## Example 14: Invalid JSON

**Input:**
```json
{"name": "John",}
```

**Output:** Error message displayed:

```
Invalid JSON. Please check your input.
```

---

## Example 15: Root is an array of strings

**Input:**
```json
["apple", "banana", "cherry"]
```

**Output:**
```typescript
import { z } from "zod";

const RootSchema = z.array(z.string());

export type Root = z.infer<typeof RootSchema>;
```
