# JSON Validator Examples

All examples show the exact input and the exact result produced by the tool.

---

## Example 1: Valid JSON with no warnings

**Input:**
```json
{
  "name": "Parsa",
  "role": "Developer",
  "active": true,
  "preferences": {
    "theme": "dark",
    "editor": {
      "fontFamily": "JetBrains Mono",
      "fontSize": 14
    }
  },
  "skills": ["Next.js", "React", "TypeScript"]
}
```

**Result:**

- Status: **Valid JSON**
- Root type: `object`
- Size: ~180 B
- Keys: 8
- Array items: 3
- Max depth: 3
- Warnings: 0

**Formatted output:**
```json
{
  "name": "Parsa",
  "role": "Developer",
  "active": true,
  "preferences": {
    "theme": "dark",
    "editor": {
      "fontFamily": "JetBrains Mono",
      "fontSize": 14
    }
  },
  "skills": [
    "Next.js",
    "React",
    "TypeScript"
  ]
}
```

---

## Example 2: Trailing comma error

**Input:**
```json
{
  "name": "Parsa",
  "age": 20,
  "skills": ["Next.js", "TypeScript",]
}
```

**Result:**

- Status: **Invalid JSON**
- Error: `Unexpected trailing comma at line 4, column 26.`

**Issue details:**

- Line 4, column 26

```
  "skills": ["Next.js", "TypeScript",]
                         ^
```

---

## Example 3: Multiple trailing commas

**Input:**
```json
{
  "a": 1,
  "b": [2, 3,],
  "c": {"d": 4,}
}
```

**Result:**

- Status: **Invalid JSON**
- Error: `Unexpected trailing comma at line 3, column 12.`

**Issue details:**

Issue 1 — Line 3, column 12:

```
  "b": [2, 3,]
            ^
```

Issue 2 — Line 4, column 14:

```
  "c": {"d": 4,}
             ^
```

---

## Example 4: Unexpected token error

**Input:**
```json
{
  "name": "John"
  "age": 25
}
```

**Result:**

- Status: **Invalid JSON**
- Error: `Expected double-quoted property name in JSON (line 3, column 3)`

**Issue details:**

- Line 3, column 3

```
  "age": 25
  ^
```

---

## Example 5: Duplicate key warning

**Input:**
```json
{
  "name": "Alice",
  "age": 30,
  "name": "Bob"
}
```

**Result:**

- Status: **Valid JSON** (with 1 warning)
- Root type: `object`
- Size: ~50 B
- Keys: 3
- Array items: 0
- Max depth: 1

**Warnings:**

- `Key "name" appears 2 times. Duplicate keys keep only the last value.` at path `(document)`

---

## Example 6: Unsafe integer warning

**Input:**
```json
{
  "id": 9007199254740993,
  "normal": 42
}
```

**Result:**

- Status: **Valid JSON** (with 1 warning)
- Root type: `object`
- Keys: 2

**Warnings:**

- `Number 9007199254740993 exceeds the safe integer range (±2^53 - 1) and loses precision when parsed.` at path `id`

---

## Example 7: Valid JSON array at root

**Input:**
```json
[1, 2, 3]
```

**Result:**

- Status: **Valid JSON**
- Root type: `array`
- Size: 9 B
- Keys: 0
- Array items: 3
- Max depth: 1
- Warnings: 0

**Formatted output:**
```json
[
  1,
  2,
  3
]
```

---

## Example 8: Empty input

**Input:** *(empty textarea)*

**Result:**

The result panel shows an empty state:

```
Paste JSON on the left and the validation result appears here instantly.
```

---

## Example 9: Deeply nested structure

**Input:**
```json
{
  "level1": {
    "level2": {
      "level3": {
        "level4": {
          "value": "deep"
        }
      }
    }
  }
}
```

**Result:**

- Status: **Valid JSON**
- Root type: `object`
- Keys: 4
- Array items: 0
- Max depth: 5

---

## Example 10: Missing colon error

**Input:**
```json
{
  "name" "John"
}
```

**Result:**

- Status: **Invalid JSON**
- Error: `Expected ':' after property name in JSON (line 2, column 11)`

**Issue details:**

- Line 2, column 11

```
  "name" "John"
           ^
```

---

## Example 11: Unclosed bracket error

**Input:**
```json
{
  "items": [1, 2, 3
}
```

**Result:**

- Status: **Invalid JSON**
- Error: `Expected ',' or ']' after array element in JSON (line 2, column 18)`

**Issue details:**

- Line 2, column 18

```
  "items": [1, 2, 3
                  ^
```

---

## Example 12: Valid JSON with multiple warnings

**Input:**
```json
{
  "id": 9007199254740993,
  "name": "Alice",
  "name": "Bob",
  "email": "alice@example.com"
}
```

**Result:**

- Status: **Valid JSON** (with 2 warnings)
- Root type: `object`
- Keys: 4

**Warnings:**

1. `Key "name" appears 2 times. Duplicate keys keep only the last value.` at path `(document)`
2. `Number 9007199254740993 exceeds the safe integer range (±2^53 - 1) and loses precision when parsed.` at path `id`
