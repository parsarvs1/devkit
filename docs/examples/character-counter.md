# Character Counter — Examples

## 1. Simple sentence

**Input:**

```
Hello world.
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 12 |
| Characters (no spaces) | 11 |
| Words | 2 |
| Sentences | 1 |
| Lines | 1 |
| Paragraphs | 1 |
| Reading time (min) | 1 |

---

## 2. Multiple sentences

**Input:**

```
The quick brown fox jumps over the lazy dog. It was a bright sunny day. The fox was very happy!
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 96 |
| Characters (no spaces) | 81 |
| Words | 19 |
| Sentences | 3 |
| Lines | 1 |
| Paragraphs | 1 |
| Reading time (min) | 1 |

---

## 3. Multiple paragraphs

**Input:**

```
First paragraph has two sentences. Here is the second one.

Second paragraph starts here. It also has two sentences.
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 91 |
| Characters (no spaces) | 76 |
| Words | 18 |
| Sentences | 4 |
| Lines | 3 |
| Paragraphs | 2 |
| Reading time (min) | 1 |

---

## 4. Empty input

**Input:**

```
(empty)
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 0 |
| Characters (no spaces) | 0 |
| Words | 0 |
| Sentences | 0 |
| Lines | 0 |
| Paragraphs | 0 |
| Reading time (min) | 0 |

---

## 5. Whitespace-only input

**Input:**

```
   (three spaces)
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 3 |
| Characters (no spaces) | 0 |
| Words | 0 |
| Sentences | 0 |
| Lines | 1 |
| Paragraphs | 0 |
| Reading time (min) | 0 |

---

## 6. Multiple lines (no blank line between)

**Input:**

```
Line one
Line two
Line three
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 23 |
| Characters (no spaces) | 20 |
| Words | 6 |
| Sentences | 0 |
| Lines | 3 |
| Paragraphs | 1 |
| Reading time (min) | 1 |

---

## 7. Tweet-length text (280 characters)

**Input:**

```
Just shipped a new feature! The team worked incredibly hard on this one. Thanks to everyone who tested, reported bugs, and gave feedback. You are the best. #buildinpublic #opensource
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 186 |
| Characters (no spaces) | 158 |
| Words | 28 |
| Sentences | 4 |
| Lines | 1 |
| Paragraphs | 1 |
| Reading time (min) | 1 |

---

## 8. Longer text — reading time

**Input:** A 450-word paragraph (abbreviated here for space)

```
[450 words of text...]
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Words | 450 |
| Reading time (min) | 3 |

> Reading time = ceil(450 / 200) = 3 minutes.

---

## 9. Text with abbreviations (sentence count caveat)

**Input:**

```
Dr. Smith arrived at 3 p.m. He met with Prof. Jones. They discussed the project.
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 78 |
| Characters (no spaces) | 66 |
| Words | 14 |
| Sentences | 5 |
| Lines | 1 |
| Paragraphs | 1 |
| Reading time (min) | 1 |

> **Note:** The sentence count is 5 because "Dr.", "p.m.", and "Prof." each contain sentence-ending punctuation, inflating the count beyond the actual 3 sentences.

---

## 10. Code comment block

**Input:**

```
// This function calculates the sum
// of all numbers in an array.
// Returns the total sum.
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
```

**Output:**

| Statistic | Value |
|-----------|-------|
| Characters | 108 |
| Characters (no spaces) | 88 |
| Words | 20 |
| Sentences | 3 |
| Lines | 5 |
| Paragraphs | 1 |
| Reading time (min) | 1 |
