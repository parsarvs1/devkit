export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export function hexToRgb(hex: string): RgbColor {
  let value = hex.trim().replace(/^#/, "");

  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    throw new Error("Invalid HEX color.");
  }

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

export function rgbToHex(
  r: number,
  g: number,
  b: number
): string {
  if (
    ![r, g, b].every(
      (value) =>
        Number.isInteger(value) &&
        value >= 0 &&
        value <= 255
    )
  ) {
    throw new Error("Invalid RGB values.");
  }

  return (
    "#" +
    [r, g, b]
      .map((value) =>
        value.toString(16).padStart(2, "0")
      )
      .join("")
      .toUpperCase()
  );
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): HslColor {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;

    s =
      l > 0.5
        ? delta / (2 - max - min)
        : delta / (max + min);

    switch (max) {
      case red:
        h =
          ((green - blue) / delta +
            (green < blue ? 6 : 0)) /
          6;
        break;

      case green:
        h =
          ((blue - red) / delta + 2) /
          6;
        break;

      case blue:
        h =
          ((red - green) / delta + 4) /
          6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): RgbColor {
  if (
    !Number.isFinite(h) ||
    !Number.isFinite(s) ||
    !Number.isFinite(l) ||
    h < 0 ||
    h > 360 ||
    s < 0 ||
    s > 100 ||
    l < 0 ||
    l > 100
  ) {
    throw new Error("Invalid HSL values.");
  }

  const hue = h / 360;
  const saturation = s / 100;
  const lightness = l / 100;

  if (saturation === 0) {
    const value = Math.round(lightness * 255);

    return {
      r: value,
      g: value,
      b: value,
    };
  }

  function hueToRgb(
    p: number,
    q: number,
    t: number
  ) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;

    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }

    if (t < 1 / 2) {
      return q;
    }

    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }

    return p;
  }

  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness +
        saturation -
        lightness * saturation;

  const p =
    2 * lightness - q;

  return {
    r: Math.round(
      hueToRgb(p, q, hue + 1 / 3) * 255
    ),
    g: Math.round(
      hueToRgb(p, q, hue) * 255
    ),
    b: Math.round(
      hueToRgb(p, q, hue - 1 / 3) * 255
    ),
  };
}

export function rgbString(
  color: RgbColor
): string {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function rgbaString(
  color: RgbColor,
  alpha = 1
): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

export function hslString(
  color: HslColor
): string {
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}

export function getColorExample() {
  return {
    hex: "#8B5CF6",
    rgb: "139, 92, 246",
    hsl: "258, 90%, 66%",
  };
}