# Architecture Documentation

DevKit is a Next.js App Router app with tool pages and Cloudflare deployment.

## Directory tree

```
app/ components/ data/ hooks/ lib/ shared/ public/
auth.ts next.config.ts open-next.config.ts wrangler.jsonc
```

## Routing & layouts

File-based App Router; tool layouts provide metadata/JSON-LD.

## Data flow

Tool pages are client components; shared logic in `shared/`. Auth via NextAuth credentials with D1 (`auth.ts`). Env: AUTH_SECRET (required auth), AUTH_TRUST_HOST.

## Build/deploy

OpenNext Cloudflare build/deploy scripts.

## Metadata

toolMetadata, ToolJsonLd, sitemap.ts, robots.ts.

## Boundaries/coupling

Tool listing centralized in data/tools.ts; shared logic reused by web/desktop.
