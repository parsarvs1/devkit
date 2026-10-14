export type HashAlgorithm =
  | "SHA-1"
  | "SHA-256"
  | "SHA-384"
  | "SHA-512";

export async function generateHash(
  input: string,
  algorithm: HashAlgorithm
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  const hashBuffer = await crypto.subtle.digest(algorithm, data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function getHashExample() {
  return {
    input: "Hello DevKit",
    algorithm: "SHA-256" as HashAlgorithm,
  };
}