# DevKit Tool Documentation

Complete documentation for every DevKit tool. Each page explains the tool's purpose, inputs, options, outputs, examples, edge cases, limitations, and privacy considerations.

## How to Use This Documentation

- Each tool page is based on the **actual implementation** in the source code.
- Examples show realistic inputs and their expected outputs.
- Relative links connect tools to their examples and related tools.
- When a tool changes, update its documentation page and examples together.

## Tool Index

### JSON

| Tool | Route | Description |
|------|-------|-------------|
| [JSON Formatter](json-formatter.md) | `/tools/json-formatter` | Format and beautify JSON data instantly |
| [JSON Validator](json-validator.md) | `/tools/json-validator` | Validate JSON and pinpoint syntax errors |
| [JSON to TypeScript](json-to-typescript.md) | `/tools/json-to-typescript` | Convert JSON into TypeScript interfaces |
| [JSON to Zod](json-to-zod.md) | `/tools/json-to-zod` | Convert JSON into Zod validation schemas |

### Security

| Tool | Route | Description |
|------|-------|-------------|
| [JWT Decoder](jwt-decoder.md) | `/tools/jwt-decoder` | Decode JWT tokens and inspect their contents |
| [JWT Generator](jwt-generator.md) | `/tools/jwt-generator` | Generate and sign JSON Web Tokens with a secret |
| [Hash Generator](hash-generator.md) | `/tools/hash-generator` | Generate hashes from text and data |
| [Hash Compare](hash-compare.md) | `/tools/hash-compare` | Compare two hash values and check whether they match |
| [Password Generator](password-generator.md) | `/tools/password-generator` | Generate strong random passwords securely in your browser |
| [Password Strength Analyzer](password-strength.md) | `/tools/password-strength` | Analyze password strength and security requirements |

### Generators

| Tool | Route | Description |
|------|-------|-------------|
| [UUID Generator](uuid-generator.md) | `/tools/uuid-generator` | Generate random UUIDs quickly |
| [Cron Generator](cron-generator.md) | `/tools/cron-generator` | Generate cron expressions |

### Text

| Tool | Route | Description |
|------|-------|-------------|
| [Regex Tester](regex-tester.md) | `/tools/regex-tester` | Test and debug regular expressions |
| [Markdown Previewer](markdown-preview.md) | `/tools/markdown-preview` | Write and preview Markdown in real time |
| [Markdown Playground](markdown-playground.md) | `/tools/markdown-playground` | Edit and experiment with Markdown interactively |
| [Character Counter](character-counter.md) | `/tools/character-counter` | Count characters, words, sentences, lines and paragraphs |

### Encoding

| Tool | Route | Description |
|------|-------|-------------|
| [Base64 Encoder](base64.md) | `/tools/base64` | Encode and decode Base64 strings |
| [URL Encoder / Decoder](url-encoder.md) | `/tools/url-encoder` | Encode and decode URL components |

### Utilities

| Tool | Route | Description |
|------|-------|-------------|
| [Timestamp](timestamp.md) | `/tools/timestamp` | Convert and work with Unix timestamps |
| [Color Converter](color-converter.md) | `/tools/color-converter` | Convert colors between HEX, RGB and HSL |
| [Color Palette Generator](color-palette.md) | `/tools/color-palette` | Generate a full color scale from a base color |
| [Environment Variable Generator](env-generator.md) | `/tools/env-generator` | Generate and format environment variables |
| [Snippets](snippets.md) | `/tools/snippets` | Save and manage reusable code snippets |

### Networking

| Tool | Route | Description |
|------|-------|-------------|
| [API Tester](api-tester.md) | `/tools/api-tester` | Test HTTP APIs and inspect responses |
| [CIDR Calculator](cidr-calculator.md) | `/tools/cidr-calculator` | Calculate network details from a CIDR block |

### HTTP

| Tool | Route | Description |
|------|-------|-------------|
| [HTTP Request Builder](http-request-builder.md) | `/tools/http-request-builder` | Build and send HTTP requests from your browser |

### Automation

| Tool | Route | Description |
|------|-------|-------------|
| [Tool Chaining](tool-chaining.md) | `/tools/tool-chaining` | Connect multiple DevKit tools into one workflow |

### Version Control

| Tool | Route | Description |
|------|-------|-------------|
| [.gitignore Generator](gitignore-generator.md) | `/tools/gitignore-generator` | Create .gitignore files from pre-built templates |
| [Git Command Generator](git-command-generator.md) | `/tools/git-command-generator` | Generate git commands with flags and options |
| [Git Diff Viewer](git-diff-viewer.md) | `/tools/git-diff-viewer` | Parse and visualize git diffs |
| [Git Branch Name Generator](git-branch-name-generator.md) | `/tools/git-branch-name-generator` | Generate clean, consistent git branch names |

### Time

| Tool | Route | Description |
|------|-------|-------------|
| [Cron Parser](cron-parser.md) | `/tools/cron-parser` | Parse cron expressions |
| [Unix Timestamp Converter](unix-timestamp-converter.md) | `/tools/unix-timestamp-converter` | Convert Unix timestamps and dates |

### Data

| Tool | Route | Description |
|------|-------|-------------|
| [SQL Formatter](sql-formatter.md) | `/tools/sql-formatter` | Format SQL queries |

## Contributing

When adding or changing a tool:

1. Create or update the tool page under `app/tools/<tool-slug>/`.
2. Update the matching documentation page in `docs/tools/`.
3. Update or add examples in `docs/examples/`.
4. Register the tool in `data/tools.tsx` if it is new.
5. Verify the tool appears in the sitemap and navigation.
