# DevKit Snippets

## Purpose

A personal code snippet manager that lets you save, organize, search, and quickly reuse code snippets. Snippets are stored in the browser's `localStorage` and persist between sessions.

## When to use it

- You want to save frequently used code patterns for quick access.
- You need to organize code snippets by language and category.
- You want to search through your saved code without leaving the browser.
- You are building a personal library of reusable code.

## How to use it

1. Navigate to the [DevKit Snippets tool page](/tools/snippets).
2. Click **New Snippet** to open the editor.
3. Fill in the required fields:
   - **Title** (required): A descriptive name for the snippet.
   - **Language**: Select from JavaScript, TypeScript, Python, HTML, CSS, SQL, JSON, Bash, or Dart.
   - **Category**: A free-form category label (defaults to "General" if left empty).
   - **Code** (required): The actual code snippet.
4. Click **Save Snippet** to add it to your collection.
5. Use the **search bar** and **language/category filters** to find snippets.
6. Click **Copy** on any snippet to copy its code to the clipboard.
7. Click **Delete** to remove a snippet.
8. Click **Examples** to load the three built-in example snippets.
9. Click **Clear all** to remove all snippets.

## Inputs

### Snippet editor

| Input | Required | Description | Example |
|-------|----------|-------------|---------|
| Title | Yes | A descriptive name | `Fetch API` |
| Language | Yes | Programming language | `JavaScript` |
| Category | No | Organization category (defaults to "General") | `API` |
| Code | Yes | The code snippet | `const response = await fetch("/api/users");` |

### Search and filters

| Input | Description |
|-------|-------------|
| Search | Case-insensitive search across title, code, language, and category |
| Language filter | Dropdown of all languages present in saved snippets |
| Category filter | Dropdown of all categories present in saved snippets |

## Options

| Option | Description |
|--------|-------------|
| New Snippet | Opens the snippet editor |
| Save Snippet | Validates and saves the snippet |
| Cancel | Closes the editor without saving |
| Copy | Copies the snippet code to the clipboard |
| Delete | Removes the snippet permanently |
| Examples | Replaces all snippets with the three built-in examples |
| Clear all | Removes all snippets and clears localStorage |

## Output

Snippets are displayed as cards showing:
- Title
- Language badge
- Category badge
- Code preview (monospace, scrollable)

## Examples

See [Snippets Examples](../examples/snippets.md) for practical use cases.

## Edge cases

- **Empty title or code:** Saving with an empty title or code shows a validation error ("Title is required." or "Code is required.").
- **Empty category:** If the category field is left blank, it defaults to "General".
- **Corrupt localStorage:** If the stored data is malformed or fails validation, it is automatically removed and the tool falls back to the example snippets.
- **Storage full:** If `localStorage` is full or blocked, the tool continues to work in memory but data will not persist.
- **Duplicate IDs:** The ID generation uses `Date.now()` combined with a session counter to prevent collisions on rapid double-adds.

## Limitations

- Snippets are stored only in the browser's `localStorage`. They are not synced across devices or browsers.
- No export/import functionality (JSON, file download, etc.).
- No syntax highlighting — code is displayed as plain monospace text.
- No editing of existing snippets — you must delete and recreate.
- `localStorage` is typically limited to ~5 MB per origin.

## Privacy and security

- All snippet data is stored locally in the browser's `localStorage`. No data is sent to any server.
- **Warning:** Do not store sensitive information (passwords, API keys, tokens) in snippets, as `localStorage` is accessible to any JavaScript running on the page.
- Clearing browser data or site data will permanently delete all stored snippets.

## Related tools

- [Environment Variable Generator](env-generator.md) — for managing project configuration
- [UUID Generator](uuid-generator.md) — for generating unique identifiers
