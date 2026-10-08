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
  // SHA-256 of "Hello DevKit" — 64 hex chars (a real hash, not a placeholder).
  return {
    text: "Hello DevKit",
    hash: "4d4f15312a3c9f0fe284c9a8d6127580f9f03245c4ebeda30b2301a57f539f64",
    algorithm: "SHA-256" as HashCompareAlgorithm,
  };
}