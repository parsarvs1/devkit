# Git Diff Viewer

Parse a unified `git diff` and visualize its changes file by file.

- Tool page: [Git Diff Viewer](/tools/git-diff-viewer)
- Examples: [Git Diff Viewer examples](../examples/git-diff-viewer.md)

## Purpose

Git Diff Viewer takes raw `git diff` output and turns it into a readable,
color-coded view: a summary of additions and deletions, a per-file breakdown,
and expandable hunks. It helps you review changes before committing or sharing
a patch.

## When to use it

- Reviewing unstaged or staged changes before a commit.
- Inspecting a diff you received from a teammate or a CI log.
- Counting additions and deletions across a change set.

## How to use it

1. Paste a unified diff into the **Input** panel (or click **Load Example**).
2. The summary and per-file breakdown appear on the right as you type.
3. Click a file header to collapse or expand its hunks.
4. Use **Expand all** / **Collapse all** to control every file at once.
5. **Copy Diff** copies the original input; **Clear** empties it.

A sample diff is loaded automatically the first time the page opens.

## Inputs

| Input | Description |
| --- | --- |
| Diff | Unified diff text, typically the output of `git diff`, `git diff --staged`, `git show`, or `git diff <commit1> <commit2>`. |

## Options

- **Load Example** — replaces the input with a sample diff.
- **Clear** — empties the input and the parsed view.
- **Expand all** / **Collapse all** — toggle every file's hunks.
- **Copy Diff** — copies the raw input text.
- **Share** — shares the current diff through the app's share control.

## Output

- **Summary** — total additions, total deletions, number of files changed, and
  a sentence such as `1 file changed, 21 additions, 8 deletions`.
- **Per file** — the file path, its own `+additions` / `-deletions` counts, and
  its hunks. For standard `git diff` output the path is shown as `unknown`
  (see Edge cases).
- **Per hunk** — the `@@` header plus each line, colored green for additions,
  red for deletions, and plain for context. Line numbers are shown where they
  can be derived.

## Examples

See [Git Diff Viewer examples](../examples/git-diff-viewer.md) for a
multi-hunk diff and its parsed output.

## Edge cases

- The parser is lenient. Input that is not a recognizable diff generally
  produces an empty view ("No diff to display") rather than an error.
- `index`, `new file mode`, `deleted file mode`, `mode`, and
  `\ No newline at end of file` lines are skipped.
- `Binary files` lines create a file entry named `unknown` with no hunks.
- **File paths are usually `unknown`.** The parser reads the two lines
  immediately after a `diff --git` line and strips a leading `a/` or `b/`.
  Standard `git diff` output inserts an `index ...` line between
  `diff --git` and `--- a/...`, so the two lines it reads do not start with
  `a/` or `b/` and both resolve to `unknown`. Supplying a diff that omits the
  `index` line would let the paths parse correctly.
- Displayed line numbers are derived heuristically from the line content and
  are best-effort, not guaranteed to match the original file.
- Files are keyed by their path, so when multiple files are all named `unknown`
  they share one expand/collapse state.

## Limitations

- Unified diff format only; other patch formats are not supported.
- No word-level or character-level highlighting.
- File paths are not extracted from standard `git diff` output; they display as
  `unknown`.
- The viewer cannot apply, reverse, or save the diff; it only displays it.
- Very large diffs may make the page slow to render.

## Privacy and security

Parsing happens in the browser. The diff is never uploaded unless you use the
**Share** control, which encodes it in the share link. Avoid sharing diffs that
contain secrets.

## Related tools

- [Git Command Generator](/tools/git-command-generator)
- [Git Branch Name Generator](/tools/git-branch-name-generator)
- [.gitignore Generator](/tools/gitignore-generator)
