export function generateUuid(): string {
  return crypto.randomUUID();
}

export function generateUuids(count: number): string[] {
  if (count < 1) {
    return [];
  }

  return Array.from(
    { length: count },
    () => crypto.randomUUID()
  );
}   