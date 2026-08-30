import {
  Braces,
  KeyRound,
  Regex,
  Fingerprint,
  Binary,
  Clock,
  Palette,
  Hash,
} from "lucide-react";

export const tools = [
  {
    name: "JSON Formatter",
    description: "Format and beautify JSON data instantly.",
    icon: Braces,
    href: "/tools/json-formatter",
    category: "JSON",
  },
  {
    name: "JWT Decoder",
    description: "Decode JWT tokens and inspect their contents.",
    icon: KeyRound,
    href: "/tools/jwt-decoder",
    category: "Security",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs quickly.",
    icon: Fingerprint,
    href: "/tools/uuid-generator",
    category: "Generators",
  },
  {
    name: "Regex Tester",
    description: "Test and debug regular expressions.",
    icon: Regex,
    href: "/tools/regex-tester",
    category: "Text",
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings.",
    icon: Binary,
    href: "/tools/base64",
    category: "Encoding",
  },
  {
    name: "Timestamp",
    description: "Convert and work with Unix timestamps.",
    icon: Clock,
    href: "/tools/timestamp",
    category: "Utilities",
  },
  {
    name: "Color Converter",
    description: "Convert colors between HEX, RGB and HSL.",
    icon: Palette,
    href: "/tools/color-converter",
    category: "Utilities",
  },
  {
    name: "Hash Generator",
    description: "Generate hashes from text and data.",
    icon: Hash,
    href: "/tools/hash-generator",
    category: "Security",
  },
];