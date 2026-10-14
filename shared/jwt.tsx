export interface JwtDecoded {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodeBase64Url(value: string): string {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  const binary = atob(padded);

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

export function decodeJwt(token: string): JwtDecoded {
  const parts = token.trim().split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid JWT format.");
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  if (!encodedHeader || !encodedPayload) {
    throw new Error("Invalid JWT.");
  }

  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;

  try {
    header = JSON.parse(decodeBase64Url(encodedHeader));
  } catch {
    throw new Error("Invalid JWT header.");
  }

  try {
    payload = JSON.parse(decodeBase64Url(encodedPayload));
  } catch {
    throw new Error("Invalid JWT payload.");
  }

  return {
    header,
    payload,
    signature,
  };
}

export function formatJwtPart(value: Record<string, unknown>): string {
  return JSON.stringify(value, null, 2);
}

export function getJwtExample(): string {
  return [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
    "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  ].join(".");
}

export type JwtAlgorithm = "HS256" | "HS384" | "HS512";

const ALGORITHM_HASH: Record<JwtAlgorithm, string> = {
  HS256: "SHA-256",
  HS384: "SHA-384",
  HS512: "SHA-512",
};

const ALGORITHM_LENGTH: Record<JwtAlgorithm, number> = {
  HS256: 32,
  HS384: 48,
  HS512: 64,
};

function encodeBase64Url(bytes: Uint8Array): string {
  let binary = "";

  for (let index = 0; index < bytes.length; index++) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function stringToBytes(value: string): Uint8Array<ArrayBuffer> {
  const encoded = new TextEncoder().encode(value);

  const buffer = new ArrayBuffer(encoded.length);

  const bytes = new Uint8Array(buffer);

  bytes.set(encoded);

  return bytes;
}

export function buildUnsignedJwt(
  payload: Record<string, unknown>,
  algorithm: JwtAlgorithm
): string {
  const header = {
    alg: algorithm,
    typ: "JWT",
  };

  const encodedHeader = encodeBase64Url(
    stringToBytes(JSON.stringify(header))
  );

  const encodedPayload = encodeBase64Url(
    stringToBytes(JSON.stringify(payload))
  );

  return `${encodedHeader}.${encodedPayload}`;
}

export async function signJwt(
  payload: Record<string, unknown>,
  secret: string,
  algorithm: JwtAlgorithm = "HS256"
): Promise<string> {
  if (!secret) {
    throw new Error("A secret is required to sign the token.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    stringToBytes(secret),
    {
      name: "HMAC",
      hash: { name: ALGORITHM_HASH[algorithm] },
    },
    false,
    ["sign"]
  );

  const data = stringToBytes(buildUnsignedJwt(payload, algorithm));

  const signature = await crypto.subtle.sign("HMAC", key, data);

  const signatureBytes = new Uint8Array(signature);

  return `${buildUnsignedJwt(
    payload,
    algorithm
  )}.${encodeBase64Url(signatureBytes)}`;
}
export function withExpiration(
  payload: Record<string, unknown>,
  expiresIn: number,
  now: number = Date.now()
): Record<string, unknown> {
  return {
    ...payload,
    iat: Math.floor(now / 1000),
    exp: Math.floor(now / 1000) + expiresIn,
  };
}

export function minSecretLength(algorithm: JwtAlgorithm): number {
  return ALGORITHM_LENGTH[algorithm];
}

export function getJwtGeneratorExample(): Record<string, unknown> {
  return {
    sub: "1234567890",
    name: "John Doe",
    role: "admin",
  };
}
