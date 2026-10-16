# Password Generator — Examples

Practical examples for the [Password Generator](/tools/password-generator). See the [full documentation](../tools/password-generator.md).

Generation is random, so your exact output will differ every time — the examples below show the *shape* of output each configuration produces, plus one sample per configuration.

## Example 1: Short password, lowercase only

**Configuration:** Length `8`, Uppercase off, Numbers off, Symbols off.

**Sample output:** `kxmqvtwj`

**Properties:** always matches `^[a-z]{8}$`; rated **Weak** by the built-in meter (length 8 gives 1 point; no character-class points).

## Example 2: Default configuration

**Configuration:** Length `16`, Uppercase on, Numbers on, Symbols on.

**Sample output:** `T7#mQ2$vL9&pR4!`

**Properties:** 16 characters drawn from `a–z`, `A–Z`, `0–9`, and `!@#$%^&*()_+-=[]{}|;:,.<>?`; rated **Very Strong** (3 length points + 4 class points = 7).

## Example 3: Long passphrase-style password

**Configuration:** Length `32`, all classes on.

**Sample output:** `H4!kQ9@wZ2#mX7$vL5&pR8!tY3^jN6*bW2`

**Properties:** 32 characters; rated **Very Strong**. Length dominates the score — a 32-character password with only lowercase letters would still rate **Strong** (4 length points).

## Example 4: No symbols (for restrictive sites)

**Configuration:** Length `12`, Uppercase on, Numbers on, Symbols off.

**Sample output:** `Kx7mQ2vL9pR4`

**Properties:** matches `^[A-Za-z0-9]{12}$`; rated **Strong** (2 length points + 3 class points = 5).

## Example 5: Maximum length

**Configuration:** Length `64`, all classes on.

**Sample output:** `T7#mQ2$vL9&pR4!X3^jN6*hB8(wE1)yU5@iO0_qA9#sD2$fG7&hJ3*kL6^zX1cV`

**Properties:** 64 characters; rated **Very Strong**.

## Example 6: All optional classes disabled

**Configuration:** Uppercase off, Numbers off, Symbols off.

**Result:** the Generate button is disabled and the tool shows `Select at least one character set besides lowercase.` Lowercase letters are always included, so at least one optional class is required.

## Example 7: Check a generated password's strength

Generate a password with the default configuration, then paste it into the [Password Strength Analyzer](/tools/password-strength). A 16-character all-classes password scores 7 points there as well (3 length + 4 variety, no penalties) and is rated **Very Strong** — the two tools agree.
