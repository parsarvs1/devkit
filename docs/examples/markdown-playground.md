# Markdown Playground — Examples

## 1. Example content (click "Example" button)

Clicking the **Example** button loads this Markdown:

```markdown
# DevKit Markdown

Welcome to **DevKit Markdown Playground**.

## Features

- Live Markdown preview
- Headings
- **Bold text**
- *Italic text*
- `inline code`
- Code blocks
- Links
- Lists
- Blockquotes

### Code Example

```typescript
const greeting = "Hello DevKit";

console.log(greeting);
```

> Build faster. Write better code.

[Visit DevKit](https://devkit.pars-paris1.workers.dev/)
```

**Preview output:**

# DevKit Markdown

Welcome to **DevKit Markdown Playground**.

## Features

- Live Markdown preview
- Headings
- **Bold text**
- *Italic text*
- `inline code`
- Code blocks
- Links
- Lists
- Blockquotes

### Code Example

```typescript
const greeting = "Hello DevKit";

console.log(greeting);
```

> Build faster. Write better code.

[Visit DevKit](https://devkit.pars-paris1.workers.dev/)

---

## 2. Strikethrough

**Markdown input:**

```markdown
This is ~~deleted~~ text.
```

**Preview output:**

This is ~~deleted~~ text.

---

## 3. Nested lists

**Markdown input:**

```markdown
1. First item
   - Sub-item A
   - Sub-item B
2. Second item
   1. Nested numbered
   2. Another nested
3. Third item
```

**Preview output:**

1. First item
   - Sub-item A
   - Sub-item B
2. Second item
   1. Nested numbered
   2. Another nested
3. Third item

---

## 4. Code block with language label

**Markdown input:**

````markdown
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```
````

**Preview output:**

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

---

## 5. Blockquote with multiple paragraphs

**Markdown input:**

```markdown
> The first paragraph of a quote.
>
> The second paragraph of a quote.
```

**Preview output:**

> The first paragraph of a quote.
>
> The second paragraph of a quote.

---

## 6. Source view toggle

When you switch to **Source** view, the right pane displays the raw Markdown exactly as typed:

```markdown
# My Document

This is **bold** and this is *italic*.

- Point one
- Point two
```

---

## 7. Quick reference (built-in)

The bottom section of the Playground shows these syntax reminders:

| Element | Syntax |
|---------|--------|
| Heading | `# Heading` |
| Bold | `**bold**` |
| Italic | `*italic*` |
| Code | `` `code` `` |

---

## 8. Copy to clipboard

1. Enter any Markdown in the editor.
2. Click **Copy**.
3. The button briefly shows **"Copied!"**.
4. Paste the raw Markdown into any application.

---

## 9. Empty editor

When the editor is empty:

- **Preview pane** shows: `Markdown preview will appear here...`
- **Source pane** shows: `Markdown source will appear here...`
- **Copy** and **Clear** buttons are disabled.

---

## 10. Link handling

**Markdown input:**

```markdown
[OpenAI](https://openai.com)
```

**Preview output:**

[OpenAI](https://openai.com)

> Links open in a new browser tab with `rel="noopener noreferrer"`.
