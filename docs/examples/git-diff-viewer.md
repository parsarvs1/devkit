# Git Diff Viewer Examples

Inputs and outputs for the [Git Diff Viewer](/tools/git-diff-viewer). See the
[documentation](../tools/git-diff-viewer.md) for the full description.

## Example 1 — The built-in sample

Click **Load Example**. The input is a diff for `src/components/Button.tsx`.

**Summary produced:**

- `+21 additions`
- `-8 deletions`
- `1 file changed`

**Per-file view:** one file, shown with the path `unknown`, with a `+21` / `-8`
badge and a single hunk beginning `@@ -1,15 +1,20 @@`. The hunk lists the
changed lines: removed lines in red, added lines in green, and unchanged
context lines in plain text.

> The file path shows as `unknown` because the parser consumes the `index`
> line after `diff --git`, so it does not see a line starting with `a/` or
> `b/`. See the [documentation](../tools/git-diff-viewer.md).

## Example 2 — A two-file diff

**Input:**

```diff
diff --git a/README.md b/README.md
index 1111111..2222222 100644
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
 # Project
+Added a new section.
 Some text.

diff --git a/src/app.js b/src/app.js
index 3333333..4444444 100644
--- a/src/app.js
+++ b/src/app.js
@@ -10,4 +10,4 @@ function main() {
-  console.log("old");
+  console.log("new");
 }
```

**Summary produced:** `2 files changed, 2 additions, 1 deletion`.

**Per-file view:** two files, both shown as `unknown`, one with `+1` and the
other with `+1` / `-1`. Because both share the path `unknown`, they also share
an expand/collapse state.

## Example 3 — A diff with no changes

**Input:**

```diff
diff --git a/empty.txt b/empty.txt
index 1111111..2222222 100644
--- a/empty.txt
+++ b/empty.txt
```

**Summary produced:** `No changes`.

## Example 4 — A binary file

**Input:**

```diff
diff --git a/logo.png b/logo.png
index 1111111..2222222 100644
Binary files a/logo.png and b/logo.png differ
```

**Expected behavior:** the file is shown with the path `unknown` and no hunks,
because the viewer does not render binary content.

## Example 5 — Input that is not a diff

**Input:** `just some text`

**Expected behavior:** the right panel shows the empty state ("No diff to
display"). The parser is lenient and does not raise an error for unrecognized
input.

## How to produce input

- `git diff` — unstaged changes.
- `git diff --staged` — staged changes.
- `git show` — the last commit.
- `git diff <commit1> <commit2>` — two commits.
- `git diff > changes.patch` — save to a file.
