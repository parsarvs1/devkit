# Installation Guide

This guide explains how to set up and run **DevKit** locally.

## Prerequisites

- **Operating system:** macOS, Linux, or Windows. Commands use bash-style syntax; on Windows use PowerShell.
- **Node.js:** 20.9.0 or newer (Node.js 20 LTS recommended).
- **Package manager:** npm (repository ships `package-lock.json`). Do not mix package managers.
- **Git:** Required to clone.
- **Optional (authentication only):** Cloudflare account with a D1 database. Most tools run in browser and do not need this.

## Get the Source Code

Verified repository URL:

```bash
git clone https://github.com/parsarvs1/devkit.git
cd devkit
```

## Install Dependencies

```bash
npm install
```

Installs dependencies from `package.json` respecting `package-lock.json`.

## Environment Configuration

No `.env.example` exists. Variables:

| Variable | Required | Purpose | How to obtain |
| --- | --- | --- | --- |
| `AUTH_SECRET` | Required only for auth flows | NextAuth.js secret to sign/encrypt sessions | Generate strong random string (e.g. `npx auth secret`) |
| `AUTH_TRUST_HOST` | Optional | Trust host header in local/proxied setups | Set `true` locally if needed |

Create `.env.local`:

```bash
AUTH_SECRET=your-generated-secret
AUTH_TRUST_HOST=true
```

Never commit real secrets; `.env.local` is gitignored.

Notes:
- Most tools need no env vars.
- Auth uses Cloudflare D1 binding `DB` (`wrangler.jsonc`). Production needs valid `database_id`. Local `npm run dev` may not provide binding; auth routes may fail gracefully.

## Run the Application

```bash
npm run dev
```

Open http://localhost:3000. Stop with Ctrl + C.

## Production Build and Verification

```bash
npm run build
npm run start
npm run lint
```

No dedicated type-check script. Run manually:

```bash
npx tsc --noEmit
```

Before production build:
- Set `AUTH_SECRET` for auth usage.
- Cloudflare deploy: `npm run build:worker` then `npm run deploy` (requires Wrangler/Cloudflare config).

## Troubleshooting

- Unsupported Node: install Node 20.9.0+ and rerun `npm install`.
- Install failures: remove `node_modules`, reinstall with `npm install`; don't switch managers.
- Port 3000 in use: stop other process or `npm run dev -- -p 3001`.
- Missing `AUTH_SECRET`: auth requests fail; set in `.env.local`.
- Cloudflare/D1 errors: verify `wrangler.jsonc` `database_id` and binding availability.
- TS/Next build errors: run `npx tsc --noEmit` and `npm run lint`.

## Validation

Derived from `package.json`, `auth.ts`, `wrangler.jsonc`, `README.md`, and repo structure. Commands match defined scripts. Cloudflare steps not executed locally.
