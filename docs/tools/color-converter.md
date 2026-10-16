# Color Converter

## Purpose

Converts a HEX color value to its RGB and HSL equivalents. Provides a visual color preview and one-click copy for each output format.

## When to use it

- You have a HEX color from a design tool and need the RGB or HSL value for CSS.
- You need to convert between color formats for use in different frameworks or tools.
- You want to quickly see what a color looks like and get its values in multiple formats.

## How to use it

1. Navigate to the [Color Converter tool page](/tools/color-converter).
2. Enter a HEX color value in the input field (e.g., `#6366f1` or `#fff`).
3. Click **Convert**.
4. The tool displays:
   - A visual color preview swatch.
   - The RGB value (e.g., `rgb(99, 102, 241)`).
   - The HSL value (e.g., `hsl(239, 84%, 67%)`).
5. Click **Copy** next to either output to copy it to your clipboard.
6. Click **Clear** to reset all fields.

## Inputs

| Input | Description | Example |
|-------|-------------|---------|
| HEX color | A hexadecimal color code, with or without the leading `#` | `#6366f1`, `#fff`, `6366f1` |

**Supported formats:**
- 6-digit HEX: `#6366f1` or `6366f1`
- 3-digit shorthand: `#fff` or `fff` (automatically expanded to `#ffffff`)

## Options

| Option | Description |
|--------|-------------|
| Convert | Parses the HEX input and computes RGB and HSL values |
| Copy (RGB) | Copies the RGB value to the clipboard |
| Copy (HSL) | Copies the HSL value to the clipboard |
| Clear | Resets all fields and outputs |

## Output

### RGB

```
rgb(99, 102, 241)
```

Format: `rgb(r, g, b)` where each component is an integer 0–255.

### HSL

```
hsl(239, 84%, 67%)
```

Format: `hsl(h, s%, l%)` where:
- `h` (hue) is an integer 0–360 (degrees).
- `s` (saturation) is an integer 0–100 (percentage).
- `l` (lightness) is an integer 0–100 (percentage).

### Visual preview

A filled rectangle showing the actual color.

## Examples

See [Color Converter Examples](../examples/color-converter.md) for practical use cases.

## Edge cases

- **Invalid HEX:** Input that is not a valid 3-digit or 6-digit hexadecimal string produces the error "Enter a valid HEX color (e.g. #6366f1 or #fff)."
- **Case insensitivity:** Both uppercase and lowercase hex digits are accepted (`#FFF` and `#fff` are equivalent).
- **Missing hash prefix:** The `#` prefix is optional; `6366f1` works the same as `#6366f1`.
- **3-digit expansion:** Shorthand like `#abc` is expanded to `#aabbcc` before conversion.

## Limitations

- Only HEX → RGB/HSL conversion is supported. Reverse conversion (RGB/HSL → HEX) is not available.
- No alpha channel (transparency) support.
- No CMYK, HSV, or other color format outputs.

## Privacy and security

- All conversion happens client-side. No data is sent to any server.
- No values are stored or persisted.

## Related tools

- [Color Palette Generator](color-palette.md) — for generating a full color scale from a base color
