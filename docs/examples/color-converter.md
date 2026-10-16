# Color Converter — Examples

## Basic conversions

### Example 1: Convert a 6-digit HEX color

**Input:** `#6366f1`

**Action:** Click **Convert**.

**Expected output:**

```
RGB: rgb(99, 102, 241)
HSL: hsl(239, 84%, 67%)
```

**Visual preview:** A filled rectangle showing the indigo color `#6366f1`.

### Example 2: Convert a 3-digit shorthand HEX

**Input:** `#fff`

**Action:** Click **Convert**.

**Expected output:**

```
RGB: rgb(255, 255, 255)
HSL: hsl(0, 0%, 100%)
```

**Explanation:** The 3-digit shorthand `#fff` is automatically expanded to `#ffffff` before conversion.

### Example 3: Convert without the hash prefix

**Input:** `ff5733`

**Action:** Click **Convert**.

**Expected output:**

```
RGB: rgb(255, 87, 51)
HSL: hsl(9, 100%, 60%)
```

**Explanation:** The `#` prefix is optional. The tool strips it if present and validates the remaining 6 hex digits.

### Example 4: Convert black

**Input:** `#000000`

**Action:** Click **Convert**.

**Expected output:**

```
RGB: rgb(0, 0, 0)
HSL: hsl(0, 0%, 0%)
```

### Example 5: Convert white

**Input:** `#ffffff`

**Action:** Click **Convert**.

**Expected output:**

```
RGB: rgb(255, 255, 255)
HSL: hsl(0, 0%, 100%)
```

## Case insensitivity

### Example 6: Uppercase HEX

**Input:** `#FF5733`

**Action:** Click **Convert**.

**Expected output:**

```
RGB: rgb(255, 87, 51)
HSL: hsl(9, 100%, 60%)
```

**Explanation:** Uppercase and lowercase hex digits produce identical results.

## Error cases

### Example 7: Invalid HEX (wrong length)

**Input:** `#12345`

**Action:** Click **Convert**.

**Expected error:**

```
Enter a valid HEX color (e.g. #6366f1 or #fff).
```

### Example 8: Invalid HEX (non-hex characters)

**Input:** `#gggggg`

**Action:** Click **Convert**.

**Expected error:**

```
Enter a valid HEX color (e.g. #6366f1 or #fff).
```

## Copy functionality

### Example 9: Copy the RGB value

**Action:**
1. Enter `#6366f1` and click **Convert**.
2. Click **Copy** next to the RGB output.

**Expected result:** `rgb(99, 102, 241)` is copied to the clipboard. The button shows "Copied!" for 1.5 seconds.

### Example 10: Copy the HSL value

**Action:**
1. Enter `#6366f1` and click **Convert**.
2. Click **Copy** next to the HSL output.

**Expected result:** `hsl(239, 84%, 67%)` is copied to the clipboard.
