# Color Palette Generator

## Purpose

Generates a complete 11-step color scale (from lightest to darkest) from a single base HEX color. The palette follows the Tailwind CSS naming convention (50, 100, 200, ..., 950) and provides one-click copy for each color's HEX value.

## When to use it

- You have a brand or primary color and need a full set of tints and shades.
- You are building a design system and need consistent color steps.
- You want to quickly generate a Tailwind-style color palette from any base color.

## How to use it

1. Navigate to the [Color Palette Generator tool page](/tools/color-palette).
2. Enter a base color using either:
   - The **color picker** (native browser color input).
   - The **text input** (type a HEX value like `#6366f1`).
3. The palette updates automatically when a valid 6-digit HEX color is entered.
4. Click **Random** to generate a random base color.
5. Click any color swatch in the palette to copy its HEX value.
6. Click the HEX, RGB, or HSL cards at the top to copy the base color in that format.

## Inputs

| Input | Description | Example |
|-------|-------------|---------|
| Base color (picker) | Native browser color picker | — |
| Base color (text) | A HEX color string; `#` is optional | `#6366f1`, `6366f1` |

**Validation:** The text input only updates the palette when the value is a complete 6-digit hex color (with or without `#`). Partial or invalid input is preserved in the text field but does not change the palette.

## Options

| Option | Description |
|--------|-------------|
| Random | Generates a random base color and updates the palette |
| Click swatch | Copies that color's HEX value to the clipboard |
| Click HEX/RGB/HSL card | Copies the base color in the respective format |

## Output

An 11-color palette with the following steps:

| Step | Mix direction | Amount |
|------|---------------|--------|
| 50 | Toward white | 95% |
| 100 | Toward white | 90% |
| 200 | Toward white | 75% |
| 300 | Toward white | 60% |
| 400 | Toward white | 35% |
| 500 | Base color | 0% |
| 600 | Toward black | 10% |
| 700 | Toward black | 25% |
| 800 | Toward black | 40% |
| 900 | Toward black | 55% |
| 950 | Toward black | 70% |

Each swatch displays its step name and HEX value. The base color also shows RGB and HSL values.

## Examples

See [Color Palette Generator Examples](../examples/color-palette.md) for practical use cases.

## Edge cases

- **Invalid input:** If the text input does not match a 6-digit hex pattern, the palette does not update. The text field retains whatever the user typed.
- **Lowercase normalization:** When a valid color is entered, it is normalized to lowercase (e.g., `#6366F1` becomes `#6366f1`).
- **Random color range:** The random generator produces values from `#000000` to `#ffffff` (0 to 16,777,215 in decimal).

## Limitations

- Only HEX input is supported. RGB or HSL input cannot be used as the base color.
- The palette steps are fixed; you cannot customize the number of steps or the mix ratios.
- No export functionality (CSS variables, Tailwind config, etc.) — only individual copy.

## Privacy and security

- All color generation happens client-side. No data is sent to any server.
- No values are stored or persisted.

## Related tools

- [Color Converter](color-converter.md) — for converting a single HEX color to RGB and HSL
