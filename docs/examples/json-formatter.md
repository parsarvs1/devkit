# JSON Formatter Examples

All examples show the exact input and the exact output produced by the tool.

---

## Example 1: Format a compact JSON object

**Input:**
```json
{"name":"John","age":25,"city":"New York"}
```

**Action:** Click **Format**

**Output:**
```json
{
  "name": "John",
  "age": 25,
  "city": "New York"
}
```

---

## Example 2: Minify a pretty-printed JSON object

**Input:**
```json
{
  "name": "John",
  "age": 25,
  "city": "New York"
}
```

**Action:** Click **Minify**

**Output:**
```json
{"name":"John","age":25,"city":"New York"}
```

---

## Example 3: Format a nested JSON structure

**Input:**
```json
{"user":{"name":"Alice","roles":["admin","user"]},"active":true}
```

**Action:** Click **Format**

**Output:**
```json
{
  "user": {
    "name": "Alice",
    "roles": [
      "admin",
      "user"
    ]
  },
  "active": true
}
```

---

## Example 4: Format a JSON array

**Input:**
```json
[1,2,3,4,5]
```

**Action:** Click **Format**

**Output:**
```json
[
  1,
  2,
  3,
  4,
  5
]
```

---

## Example 5: Format a JSON primitive (string)

**Input:**
```json
"hello world"
```

**Action:** Click **Format**

**Output:**
```json
"hello world"
```

---

## Example 6: Format JSON with Unicode characters

**Input:**
```json
{"greeting":"Hello","emoji":"😀","language":"日本語"}
```

**Action:** Click **Format**

**Output:**
```json
{
  "greeting": "Hello",
  "emoji": "😀",
  "language": "日本語"
}
```

---

## Example 7: Invalid JSON (trailing comma)

**Input:**
```json
{"name":"John","age":25,}
```

**Action:** Click **Format** or **Minify**

**Output:** Error message displayed:

```
Invalid JSON. Please check your syntax.
```

---

## Example 8: Invalid JSON (single quotes)

**Input:**
```json
{'name':'John','age':25}
```

**Action:** Click **Format** or **Minify**

**Output:** Error message displayed:

```
Invalid JSON. Please check your syntax.
```

---

## Example 9: Format an empty object

**Input:**
```json
{}
```

**Action:** Click **Format**

**Output:**
```json
{}
```

---

## Example 10: Format an empty array

**Input:**
```json
[]
```

**Action:** Click **Format**

**Output:**
```json
[]
```

---

## Example 11: Minify a nested JSON structure

**Input:**
```json
{
  "database": {
    "host": "localhost",
    "port": 5432,
    "credentials": {
      "username": "admin",
      "password": "secret"
    }
  }
}
```

**Action:** Click **Minify**

**Output:**
```json
{"database":{"host":"localhost","port":5432,"credentials":{"username":"admin","password":"secret"}}}
```

---

## Example 12: Format JSON with null and boolean values

**Input:**
```json
{"id":null,"active":true,"deleted":false,"count":0}
```

**Action:** Click **Format**

**Output:**
```json
{
  "id": null,
  "active": true,
  "deleted": false,
  "count": 0
}
```
