# Regex Tester — Examples

All examples below use the tool's default `g` flag unless otherwise noted.

## 1. Extract all numbers from a string

**Pattern:** `\d+`

**Text:**

```
Order 42 shipped on 2026-10-15 with 3 items totaling $99.50
```

**Matches:**

```
42
2026
10
15
3
99
50
```

## 2. Match email addresses

**Pattern:** `[\w.]+@[\w-]+\.[\w.]+`

**Text:**

```
Contact us at support@example.com or sales@company.co.uk for help.
```

**Matches:**

```
support@example.com
sales@company.co.uk
```

## 3. Match URLs (http/https)

**Pattern:** `https?://[^\s]+`

**Text:**

```
Visit https://example.com or http://test.org/page?query=1 for details.
```

**Matches:**

```
https://example.com
http://test.org/page?query=1
```

## 4. Case-insensitive matching with flag `gi`

**Pattern:** `hello`

**Flags:** `gi`

**Text:**

```
Hello, HELLO, hello, HeLLo — four greetings.
```

**Matches:**

```
Hello
HELLO
hello
HeLLo
```

## 5. Multiline mode — match lines starting with a word

**Pattern:** `^\w+`

**Flags:** `gm`

**Text:**

```
alpha beta
gamma delta
epsilon
```

**Matches:**

```
alpha
gamma
epsilon
```

## 6. No matches found

**Pattern:** `z{3}`

**Text:**

```
The quick brown fox jumps over the lazy dog.
```

**Output:** *(placeholder text — no matches)*

## 7. Invalid pattern error

**Pattern:** `[unclosed`

**Text:** `any text`

**Error:** `Invalid regular expression or flags.`

## 8. Empty pattern error

**Pattern:** *(empty)*

**Text:** `any text`

**Error:** `Please enter a regular expression.`

## 9. Catastrophic backtracking — timeout

**Pattern:** `(a+)+$`

**Text:**

```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaab
```

**Error:** `Timed out. This pattern may require catastrophic backtracking.`

## 10. Without the `g` flag — first match only

**Pattern:** `\d{3}`

**Flags:** *(empty)*

**Text:**

```
123 456 789
```

**Matches:**

```
123
```
