# Color Palette Generator — Examples

## Basic usage

### Example 1: Generate a palette from indigo

**Input:** `#6366f1` (the default base color)

**Action:** Open the tool — the palette is generated automatically.

**Expected palette:**

| Step | HEX | Description |
|------|-----|-------------|
| 50 | `#f5f6ff` | Almost white with a hint of indigo |
| 100 | `#ebedff` | Very light indigo |
| 200 | `#d4d9ff` | Light indigo |
| 300 | `#b3bcff` | Soft indigo |
| 400 | `#8f9bff` | Light-medium indigo |
| 500 | `#6366f1` | Base indigo |
| 600 | `#5658d4` | Slightly darker indigo |
| 700 | `#4a4db3` | Medium-dark indigo |
| 800 | `#3d4091` | Dark indigo |
| 900 | `#313370` | Very dark indigo |
| 950 | `#252750` | Almost black with indigo tint |

### Example 2: Generate a palette from red

**Input:** `#ef4444`

**Action:** Enter the color in the text input.

**Expected palette (approximate):**

| Step | HEX |
|------|-----|
| 50 | `#fff5f5` |
| 100 | `#ffebeb` |
| 200 | `#ffd4d4` |
| 300 | `#ffb3b3` |
| 400 | `#ff8f8f` |
| 500 | `#ef4444` |
| 600 | `#d43a3a` |
| 700 | `#b32f2f` |
| 800 | `#912626` |
| 900 | `#701d1d` |
| 950 | `#501515` |

### Example 3: Generate a palette from a random color

**Action:** Click **Random**.

**Expected result:** A random color is generated and the palette updates accordingly. The HEX, RGB, and HSL cards at the top also update to reflect the new base color.

## Using the color picker

### Example 4: Use the native color picker

**Action:** Click the color picker swatch and select a color.

**Expected result:** The text input updates to show the selected color's HEX value, and the palette regenerates.

## Copying values

### Example 5: Copy a palette swatch

**Action:** Click on any color swatch in the palette grid.

**Expected result:** The HEX value of that swatch is copied to the clipboard. A checkmark icon appears on the swatch for 1.2 seconds.

**Example:** Clicking the `300` swatch in the indigo palette copies `#b3bcff`.

### Example 6: Copy the base color in different formats

**Action:** Click the HEX, RGB, or HSL card at the top of the page.

**Expected results for `#6366f1`:**

| Card | Copies |
|------|--------|
| HEX | `#6366f1` |
| RGB | `rgb(99, 102, 241)` |
| HSL | `hsl(239, 84%, 67%)` |

## Practical scenarios

### Scenario 1: Design system color tokens

You are building a design system and need a full color scale from your brand color `#3b82f6` (blue).

**Action:** Enter `#3b82f6` as the base color.

**Use the palette steps as CSS custom properties:**

```css
:root {
  --color-blue-50: #f5f9ff;
  --color-blue-100: #ebf2ff;
  --color-blue-200: #d3e3ff;
  --color-blue-300: #b0ceff;
  --color-blue-400: #8ab4ff;
  --color-blue-500: #3b82f6;
  --color-blue-600: #3471d9;
  --color-blue-700: #2c5fb8;
  --color-blue-800: #244c96;
  --color-blue-900: #1c3a75;
  --color-blue-950: #142854;
}
```

### Scenario 2: Dark mode variants

You have a primary color `#10b981` (emerald) and want to create dark-mode variants.

**Action:** Enter `#10b981` and use the darker steps (700–950) as dark-mode equivalents.

| Step | HEX | Use case |
|------|-----|----------|
| 500 | `#10b981` | Light mode primary |
| 700 | `#0e9f6e` | Dark mode hover |
| 800 | `#0c875c` | Dark mode active |
| 900 | `#0a6f4b` | Dark mode primary |

## Edge cases

### Partial input

**Action:** Type `#63` in the text input.

**Expected result:** The palette does not update. The text field retains `#63` so you can continue typing. The palette only regenerates when a complete 6-digit hex is entered.

### Uppercase input

**Action:** Type `#6366F1` in the text input.

**Expected result:** The palette updates and the text normalizes to lowercase `#6366f1`.
