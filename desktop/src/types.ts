export type Tool =
  | "home"
  | "json"
  | "jwt"
  | "uuid"
  | "regex"
  | "base64"
  | "timestamp"
  | "color"
  | "hash"
  | "hash-compare"
  | "url";

export type User = {
  name: string;
  email: string;
};