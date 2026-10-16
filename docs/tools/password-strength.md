# Password Strength Analyzer

Analyze the strength of a password directly in your browser. [Open the tool](/tools/password-strength) · [Examples](../examples/password-strength.md)

## Purpose

Get an immediate, heuristic assessment of a password: an overall strength label, a four-segment meter, a checklist of security requirements, and personalized recommendations. The analysis runs entirely in your browser — the password is never transmitted.

## When to use it

- You are choosing a password and want a quick sanity check before committing to it.
- You are validating that a password policy (length, character classes) is met.
- You want to understand *why* a password scores poorly (common words, sequences, repeats).

## How to use it

1. Type or paste a password into the **Password** field. Analysis updates as you type.
2. Read the **Password Strength** label and meter.
3. Review the **Security Checks** checklist to see which requirements pass.
4. Follow the **Recommendations**, which adapt to your specific password.
5. Use the eye icon to toggle visibility, **Copy** to copy the password, or **Clear** to reset.

## Inputs

| Input | Required | Description |
|---|---|---|
| Password | Yes | Any text. An empty field shows the state **Empty**. |

## Options

| Option | Description |
|---|---|
| Visibility toggle | Show or hide the typed password. |
| Copy | Copy the password to the clipboard. |
| Clear | Empty the field and reset the analysis. |

## Output

### Strength label and meter

The password is scored and labeled as follows:

| Label | Score | Segment (of 4) |
|---|---|---|
| Empty | 0 | 0 |
| Very Weak | 1 | 1 |
| Weak | 1 | 1 |
| Medium | 2 | 2 |
| Strong | 3 | 3 |
| Very Strong | 4 | 4 |

### Scoring rules

Points are awarded for:

- **Length** — reaching 8, 12, and 16 characters (one point each).
- **Character variety** — containing lowercase letters, uppercase letters, numbers, and special characters (one point each).

Penalties are applied for:

- **Well-known passwords** — starting with `password`, `qwerty`, `123456`, `admin`, `letmein`, or `welcome` (case-insensitive): −3 points.
- **Sequences** — containing keyboard or numeric sequences such as `0123`, `1234`, `abcd`, `qwer`, `asdf`, or `zxcv` (case-insensitive): −2 points.
- **Repeated characters** — the same character three or more times in a row: −1 point.

Passwords shorter than 8 characters are always rated **Very Weak**, regardless of variety.

### Security checks

Six requirements are shown with pass/fail indicators:

1. At least 8 characters
2. At least 12 characters
3. Contains lowercase letters
4. Contains uppercase letters
5. Contains numbers
6. Contains special characters

### Recommendations

The panel lists exactly what your password is missing — e.g. "Use at least 12 characters", "Add uppercase letters" — and congratulates you when all basic requirements are met.

## Examples

| Password | Label | Meter | Why |
|---|---|---|---|
| *(empty)* | Empty | 0/4 | No password entered. |
| `abc` | Very Weak | 1/4 | Shorter than 8 characters. |
| `aaaaaaaa` | Weak | 1/4 | Repeated character penalty (−1). |
| `qwerty123` | Weak | 1/4 | Common-word (−3) and sequence (−2) penalties. |
| `abcdefgh` | Weak | 1/4 | Sequence penalty (−2). |
| `P@ssw0rd` | Medium | 2/4 | Four character classes, but only 8 characters long. |
| `Tr0ub4dor&3` | Medium | 2/4 | Good variety, but under 12 characters. |
| `Xk9#mQ2$vL7&pR4!` | Very Strong | 4/4 | 16+ characters with all four classes and no penalties. |

All examples above are illustrative only — do not adopt them as real passwords.

See [Examples](../examples/password-strength.md) for the detailed checklists behind these ratings.

## Edge cases

- **Empty input** — shows **Empty** with a 0/4 meter; no recommendations are listed.
- **Very short input** — anything under 8 characters is **Very Weak** immediately; character variety is not even scored.
- **"Clever" substitutions don't fool the common-word check** — the check matches the literal words only (`password`, not `p@ssw0rd`), so `P@ssw0rd` scores on its character classes; conversely, a password that literally starts with a common word is penalized however complex the rest is.
- **Penalties can push the score to zero or below** — the label then floors at **Weak** (score 1).
- **Non-ASCII characters** — letters with accents or other scripts count as special characters (they are non-alphanumeric), but no other script-specific rules apply.

## Limitations

- **This is a heuristic, not a guarantee.** The score reflects length, character variety, and a few well-known patterns. It does not compute true entropy, and it does not know about dictionary words beyond the short common list, leetspeak variants, or keyboard walks beyond the listed sequences.
- **No breach check.** The tool cannot tell you whether the password has appeared in a known data breach — use a breach-checking service for that.
- **Very Weak and Weak share the same meter level** (1/4) because both are assigned an internal score of 1; the label is the only difference.
- **Local-only analysis is a feature, not a security warranty.** Nothing is transmitted, but the password is still visible on screen while the page is open.

## Privacy and security

- The password is analyzed **locally** in your browser; it is not sent to a server by this tool.
- The password appears in plain text in the input (toggle the eye to hide it) and is held in component state while the page is open. Avoid analyzing passwords on shared or recorded screens.
- The **Copy** button places the password on your clipboard, where other applications may read it — clear the clipboard afterwards if needed.

## Related tools

- [Password Generator](/tools/password-generator) — generate a new strong password and see its strength rating as you configure it.
