# .gitignore Generator

Build a `.gitignore` file from pre-built project templates.

- Tool page: [.gitignore Generator](/tools/gitignore-generator)
- Examples: [.gitignore Generator examples](../examples/gitignore-generator.md)

## Purpose

The .gitignore Generator combines curated ignore templates for common project
types into a single `.gitignore` file. You select the types that apply to your
project and the tool concatenates the matching patterns, ready to paste into
your repository root.

## When to use it

- Starting a new project and needing a sensible `.gitignore` fast.
- Adding ignore rules for an additional stack to an existing project.
- Learning which files a given ecosystem conventionally ignores.

## How to use it

1. Select one or more project types from the grid.
2. Click **Generate**.
3. Copy the output and save it as `.gitignore` in your project root.

The **Load Example** button selects `node` and `python`, generates the file,
and shows a preview of the first patterns.

## Inputs

| Input | Description |
| --- | --- |
| Project types | One or more templates selected from the grid. |

The selectable templates are: **Node**, **Python**, **Java**, **PHP**,
**Ruby**, **Go**, **Csharp**, and **Default**.

## Options

- **Generate** — disabled until at least one type is selected; produces the
  combined file.
- **Load Example** — selects `node` + `python`, generates the output, and
  reveals the preview panel.
- **Clear** — deselects everything and empties the output.
- **Copy** — copies the generated file to the clipboard.
- **Preview** — shows the first ten unique patterns for the current selection.

## Output

A `.gitignore` file as plain text. Each selected type contributes a section:

```
# Node
<node template>

---

# Python
<python template>
```

Sections are separated by `---`. The footer reports the number of templates
selected and the total character count.

## Examples

See [.gitignore Generator examples](../examples/gitignore-generator.md) for a
Node+Python combination and a single-template output.

## Edge cases

- Generating with no types selected is blocked; the UI requires at least one
  selection and shows `Select at least one project type`.
- The **Default** template is a selectable option, but it has no entry in the
  pattern list used by the preview, so selecting only **Default** produces
  output without a preview.
- If every selected type were invalid, generation would fall back to the
  **Default** template. The UI only offers valid types, so this is not
  reachable through normal use.

## Limitations

- Only the bundled templates are available; you cannot add custom patterns or
  edit the generated text before copying.
- There is no awareness of nested `.gitignore` files or per-directory rules.
- The preview is capped at ten unique patterns and is not the full file.

## Privacy and security

Generation is fully client-side. Nothing is sent to a server and no project
files are read.

## Related tools

- [Git Command Generator](/tools/git-command-generator)
- [Git Diff Viewer](/tools/git-diff-viewer)
- [Git Branch Name Generator](/tools/git-branch-name-generator)
