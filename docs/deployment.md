# Deployment Guide

DevKit deploys to Cloudflare Workers using OpenNext, configured in package.json, open-next.config.ts, wrangler.jsonc.

## A. Architecture

- Next.js 16 App Router, React 19, TypeScript.
- OpenNext Cloudflare build -> .open-next/
- Cloudflare Workers via Wrangler deploy.
- D1 binding DB -> database devkit-db.
- NextAuth credentials + JWT secret from env; D1 for users.
- Reported production URL: https://devkit.pars-paris1.workers.dev (verify separately).

## B. Prerequisites

Node 20.9+, npm, Cloudflare account, Wrangler auth, local setup per docs/installation.md.

## C. Production Env Vars/Secrets

- AUTH_SECRET (required for auth) -> auth.ts; configure: npx wrangler secret put AUTH_SECRET
- AUTH_TRUST_HOST (optional) -> env/config
No real values committed; .env.local local only.

## D. Database and Migrations

- D1 database devkit-db, binding DB.
- Migrations directory: migrations/
- No migration npm scripts; commands:
  - npx wrangler d1 migrations list devkit-db --remote
  - npx wrangler d1 migrations apply devkit-db --remote (review first)
- --local for dev, --remote for prod.
- DB changes not auto-reversed on app rollback; backup first.

## E. Deployment Procedure

1. git status/diff
2. correct branch/commit
3. npm ci (or npm install)
4. npx tsc --noEmit
5. npm run lint
6. npm run build
7. verify env/secrets/bindings
8. review migrations
9. npm run build:worker && npm run deploy
10. confirm URL output
11. verify routes

## F. Custom Domain

No custom domain in repo; workers.dev default HTTPS. Configure via Cloudflare if needed.

## G. Post-Deployment Verification

- homepage/tools/auth
- D1 functionality
- console errors
- sitemap.xml/robots.txt
- canonical/OG metadata
- mobile
- logs via npx wrangler tail

## H. Rollback/Incident

- Use Cloudflare dashboard or wrangler rollback if available (verify installed version).
- App rollback does not reverse DB migrations.
- Logs: npx wrangler tail

## I. Common Failures

- missing AUTH_SECRET
- invalid D1 binding/id
- build/TS errors
- asset/route conflicts
- sitemap/canonical config

## J. Checklist

Before:
- clean intended changes
- npm ci, tsc, lint, build pass
- env/secrets set
- migrations reviewed
After:
- deploy success + URL
- routes/auth pass
- sitemap/robots accessible
- no critical logs
