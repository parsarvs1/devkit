# Environment Variable Generator

## Purpose

Creates, manages, and exports environment variables for your projects. Supports multiple output formats (`.env`, `.env.example`, JSON, TypeScript) and includes a built-in secret generator for creating cryptographically random values.

## When to use it

- You are setting up a new project and need to create a `.env` file.
- You want to generate a `.env.example` template with empty values.
- You need to export environment variables as JSON or TypeScript.
- You need to generate secure random secrets (API keys, tokens, passwords).

## How to use it

1. Navigate to the [Environment Variable Generator tool page](/tools/env-generator).
2. Add variables using the **Add Variable** button.
3. For each variable, enter a **Key** and **Value**.
   - Keys are automatically uppercased and spaces are replaced with underscores.
   - Click the **key icon** next to a value field to auto-generate a random 32-character secret.
4. Choose an output format: `.env`, `.env.example`, `JSON`, or `TypeScript`.
5. Click **Copy** to copy the generated output to your clipboard.
6. Click **Download** to save the output as a file.
7. Click **Example** to load a pre-filled set of common variables.
8. Click **Clear** to remove all variables.

## Inputs

| Input | Description | Example |
|-------|-------------|---------|
| Key | The environment variable name (auto-uppercased, spaces → underscores) | `DATABASE_URL` |
| Value | The environment variable value | `postgresql://localhost:5432/myapp` |

### Secret generator

The key icon button next to each value field generates a random 32-character string using the character set:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_
```

The secret is generated using `crypto.getRandomValues()` for cryptographic security.

## Options

| Option | Description |
|--------|-------------|
| Add Variable | Adds a new empty key/value row |
| Remove variable (×) | Removes the variable row (minimum one row always remains) |
| Generate secret (key icon) | Fills the value field with a random 32-character secret |
| Example | Loads four example variables (DATABASE_URL, NEXTAUTH_SECRET, API_URL, NODE_ENV) |
| Clear | Resets to a single empty variable row |
| Copy | Copies the generated output to the clipboard |
| Download | Saves the output as a file |

## Output formats

### .env

```
DATABASE_URL=postgresql://localhost:5432/myapp
NEXTAUTH_SECRET=your-secret-key
API_URL=https://api.example.com
NODE_ENV=development
```

### .env.example

```
DATABASE_URL=
NEXTAUTH_SECRET=
API_URL=
NODE_ENV=
```

### JSON

```json
{
  "DATABASE_URL": "postgresql://localhost:5432/myapp",
  "NEXTAUTH_SECRET": "your-secret-key",
  "API_URL": "https://api.example.com",
  "NODE_ENV": "development"
}
```

### TypeScript

```typescript
const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  API_URL: process.env.API_URL,
  NODE_ENV: process.env.NODE_ENV,
};

export default env;
```

## Examples

See [Environment Variable Generator Examples](../examples/env-generator.md) for practical use cases.

## Edge cases

- **Empty keys are filtered out:** Variables with blank keys do not appear in the output.
- **Minimum one row:** You cannot remove the last remaining variable row; it resets to an empty row instead.
- **Key normalization:** Keys are automatically uppercased and internal spaces are replaced with underscores as you type.
- **No duplicate detection:** The tool does not warn about duplicate keys.

## Limitations

- No import from an existing `.env` file — you must type or paste values manually.
- No validation of key names beyond uppercasing and space replacement.
- The secret generator produces a fixed 32-character length; no custom length option.
- Download uses the browser's Blob API; the filename is fixed based on the selected format.

## Privacy and security

- All data is handled client-side. No environment variable values are transmitted to any server.
- The secret generator uses `crypto.getRandomValues()`, which is cryptographically secure.
- **Important:** Generated `.env` files contain sensitive secrets. Do not commit them to version control. Use `.env.example` for sharing templates.

## Related tools

- [UUID Generator](uuid-generator.md) — for generating unique identifiers
- [Snippets](snippets.md) — for saving reusable code snippets
