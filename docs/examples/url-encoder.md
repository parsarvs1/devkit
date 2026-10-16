# URL Encoder / Decoder — Examples

## 1. Encode a query parameter value

**Input:**

```
hello world
```

**Action:** Encode

**Output:**

```
hello%20world
```

## 2. Decode a percent-encoded string

**Input:**

```
hello%20world
```

**Action:** Decode

**Output:**

```
hello world
```

## 3. Encode special characters

**Input:**

```
name=John Doe&age=30
```

**Action:** Encode

**Output:**

```
name%3DJohn%20Doe%26age%3D30
```

## 4. Decode special characters

**Input:**

```
name%3DJohn%20Doe%26age%3D30
```

**Action:** Decode

**Output:**

```
name=John Doe&age=30
```

## 5. Encode Unicode text

**Input:**

```
café résumé
```

**Action:** Encode

**Output:**

```
caf%C3%A9%20r%C3%A9sum%C3%A9
```

## 6. Decode Unicode text

**Input:**

```
caf%C3%A9%20r%C3%A9sum%C3%A9
```

**Action:** Decode

**Output:**

```
café résumé
```

## 7. Encode emoji

**Input:**

```
Hello 👋
```

**Action:** Encode

**Output:**

```
Hello%20%F0%9F%91%8B
```

## 8. Decode emoji

**Input:**

```
Hello%20%F0%9F%91%8B
```

**Action:** Decode

**Output:**

```
Hello 👋
```

## 9. Invalid percent-encoding — decode error

**Input:**

```
100% complete
```

**Action:** Decode

**Error:** `Invalid encoded URL.`

## 10. Encode a full URL path segment

**Input:**

```
/path/to/file name.pdf
```

**Action:** Encode

**Output:**

```
%2Fpath%2Fto%2Ffile%20name.pdf
```

## 11. Double-encoding behavior

**Input:**

```
hello%20world
```

**Action:** Encode

**Output:**

```
hello%2520world
```

> **Note:** The `%` character itself is encoded to `%25`, so encoding an already-encoded string double-encodes it.

## 12. Encode reserved characters

**Input:**

```
!@#$%^&*()
```

**Action:** Encode

**Output:**

```
!%40%23%24%25%5E%26*()
```

> **Note:** `encodeURIComponent` does not encode `!`, `*`, `'`, `(`, `)`, or `-_.~`.
