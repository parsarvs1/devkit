export type HashCompareAlgorithm =
  | "SHA-1"
  | "SHA-256"
  | "SHA-384"
  | "SHA-512";

export async function hashText(
  input: string,
  algorithm: HashCompareAlgorithm
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  const hashBuffer = await crypto.subtle.digest(
    algorithm,
    data
  );

  const hashArray = Array.from(
    new Uint8Array(hashBuffer)
  );

  return hashArray
    .map((byte) =>
      byte.toString(16).padStart(2, "0")
    )
    .join("");
}

export function normalizeHash(hash: string): string {
  return hash.trim().toLowerCase();
}

export function compareHashes(
  hashA: string,
  hashB: string
): boolean {
  return (
    normalizeHash(hashA) ===
    normalizeHash(hashB)
  );
}

export function getHashCompareExample() {
  return {
    text: "Hello DevKit",
    hash: "6b1e4b8e7f7f3c3e7e9f8d7c2b4f4f6f",
    algorithm: "SHA-256" as HashCompareAlgorithm,
  };
}