import {
Braces,
KeyRound,
Regex,
Fingerprint,
Binary,
Clock,
Palette,
Hash,
Link as LinkIcon,
LockKeyhole,
FileText,
Code2,
Zap,
ShieldCheck,
GitCompare,
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

{
name: "Hash Compare",
description: "Compare two hash values and check whether they match.",
icon: GitCompare,
href: "/tools/hash-compare",
category: "Security",
},

{
name: "URL Encoder / Decoder",
description: "Encode and decode URL components.",
icon: LinkIcon,
href: "/tools/url-encoder",
category: "Encoding",
},

{
name: "Password Generator",
description:
"Generate strong random passwords securely in your browser.",
icon: LockKeyhole,
href: "/tools/password-generator",
category: "Security",
},

{
name: "Password Strength Analyzer",
description:
"Analyze password strength and security requirements.",
icon: ShieldCheck,
href: "/tools/password-strength",
category: "Security",
},

{
name: "Markdown Previewer",
description: "Write and preview Markdown in real time.",
icon: FileText,
href: "/tools/markdown-preview",
category: "Text",
},

{
name: "Markdown Playground",
description:
"Edit and experiment with Markdown interactively.",
icon: FileText,
href: "/tools/markdown-playground",
category: "Text",
},

{
name: "JSON → TypeScript",
description:
"Convert JSON into TypeScript interfaces.",
icon: Code2,
href: "/tools/json-to-typescript",
category: "Code Generation",
},

{
name: "JSON → Zod",
description:
"Convert JSON into Zod validation schemas.",
icon: Braces,
href: "/tools/json-to-zod",
category: "Code Generation",
},

{
name: "Color Palette Generator",
description:
"Generate a full color scale from a base color.",
icon: Palette,
href: "/tools/color-palette",
category: "Utilities",
},

{
name: "API Tester",
description:
"Test HTTP APIs and inspect responses.",
icon: Zap,
href: "/tools/api-tester",
category: "Networking",
},

{
name: "HTTP Request Builder",
description:
"Build and send HTTP requests directly from your browser.",
icon: Zap,
href: "/tools/http-request-builder",
category: "HTTP",
},

{
name: "Environment Variable Generator",
description:
"Generate and format environment variables.",
icon: Code2,
href: "/tools/env-generator",
category: "Utilities",
},

{
name: "Snippets",
description:
"Save and manage reusable code snippets.",
icon: Code2,
href: "/tools/snippets",
category: "Utilities",
},

{
name: "Tool Chaining",
description:
"Connect multiple DevKit tools into one workflow.",
icon: Zap,
href: "/tools/tool-chaining",
category: "Automation",
},
];
