# Base64 Encoder / Decoder — Examples

## 1. Encode simple ASCII text

**Input:**

```
Hello, World!
```

**Action:** Encode

**Output:**

```
SGVsbG8sIFdvcmxkIQ==
```

## 2. Decode a Base64 string

**Input:**

```
SGVsbG8sIFdvcmxkIQ==
```

**Action:** Decode

**Output:**

```
Hello, World!
```

## 3. Encode Unicode text (emoji)

**Input:**

```
Hello 👋 World 🌍
```

**Action:** Encode

**Output:**

```
SGVsbG8g8J+RiSBXb3JsZCDwn4yZ
```

## 4. Decode Unicode Base64

**Input:**

```
SGVsbG8g8J+RiSBXb3JsZCDwn4yZ
```

**Action:** Decode

**Output:**

```
Hello 👋 World 🌍
```

## 5. Encode a JSON payload

**Input:**

```
{"name":"Alice","age":30}
```

**Action:** Encode

**Output:**

```
eyJuYW1lIjoiQWxpY2UiLCJhZ2UiOjMwfQ==
```

## 6. Decode a JSON payload

**Input:**

```
eyJuYW1lIjoiQWxpY2UiLCJhZ2UiOjMwfQ==
```

**Action:** Decode

**Output:**

```
{"name":"Alice","age":30}
```

## 7. Encode text with special characters

**Input:**

```
user@example.com:password123!
```

**Action:** Encode

**Output:**

```
dXNlckBleGFtcGxlLmNvbTpwYXNzd29yZDEyMyE=
```

## 8. Invalid Base64 — decode error

**Input:**

```
Not@Valid#Base64!
```

**Action:** Decode

**Error:** `Invalid Base64 string.`

## 9. Encode an empty string

**Input:**

```
(empty)
```

**Action:** Encode

**Output:**

```
(empty — no output)
```

## 10. Round-trip verification

**Input:**

```
The quick brown fox jumps over the lazy dog.
```

**Action:** Encode → then copy the output and paste it into Input → Decode

**Output:**

```
The quick brown fox jumps over the lazy dog.
```
