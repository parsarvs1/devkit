function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function stripCodeBlocks(input: string): string {
  // Remove fenced code blocks so their contents are not parsed as prose
  // (matches either a complete ```lang ... ``` block, or a lone opening fence).
  return input.replace(/```[\s\S]*?```/g, " ").replace(/```/g, " ");
}

function stripInlineCode(input: string): string {
  return input.replace(/`[^`]*`/g, " ");
}

function stripEmoticons(input: string): string {
  // Remove emoticons like :-) :-( ;) :D =( so their unbalanced parens
  // don't get mistaken for broken Markdown links.
  return input.replace(/[:;=8xXB]-?[()OoPDdS\\\/|]/g, "");
}

export function formatMarkdown(input: string): string {
  // Basic Markdown formatter
  // Wrap paragraphs with <p> tags
  const paragraphs = input.split(/\n\s*\n/);
  let formatted = "";

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;

    // Handle headers
    if (trimmed.startsWith("# ")) {
      formatted += `<h1>${escapeHtml(trimmed.substring(2))}</h1>\n\n`;
    } else if (trimmed.startsWith("## ")) {
      formatted += `<h2>${escapeHtml(trimmed.substring(3))}</h2>\n\n`;
    } else if (trimmed.startsWith("### ")) {
      formatted += `<h3>${escapeHtml(trimmed.substring(4))}</h3>\n\n`;
    } else if (trimmed.startsWith("#### ")) {
      formatted += `<h4>${escapeHtml(trimmed.substring(5))}</h4>\n\n`;
    } else if (trimmed.startsWith("##### ")) {
      formatted += `<h5>${escapeHtml(trimmed.substring(6))}</h5>\n\n`;
    } else if (trimmed.startsWith("###### ")) {
      formatted += `<h6>${escapeHtml(trimmed.substring(7))}</h6>\n\n`;
    } else {
      // Wrap paragraph in <p> tag
      formatted += `<p>${escapeHtml(trimmed)}</p>\n\n`;
    }
  }

  return formatted.trim();
}

export function getMarkdownExample(): string {
  return `# Markdown Example

## Features

- **Bold text** and *italic text*
- [Links](https://example.com)
- \`inline code\`

### Code Block

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists

1. First item
2. Second item
3. Third item

- Bullet point 1
- Bullet point 2

### Tables

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

> This is a blockquote

**Strong emphasis**
*Weak emphasis*
`;
}

export function validateMarkdown(input: string): { isValid: boolean; error?: string } {
  // Basic Markdown validation
  // Check for balanced brackets in links
  const linkPattern = /\[(.*?)\]\((.*?)\)/g;
  let match;

  while ((match = linkPattern.exec(input)) !== null) {
    // Link validation - basic check for valid format
    const [, text, url] = match;
    if (!text || !url) {
      return { isValid: false, error: "Invalid link format: missing text or URL" };
    }
  }

  // Check for unclosed code blocks by counting fences (``` or ~~~).
  // A document is balanced only if every opening fence has a closing one.
  const fenceCount = (input.match(/^[ \t]*(`{3,}|~{3,})/gm) || []).length;
  if (fenceCount % 2 !== 0) {
    return { isValid: false, error: "Unclosed code block" };
  }

  // Check for unbalanced parentheses in links and images, ignoring any
  // parentheses that appear inside code spans, fenced code blocks, or
  // emoticons (a bare ":-)" should not look like a broken link).
  const prose = stripEmoticons(stripInlineCode(stripCodeBlocks(input)));
  const openParens = (prose.match(/\(/g) || []).length;
  const closeParens = (prose.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    return { isValid: false, error: "Unbalanced parentheses in Markdown" };
  }

  return { isValid: true };
}
