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
      formatted += `<h1>${trimmed.substring(2)}</h1>\n\n`;
    } else if (trimmed.startsWith("## ")) {
      formatted += `<h2>${trimmed.substring(3)}</h2>\n\n`;
    } else if (trimmed.startsWith("### ")) {
      formatted += `<h3>${trimmed.substring(4)}</h3>\n\n`;
    } else if (trimmed.startsWith("#### ")) {
      formatted += `<h4>${trimmed.substring(5)}</h4>\n\n`;
    } else if (trimmed.startsWith("##### ")) {
      formatted += `<h5>${trimmed.substring(6)}</h5>\n\n`;
    } else if (trimmed.startsWith("###### ")) {
      formatted += `<h6>${trimmed.substring(7)}</h6>\n\n`;
    } else {
      // Wrap paragraph in <p> tag
      formatted += `<p>${trimmed}</p>\n\n`;
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

`;}

export function validateMarkdown(input: string): { isValid: boolean; error?: string } {
  // Basic Markdown validation
  // Check for balanced brackets in links
  const linkPattern = /\[(.*?)\]\((.*?)\)/g;
  let match;
  let openBrackets = 0;

  while ((match = linkPattern.exec(input)) !== null) {
    // Link validation - basic check for valid format
    const [fullMatch, text, url] = match;
    if (!text || !url) {
      return { isValid: false, error: "Invalid link format: missing text or URL" };
    }
  }

  // Check for unclosed code blocks
  const codeBlockPattern = /\`\`\`(\w*)\s*\n.*?\n\`\`\`/gs;
  const codeBlocks = input.match(codeBlockPattern);

  if (codeBlocks) {
    for (const block of codeBlocks) {
      const languageMatch = block.match(/^\`\`\`(\w*)/m);
      const closingMatch = block.match(/\`\`\`$/);
      if (!closingMatch) {
        return { isValid: false, error: "Unclosed code block" };
      }
    }
  }

  // Check for unbalanced parentheses in links and images
  const openParens = (input.match(/\(/g) || []).length;
  const closeParens = (input.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    return { isValid: false, error: "Unbalanced parentheses in Markdown" };
  }

  return { isValid: true };
}