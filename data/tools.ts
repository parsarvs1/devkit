
import {
  Braces,
  KeyRound,
  Fingerprint,
  Regex,
  Binary,
  Clock,
} from "lucide-react";

export const tools = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data.",
    icon: Braces,
    href: "/tools/json-formatter",
  },
  {
    name: "JWT Decoder",
    description: "Decode and inspect JWT tokens.",
    icon: KeyRound,
    href: "/tools/jwt-decoder",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs instantly.",
    icon: Fingerprint,
    href: "/tools/uuid-generator",
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions quickly.",
    icon: Regex,
    href: "/tools/regex-tester",
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings.",
    icon: Binary,
    href: "/tools/base64",
  },
  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps easily.",
    icon: Clock,
    href: "/tools/timestamp",
  },
];
