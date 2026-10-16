# Git Command Generator

Assemble a `git` command from a curated catalog, flags, and variables.

- Tool page: [Git Command Generator](/tools/git-command-generator)
- Examples: [Git Command Generator examples](../examples/git-command-generator.md)

## Purpose

Git Command Generator helps you build correct `git` invocations without
memorizing syntax. You pick a command, toggle the flags it supports, fill in
its variables, and the tool produces the final command line.

## When to use it

- Recalling the exact syntax for a less common command such as `rebase`,
  `stash`, or `reset`.
- Discovering which flags a command supports.
- Producing a correctly ordered command with flags and arguments.

## How to use it

1. Use the search box or the category list to find a command.
2. Click the command to load it in the builder.
3. Toggle the flags you want.
4. Fill in the variables shown for that command.
5. Copy the generated command.

The tool loads an example (`git push -u origin main`) on first open. The
**Example** button restores it, and **Clear** resets the form.

## Inputs

| Input | Description |
| --- | --- |
| Search | Filters commands by name or description (case-insensitive). |
| Category | One of `All`, `General`, `Branching`, `Remote`, `History`, `Staging`, or `Config`. |
| Command | A command from the catalog. |
| Flags | Toggle buttons for the command's supported flags. |
| Variables | Text fields that replace placeholders such as `<branch>`. |

## Options

- **Flags** are rendered with a leading `-` in the UI and appended to the
  command separated by spaces.
- **Variables** replace the matching `<name>` placeholder. A variable is
  substituted only when its value is non-empty.
- **Copy Command** copies the generated command.
- **Example** reloads the default `git push -u origin main` example.
- **Clear** resets the category, search, selection, flags, and variables.

## Output

The full command string, for example:

```
git push origin main -u
```

The command panel also renders the command with a `git` prefix for display.

## Examples

See [Git Command Generator examples](../examples/git-command-generator.md) for
branching, remote, staging, and config commands.

## Edge cases

- A variable whose field is left empty leaves its placeholder in place (for
  example `git checkout <branch>`).
- Only the first occurrence of a placeholder is replaced.
- Flags are appended after variables, so a command with both ends with the
  flags (for example `git push origin main -u`).
- Flag values are stored with their dash included for most commands (`-a`,
  `--oneline`, `-A`, `--stat`), but the `stash` command's values are stored
  without one (`push`, `pop`, `list`, `apply`, `drop`). The UI shows a leading
  `-` for every flag, but `generateCommand` appends the value verbatim, so
  `stash` + `push` produces the valid `git stash push`.

## Limitations

- The catalog is curated and not exhaustive; niche or plugin-provided commands
  are not included.
- Flag combinations are not validated — the tool will happily combine flags
  that `git` may reject together.
- Variable values are not validated against the command's requirements.

## Privacy and security

Everything runs locally. The generated command is only copied to your
clipboard; no command is executed by this tool.

## Related tools

- [Git Diff Viewer](/tools/git-diff-viewer)
- [Git Branch Name Generator](/tools/git-branch-name-generator)
- [.gitignore Generator](/tools/gitignore-generator)
