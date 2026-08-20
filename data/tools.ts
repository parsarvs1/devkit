import {
  Braces,
  KeyRound,
  Fingerprint,
  Regex,
  Binary,
  Clock,
  Link as LinkIcon,
  Hash,
  Palette,
  LockKeyhole,
} from "lucide-react";

export const tools = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data.",
    icon: Braces,
    href: "/tools/json-formatter",
    category: "Format",
  },

  {
    name: "JWT Decoder",
    description: "Decode and inspect JWT tokens.",
    icon: KeyRound,
    href: "/tools/jwt-decoder",
    category: "Security",
  },

  {
    name: "UUID Generator",
    description: "Generate random UUIDs instantly.",
    icon: Fingerprint,
    href: "/tools/uuid-generator",
    category: "Generators",
  },

  {
    name: "Regex Tester",
    description: "Test regular expressions quickly.",
    icon: Regex,
    href: "/tools/regex-tester",
    category: "Development",
  },

  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings.",
    icon: Binary,
    href: "/tools/base64",
    category: "Converters",
  },

  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps easily.",
    icon: Clock,
    href: "/tools/timestamp",
    category: "Converters",
  },

  {
    name: "Hash Generator",
    description: "Generate secure hashes from text.",
    icon: Hash,
    href: "/tools/hash-generator",
    category: "Security",
  },

  {
    name: "URL Encoder / Decoder",
    description: "Encode and decode URL components.",
    icon: LinkIcon,
    href: "/tools/url-encoder",
    category: "Converters",
  },

  {
    name: "Color Converter",
    description: "Convert HEX colors to RGB and HSL.",
    icon: Palette,
    href: "/tools/color-converter",
    category: "Converters",
  },

  {
    name: "Password Generator",
    description: "Generate strong random passwords securely.",
    icon: LockKeyhole,
    href: "/tools/password-generator",
    category: "Generators",
  },
];