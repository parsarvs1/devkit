# Password Strength Analyzer — Examples

Practical examples for the [Password Strength Analyzer](/tools/password-strength). See the [full documentation](../tools/password-strength.md).

All examples are illustrative only — do not adopt them as real passwords.

## Example ratings at a glance

| Password | Label | Meter | Score breakdown |
|---|---|---|---|
| *(empty)* | Empty | 0/4 | No password entered. |
| `abc` | Very Weak | 1/4 | Shorter than 8 characters — rated Very Weak immediately. |
| `aaaaaaaa` | Weak | 1/4 | 2 points (length ≥ 8, lowercase) − 1 (repeat `aaa…`) = 1. |
| `qwerty123` | Weak | 1/4 | 3 points (length ≥ 8, lowercase, digit) − 3 (common word) − 2 (sequence `qwer`) = −2 → Weak. |
| `abcdefgh` | Weak | 1/4 | 2 points (length ≥ 8, lowercase) − 2 (sequence `abcd`) = 0 → Weak. |
| `P@ssw0rd` | Medium | 2/4 | 4 points (length ≥ 8, uppercase, digit, special); the common-word check matches the literal word `password`, not this spelling, so no penalty. |
| `Tr0ub4dor&3` | Medium | 2/4 | 4 points (length ≥ 8, uppercase, digit, special); only 11 characters, so no 12-character point. |
| `Xk9#mQ2$vL7&pR4!` | Very Strong | 4/4 | 7 points (length ≥ 8/12/16 = 3, plus 4 character classes); no penalties. |

## Example 1: Empty input

**Input:** *(nothing typed)*

**Output:** label **Empty**, meter 0/4, no recommendations listed.

## Example 2: A short password

**Input:** `abc`

**Output:** label **Very Weak**, meter 1/4. Any password under 8 characters is rated Very Weak regardless of variety — character classes are not even scored.

**Checks passed:** none of the six.

## Example 3: A long but patterned password

**Input:** `abcdefgh`

**Output:** label **Weak**, meter 1/4.

**Score:** +1 (≥ 8 chars), +1 (lowercase), −2 (sequence `abcd`) = 0 → Weak.

**Checks passed:** "At least 8 characters", "Contains lowercase letters".

**Recommendations:** use at least 12 characters; add uppercase letters; add numbers; add special characters.

## Example 4: A "clever" password that still scores Medium

**Input:** `P@ssw0rd`

**Output:** label **Medium**, meter 2/4.

**Score:** +1 (≥ 8 chars), +1 (uppercase), +1 (digit), +1 (special) = 4 → Medium. The common-word penalty only matches the literal string `password`, so the substitutions avoid it — but the password is still short and based on a dictionary word, which real attackers try first.

**Checks passed:** all except "At least 12 characters".

## Example 5: A strong password

**Input:** `Xk9#mQ2$vL7&pR4!`

**Output:** label **Very Strong**, meter 4/4.

**Score:** +1 (≥ 8), +1 (≥ 12), +1 (≥ 16), +1 (lowercase), +1 (uppercase), +1 (digit), +1 (special) = 7 → Very Strong. No common word, sequence, or repeat penalties.

**Checks passed:** all six.

**Recommendations:** "Great! Your password meets all basic strength requirements."

## Example 6: Common word with extras

**Input:** `qwerty123`

**Output:** label **Weak**, meter 1/4.

**Score:** +1 (≥ 8), +1 (lowercase), +1 (digit) = 3; −3 (starts with `qwerty`), −2 (sequence `qwer`) = −2 → Weak. Adding numbers to a well-known keyboard walk does not make a password strong.

## Using the tool with the generator

Generate a password with the [Password Generator](/tools/password-generator), paste it here, and confirm the two tools agree: a 16-character all-classes password rates **Very Strong** in both. If you are choosing a password manually, iterate here until you reach **Strong** or **Very Strong** with all six checks passing.
