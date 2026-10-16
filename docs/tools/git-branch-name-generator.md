# Git Branch Name Generator

Turn a task description into a consistent `git` branch name.

- Tool page: [Git Branch Name Generator](/tools/git-branch-name-generator)
- Examples: [Git Branch Name Generator examples](../examples/git-branch-name-generator.md)

## Purpose

The Git Branch Name Generator produces clean, lowercase, hyphenated branch
names from a branch type, an optional ticket ID, and a short description. It
applies a slug transformation so the result is safe and predictable to type.

## When to use it

- Naming a feature or fix branch before you create it.
- Enforcing a consistent branch-naming convention across a team.
- Including a ticket/issue ID in the branch name.

## How to use it

1. Choose a branch type.
2. Optionally enter a ticket or issue ID.
3. Enter a description.
4. Choose a separator (`/` or `-`).
5. Copy the generated name.

The name updates as you type. The **Clear** button resets the form.

## Inputs

| Input | Description |
| --- | --- |
| Branch type | One of `feature`, `fix`, `hotfix`, `docs`, `chore`, `refactor`, `test`, or `release`. |
| Ticket / issue ID | Optional. Whitespace is removed; the value is prefixed with a hyphen. |
| Description | Required. Converted to a slug. |
| Separator | `/` or `-`, placed between the type and the rest of the name. |

## Options

- **Separator** — choose `/` (for example `feature/JIRA-123-add-login`) or `-`
  (for example `feature-JIRA-123-add-login`).
- **Copy** — copies the generated name to the clipboard.
- **Clear** — resets the type to `feature` and empties the ticket, description,
  and name.

## Output

A branch name string. The description is slugified by:

1. Lowercasing and trimming.
2. Removing every character that is not a letter, digit, space, or hyphen.
3. Replacing runs of spaces with a single hyphen.
4. Collapsing consecutive hyphens.
5. Trimming leading and trailing hyphens.

The final name is `<type><separator><ticket>-<slug>`, with any run of two or
more hyphens collapsed to one.

## Examples

See [Git Branch Name Generator examples](../examples/git-branch-name-generator.md)
for a feature branch, a ticketed fix, and a hotfix.

## Edge cases

- An empty description produces no branch name, even if a ticket ID is present.
- A description made only of symbols (for example `@@@`) slugifies to an empty
  string, leaving a trailing separator such as `feature/`.
- Ticket whitespace is stripped, so `JIRA 123` becomes `JIRA123`.
- Characters such as `_`, `.`, and `/` are removed from the description rather
  than converted to hyphens.
- Only one ticket ID can be supplied; there is no array of IDs.

## Limitations

- The description is the only required input and is not validated beyond being
  non-empty.
- The slug is derived purely from the description; no words are expanded or
  abbreviated.
- The tool does not check whether the branch already exists in your repository.

## Privacy and security

The generator runs entirely in the browser. The branch name is never sent
anywhere.

## Related tools

- [Git Command Generator](/tools/git-command-generator)
- [Git Diff Viewer](/tools/git-diff-viewer)
