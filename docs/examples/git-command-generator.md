# Git Command Generator Examples

Commands you can build with the [Git Command Generator](/tools/git-command-generator).
See the [documentation](../tools/git-command-generator.md) for the full
description.

## Example 1 — Push a new branch (the built-in example)

**Command:** `git push`

**Flags:** `-u`

**Variables:**

| Variable | Value |
| --- | --- |
| remote | origin |
| branch | main |

**Generated command:**

```
git push origin main -u
```

## Example 2 — List all branches

**Command:** `git branch`

**Flags:** `-a`

**Generated command:**

```
git branch -a
```

## Example 3 — Compact history

**Command:** `git log`

**Flags:** `--oneline`, `--graph`

**Generated command:**

```
git log --oneline --graph
```

## Example 4 — Create and switch to a branch

**Command:** `git checkout -b`

**Variables:**

| Variable | Value |
| --- | --- |
| name | feature/login |

**Generated command:**

```
git checkout -b feature/login
```

## Example 5 — Stage every change

**Command:** `git add`

**Flags:** `-A`

**Variables:**

| Variable | Value |
| --- | --- |
| file | . |

**Generated command:**

```
git add . -A
```

## Example 6 — Set your Git identity

**Command:** `git config`

**Variables:**

| Variable | Value |
| --- | --- |
| key | user.name |
| value | Parsa |

**Generated command:**

```
git config --global user.name Parsa
```

## Example 7 — Show only a summary of changes

**Command:** `git diff`

**Flags:** `--stat`

**Generated command:**

```
git diff --stat
```

## Example 8 — A variable left empty

**Command:** `git checkout`

**Variables:** `branch` left empty.

**Generated command:**

```
git checkout <branch>
```

Because the variable is empty, its placeholder is not replaced.
