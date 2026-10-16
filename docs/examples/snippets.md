# DevKit Snippets — Examples

## Basic usage

### Example 1: Create a snippet

**Action:**
1. Click **New Snippet**.
2. Fill in the fields:
   - **Title:** `Fetch API`
   - **Language:** `JavaScript`
   - **Category:** `API`
   - **Code:**
     ```javascript
     const response = await fetch("/api/users");
     const data = await response.json();
     console.log(data);
     ```
3. Click **Save Snippet**.

**Expected result:** The snippet appears at the top of the snippets list with its title, language badge, category badge, and code preview.

### Example 2: Search for a snippet

**Action:** Type `fetch` in the search bar.

**Expected result:** Only snippets with "fetch" in their title, code, language, or category are displayed. The count updates to show the number of matching snippets.

### Example 3: Filter by language

**Action:** Select `TypeScript` from the language dropdown.

**Expected result:** Only snippets with the language "TypeScript" are shown.

### Example 4: Filter by category

**Action:** Select `React` from the category dropdown.

**Expected result:** Only snippets with the category "React" are shown.

### Example 5: Copy a snippet

**Action:** Click **Copy** on a snippet card.

**Expected result:** The snippet's code is copied to the clipboard. The button shows "Copied!" with a checkmark for 1.5 seconds.

### Example 6: Delete a snippet

**Action:** Click **Delete** on a snippet card.

**Expected result:** The snippet is removed from the list and from localStorage.

## Built-in examples

### Example 7: Load the example snippets

**Action:** Click **Examples**.

**Expected result:** Three example snippets are loaded, replacing any existing snippets:

| Title | Language | Category |
|-------|----------|----------|
| Fetch API | JavaScript | API |
| React useState | TypeScript | React |
| Next.js Server Component | TypeScript | Next.js |

## Validation

### Example 8: Save with empty title

**Action:**
1. Click **New Snippet**.
2. Leave the title empty.
3. Enter some code.
4. Click **Save Snippet**.

**Expected result:** The editor shows the error "Title is required." below the title field. The snippet is not saved.

### Example 9: Save with empty code

**Action:**
1. Click **New Snippet**.
2. Enter a title.
3. Leave the code empty.
4. Click **Save Snippet**.

**Expected result:** The editor shows the error "Code is required." below the code field. The snippet is not saved.

## Default category

### Example 10: Save without a category

**Action:**
1. Click **New Snippet**.
2. Enter a title and code.
3. Leave the category field empty.
4. Click **Save Snippet**.

**Expected result:** The snippet is saved with the category "General".

## Practical scenarios

### Scenario 1: Save a React hook pattern

**Input:**
- **Title:** `useLocalStorage`
- **Language:** `TypeScript`
- **Category:** `React`
- **Code:**
  ```typescript
  import { useState, useEffect } from "react";

  function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
  }
  ```

### Scenario 2: Save a SQL query

**Input:**
- **Title:** `Top users by revenue`
- **Language:** `SQL`
- **Category:** `Database`
- **Code:**
  ```sql
  SELECT u.id, u.name, SUM(o.total) AS revenue
  FROM users u
  JOIN orders o ON o.user_id = u.id
  GROUP BY u.id, u.name
  ORDER BY revenue DESC
  LIMIT 10;
  ```

### Scenario 3: Organize by project

Create categories for each project you work on:

| Category | Example snippets |
|----------|-----------------|
| `API` | Fetch wrapper, error handling, auth headers |
| `React` | Custom hooks, component patterns |
| `Database` | Common queries, migrations |
| `DevOps` | Docker commands, CI/CD scripts |

## Persistence

### Example 11: Snippets survive page refresh

**Action:**
1. Create a snippet.
2. Refresh the browser page.

**Expected result:** The snippet is still present. It was saved to `localStorage` under the key `devkit-snippets`.

### Example 12: Clear all snippets

**Action:** Click **Clear all**.

**Expected result:** All snippets are removed from the list and from localStorage. The empty state is shown with a "Create Snippet" button.
