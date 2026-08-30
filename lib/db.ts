export function getDB() {
  if (typeof process !== "undefined") {
    return process.env.DB;
  }

  return null;
}