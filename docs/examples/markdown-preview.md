# Markdown Previewer — Examples

## 1. Headings

**Markdown input:**

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

**Rendered output:**

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## 2. Bold and italic

**Markdown input:**

```markdown
This is **bold** and this is *italic*.
You can also use __bold__ and _italic_.
This is ***bold and italic***.
```

**Rendered output:**

This is **bold** and this is *italic*.
You can also use __bold__ and _italic_.
This is ***bold and italic***.

---

## 3. Lists

**Markdown input:**

```markdown
- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

1. First
2. Second
3. Third
```

**Rendered output:**

- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

1. First
2. Second
3. Third

---

## 4. Links

**Markdown input:**

```markdown
[Visit DevKit](https://devkit.pars-paris1.workers.dev/)
```

**Rendered output:**

[Visit DevKit](https://devkit.pars-paris1.workers.dev/)

> Links open in a new browser tab.

---

## 5. Code

**Markdown input:**

```markdown
Inline: `const x = 42;`

Block:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
```

**Rendered output:**

Inline: `const x = 42;`

Block:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

---

## 6. Blockquote

**Markdown input:**

```markdown
> This is a blockquote.
> It can span multiple lines.
```

**Rendered output:**

> This is a blockquote.
> It can span multiple lines.

---

## 7. Horizontal rule

**Markdown input:**

```markdown
Above the rule.

---

Below the rule.
```

**Rendered output:**

Above the rule.

---

Below the rule.

---

## 8. Table (GFM)

**Markdown input:**

```markdown
| Name | Role | Language |
|------|------|----------|
| Alice | Dev | TypeScript |
| Bob | Design | CSS |
| Carol | PM | English |
```

**Rendered output:**

| Name | Role | Language |
|------|------|----------|
| Alice | Dev | TypeScript |
| Bob | Design | CSS |
| Carol | PM | English |

---

## 9. Default content (loaded on page open)

The editor loads with this sample Markdown:

```markdown
# Welcome to DevKit

Write **Markdown** on the left and see the preview on the right.

## Features

- Live preview
- Headings
- **Bold** and *italic* text
- Lists
- Links
- Code blocks

> Simple Markdown previewing directly in your browser.
```

**Rendered output:**

# Welcome to DevKit

Write **Markdown** on the left and see the preview on the right.

## Features

- Live preview
- Headings
- **Bold** and *italic* text
- Lists
- Links
- Code blocks

> Simple Markdown previewing directly in your browser.

---

## 10. Empty editor

When you click **Clear** and the editor is empty, the preview shows:

```
Markdown preview will appear here...
```
