# Git Branch Name Generator Examples

Inputs and outputs for the [Git Branch Name Generator](/tools/git-branch-name-generator).
See the [documentation](../tools/git-branch-name-generator.md) for the full
description.

## Example 1 — A feature branch

**Inputs:**

| Field | Value |
| --- | --- |
| Branch type | `feature` |
| Ticket / issue ID | *(empty)* |
| Description | `Add user authentication` |
| Separator | `/` |

**Generated branch name:**

```
feature/add-user-authentication
```

## Example 2 — A ticketed feature branch

**Inputs:**

| Field | Value |
| --- | --- |
| Branch type | `feature` |
| Ticket / issue ID | `JIRA-123` |
| Description | `Add user authentication` |
| Separator | `/` |

**Generated branch name:**

```
feature/JIRA-123-add-user-authentication
```

## Example 3 — A ticketed fix with a dash separator

**Inputs:**

| Field | Value |
| --- | --- |
| Branch type | `fix` |
| Ticket / issue ID | `BUG 42` |
| Description | `Fix login bug` |
| Separator | `-` |

**Generated branch name:**

```
fix-BUG42-fix-login-bug
```

The space in `BUG 42` is removed, leaving `BUG42`.

## Example 4 — A hotfix with no ticket

**Inputs:**

| Field | Value |
| --- | --- |
| Branch type | `hotfix` |
| Ticket / issue ID | *(empty)* |
| Description | `Patch payment gateway` |
| Separator | `/` |

**Generated branch name:**

```
hotfix/patch-payment-gateway
```

## Example 5 — Special characters are stripped

**Inputs:**

| Field | Value |
| --- | --- |
| Branch type | `docs` |
| Ticket / issue ID | *(empty)* |
| Description | `Update README (v2.0)` |
| Separator | `/` |

**Generated branch name:**

```
docs/update-readme-v20
```

The parentheses are removed and the dot in `v2.0` is removed, leaving `v20`.

## Example 6 — No description

**Inputs:** description left empty, with any other fields set.

**Expected behavior:** the generated name is empty. A description is required
to produce a branch name.

## Example 7 — A description made only of symbols

**Inputs:**

| Field | Value |
| --- | --- |
| Branch type | `feature` |
| Description | `@@@` |
| Separator | `/` |

**Generated branch name:**

```
feature/
```

All symbols are stripped, leaving an empty slug and a trailing separator.

## Copying and clearing

- **Copy** copies the generated name.
- **Clear** resets the type to `feature` and empties the ticket, description,
  and name.
