# Environment Variable Generator — Examples

## Basic usage

### Example 1: Create a simple .env file

**Input:**

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://localhost:5432/myapp` |
| `API_URL` | `https://api.example.com` |
| `NODE_ENV` | `development` |

**Action:** Select **.env** format and view the output.

**Expected output:**

```
DATABASE_URL=postgresql://localhost:5432/myapp
API_URL=https://api.example.com
NODE_ENV=development
```

### Example 2: Create a .env.example template

**Input:** Same as Example 1.

**Action:** Select **.env.example** format.

**Expected output:**

```
DATABASE_URL=
API_URL=
NODE_ENV=
```

**Explanation:** The `.env.example` format outputs keys with empty values, suitable for committing to version control.

### Example 3: Export as JSON

**Input:** Same as Example 1.

**Action:** Select **JSON** format.

**Expected output:**

```json
{
  "DATABASE_URL": "postgresql://localhost:5432/myapp",
  "API_URL": "https://api.example.com",
  "NODE_ENV": "development"
}
```

### Example 4: Export as TypeScript

**Input:** Same as Example 1.

**Action:** Select **TypeScript** format.

**Expected output:**

```typescript
const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  API_URL: process.env.API_URL,
  NODE_ENV: process.env.NODE_ENV,
};

export default env;
```

## Secret generation

### Example 5: Generate a random secret

**Action:**
1. Enter `NEXTAUTH_SECRET` as the key.
2. Click the **key icon** button next to the value field.

**Expected result:** The value field is filled with a random 32-character string.

**Example output (will vary):**

```
NEXTAUTH_SECRET=xK9_mQ2vL8nR4wE7yU1iO3pA6sF0gH5jK
```

**Explanation:** The secret is generated using `crypto.getRandomValues()` with the character set `A-Z`, `a-z`, `0-9`, `-`, and `_`.

### Example 6: Generate multiple secrets

**Action:**
1. Add three variables: `JWT_SECRET`, `API_KEY`, `ENCRYPTION_KEY`.
2. Click the key icon for each.

**Expected result:** Each variable gets a different random 32-character secret.

## Key normalization

### Example 7: Keys are auto-uppercased

**Action:** Type `database_url` in the key field.

**Expected result:** The key automatically becomes `DATABASE_URL` (uppercased, spaces replaced with underscores).

**Additional example:** Typing `api url` becomes `API_URL`.

## Loading examples

### Example 8: Load the example template

**Action:** Click **Example**.

**Expected result:** Four variables are loaded:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://localhost:5432/myapp` |
| `NEXTAUTH_SECRET` | `your-secret-key` |
| `API_URL` | `https://api.example.com` |
| `NODE_ENV` | `development` |

## Download

### Example 9: Download as a file

**Action:**
1. Enter your variables.
2. Select a format.
3. Click **Download**.

**Expected result:** A file is downloaded with the appropriate name and MIME type:

| Format | Filename | MIME type |
|--------|----------|-----------|
| .env | `.env` | `text/plain` |
| .env.example | `.env.example` | `text/plain` |
| JSON | `env.json` | `application/json` |
| TypeScript | `env.ts` | `text/typescript` |

## Practical scenarios

### Scenario 1: Next.js project setup

**Input:**

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/mydb` |
| `NEXTAUTH_SECRET` | *(generated secret)* |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | `your-client-id` |
| `GOOGLE_CLIENT_SECRET` | `your-client-secret` |

**Action:** Generate `.env` for local development and `.env.example` to share with the team.

### Scenario 2: Docker Compose environment

**Input:**

| Key | Value |
|-----|-------|
| `POSTGRES_USER` | `admin` |
| `POSTGRES_PASSWORD` | *(generated secret)* |
| `POSTGRES_DB` | `myapp` |
| `REDIS_URL` | `redis://localhost:6379` |

**Action:** Export as JSON for use with Docker Compose `env_file` or Kubernetes secrets.

## Edge cases

### Empty keys are filtered

**Input:**

| Key | Value |
|-----|-------|
| `VALID_KEY` | `some-value` |
| ` ` (spaces) | `another-value` |

**Action:** Generate `.env` output.

**Expected output:**

```
VALID_KEY=some-value
```

**Explanation:** The variable with a blank key is filtered out and does not appear in the output.
