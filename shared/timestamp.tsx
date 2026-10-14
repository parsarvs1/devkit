export function unixToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function dateToUnix(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function unixToMilliseconds(timestamp: number): number {
  return timestamp * 1000;
}

export function millisecondsToUnix(milliseconds: number): number {
  return Math.floor(milliseconds / 1000);
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function getCurrentUnix(): number {
  return Math.floor(Date.now() / 1000);
}

export function getCurrentMilliseconds(): number {
  return Date.now();
}

export function getTimestampExample() {
  const timestamp = 1704067200;

  return {
    unix: timestamp,
    milliseconds: timestamp * 1000,
    date: "2024-01-01T00:00:00.000Z",
  };
}