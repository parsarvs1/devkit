function encodeUtf8(value: string): string {
  const bytes = new TextEncoder().encode(value);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function decodeUtf8(value: string): string {
  const binary = atob(value);

  const bytes = Uint8Array.from(binary, (char) =>
    char.charCodeAt(0)
  );

  return new TextDecoder().decode(bytes);
}

export function encodeBase64(value: string): string {
  return encodeUtf8(value);
}

export function decodeBase64(value: string): string {
  return decodeUtf8(value.trim());
}

export function getBase64Example() {
  return {
    encode: `Hello, DevKit!
This is a Base64 example. 🚀`,

    decode:
      "SGVsbG8sIERldktpdCEKVGhpcyBpcyBhIEJhc2U2NCBleGFtcGxlLiDwn5qA",
  };
}