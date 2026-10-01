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
  | "url"
  | "lorem"
  | "markdown";

export type User = {
  name: string;
  email: string;
};

export type RecentTool = {
  id: Tool;
  name: string;
  description: string;
};