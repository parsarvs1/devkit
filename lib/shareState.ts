export function encodeShareState(
  state: Record<string, unknown>
): string {
  const json = JSON.stringify(state);

  return btoa(
    encodeURIComponent(json).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) =>
        String.fromCharCode(
          parseInt(p1, 16)
        )
    )
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeShareState(
  value: string
): Record<string, unknown> | null {
  try {
    const base64 = value
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padded =
      base64 +
      "=".repeat(
        (4 - (base64.length % 4)) % 4
      );

    const binary = atob(padded);

    const bytes = Uint8Array.from(
      binary,
      (char) => char.charCodeAt(0)
    );

    const json = decodeURIComponent(
      Array.from(bytes)
        .map(
          (byte) =>
            "%" +
            byte
              .toString(16)
              .padStart(2, "0")
        )
        .join("")
    );

    const parsed = JSON.parse(json);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return null;
    }

    return parsed as Record<
      string,
      unknown
    >;
  } catch {
    return null;
  }
}

export function createShareUrl(
  path: string,
  state: Record<string, unknown>
): string {
  const encoded = encodeShareState(state);

  return `${window.location.origin}${path}?state=${encoded}`;
}