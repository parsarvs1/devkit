# Password Generator

Generate strong random passwords securely in your browser. [Open the tool](/tools/password-generator) · [Examples](../examples/password-generator.md)

## Purpose

Create cryptographically random passwords using your browser's secure random number generator (Web Crypto API). You control the length and which character classes are included, and a built-in strength meter shows how the generated password scores. The password never leaves your browser.

## When to use it

- You need a new password for a development account, a test profile, or a sandbox environment.
- You want to see how length and character variety affect password strength.
- You need many passwords quickly with copy-to-clipboard convenience.

## How to use it

1. Adjust **Password Length** with the slider (8–64).
2. Toggle the character classes you want: **Uppercase letters**, **Numbers**, **Symbols** (all on by default). Lowercase letters are always included.
3. Click **Generate Password**.
4. The password appears in the output box with a **Password Strength** meter below it. Click **Copy** to copy it.

## Inputs

This tool takes no text input — the password is generated, not derived. Your configuration is:

## Options

| Option | Default | Description |
|---|---|---|
| Password Length | 16 | Slider from 8 to 64 characters. |
| Uppercase letters | On | Adds `A–Z`. |
| Numbers | On | Adds `0–9`. |
| Symbols | On | Adds `!@#$%^&*()_+-=[]{};:,.<>?` |

Lowercase letters (`a–z`) are always included; at least one optional class must remain enabled.

## Output

- The generated password, displayed in a monospace box.
- A **Password Strength** meter with one of four labels:

| Label | Rule |
|---|---|
| Weak | Score ≤ 2 |
| Fair | Score ≤ 4 |
| Strong | Score ≤ 5 |
| Very Strong | Score ≥ 6 |

The score gives the most weight to length (reaching 8, 12, 16, and 24 characters each add a point), plus one point each for including uppercase, numbers, and symbols.

## Examples

- Length 8, lowercase only → output matches `^[a-z]{8}$`, e.g. `kxmqvtwj` — rated **Weak** (length 8 gives 1 point, lowercase-only adds none).
- Length 16 with all classes → typically rated **Very Strong** (3 length points + 4 class points = 7).

See [Examples](../examples/password-generator.md) for more configurations. Because generation is random, your exact password will differ every time.

## Edge cases

- **All optional classes off** — the Generate button is disabled and the tool shows `Select at least one character set besides lowercase.`
- **Length bounds** — the slider cannot go below 8 or above 64.
- **Insecure context** — if `crypto.getRandomValues` is unavailable (non-secure context), the tool shows `Secure generation is unavailable in this context (secure context required).`
- Each click produces a completely new password; the previous one is replaced.

## Limitations

- **Passwords are random** — the tool cannot generate memorable passphrases or pronounceable passwords, and it cannot enforce rules beyond length and character classes (e.g. "must contain exactly two digits").
- **Minor modulo bias** — random 32-bit values are mapped into the character set with a modulo operation, which introduces a negligible bias for the set sizes used. It is not significant for password generation at these lengths.
- The strength meter is a simple heuristic (see [Password Strength Analyzer](/tools/password-strength) for the fuller analysis); a "Very Strong" rating means long and varied, not uncrackable.
- The tool cannot check whether a generated password has appeared in a known data breach.

## Privacy and security

- Passwords are generated **locally** using `crypto.getRandomValues`; they are never sent to a server and never stored.
- The generated password is shown in plain text on your screen while the page is open. Avoid generating passwords on shared or recorded screens.
- For real accounts, use a password manager to generate, store, and autofill passwords; do not reuse generated passwords across sites.

## Related tools

- [Password Strength Analyzer](/tools/password-strength) — analyze an existing password's strength and get improvement recommendations.
