# Development Guide

For initial setup, see [docs/installation.md](installation.md).

## Development Environment

Start dev server:

```bash
npm run dev
```

Open http://localhost:3000.

Available scripts (`package.json`):

- `npm run dev` — Next.js dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint
- `npm run build:worker` — OpenNext Cloudflare build
- `npm run deploy` — build + wrangler deploy
- `npx tsc --noEmit` — TypeScript check (no dedicated script)

Verify app running: browser at http://localhost:3000; terminal shows Ready.

## Project Architecture

Key directories:

```
app/               Next.js App Router routes
  tools/           One folder per tool + category pages
  api/             API routes (auth, data)
components/        Reusable UI (Navbar, CommandPalette, etc.)
data/tools.ts      Source of truth for tool list
hooks/             usePinnedTools, useRecentTools
lib/               db, pins, toolHistory, toolMetadata, shareState, clipboard
shared/            framework-agnostic tool logic
public/            static assets
auth.ts            NextAuth config
next.config.ts
open-next.config.ts
wrangler.jsonc     Cloudflare config (D1 DB)
```

Routing: App Router file-based. Tool route `app/tools/<slug>/` with `page.tsx` and `layout.tsx`. Layout calls `toolMetadata(slug)` and renders `ToolJsonLd`.

Data/auth: NextAuth.js credentials; Cloudflare D1 via `getCloudflareContext().env.DB`. User lookup in `auth.ts`.

## Development Workflow

1. Inspect existing similar implementation before adding code.
2. Reuse components/utilities in `components/`, `lib/`, `shared/`.
3. Make focused changes.
4. Run `npm run lint` and `npx tsc --noEmit`.
5. Review `git diff`.

## Adding a New Tool (mandatory vs optional)

Mandatory:
1. Create `app/tools/<slug>/page.tsx` (client component UI) and `layout.tsx` with `toolMetadata("<slug>")` + `<ToolJsonLd slug="<slug>" />` (see `app/tools/json-formatter/layout.tsx`).
2. Add framework-agnostic logic to `shared/<slug>.ts` (or relevant shared module).
3. Register tool in `data/tools.ts` (name, description, icon, href, category) to appear on tools page, search, command palette.
4. Handle loading/empty/invalid/error states in UI (json-formatter example shows `error` state and shared error).

Optional:
- Add metadata/SEO (handled by toolMetadata + ToolJsonLd).
- Related tools via `components/RelatedTools.tsx`.
- Track usage via `TrackToolUsage` / `RecentToolTracker`.

Test by `npm run dev`, open `/tools/<slug>`, run lint + type-check.

## UI and Coding Conventions

- React 19 + Next.js 16 App Router; client pages use `"use client"`.
- Tailwind CSS v4 for styling; lucide-react icons.
- TypeScript strict types; import with `@/` alias.
- Reuse existing components instead of duplicating.
- Accessibility: semantic HTML, keyboard interactions (command palette Ctrl+K).
- Responsive design.

## Authentication, Data, Environment Variables

Env vars: `AUTH_SECRET` (required for auth), `AUTH_TRUST_HOST` (optional). Consumed in `auth.ts`. DB binding `DB` from Cloudflare (wrangler.jsonc). See installation guide for setup. Never commit secrets.

## Validation and Testing

- `npm run lint` — ESLint
- `npx tsc --noEmit` — TypeScript
- `npm run build` — production build
- No test framework configured (no test scripts). Claims of tests unverified.

## SEO and Metadata

- Per-tool metadata via `lib/toolMetadata.ts` + `Metadata` export in layout.
- Structured data via `components/ToolJsonLd.tsx`.
- Sitemap/robots: check `app/sitemap.ts` / `app/robots.ts` if present (verify).
- Open Graph/Twitter: verify in metadata implementation.

## Troubleshooting

- TS errors: `npx tsc --noEmit`.
- Build failures: `npm run build`, check env.
- Route conflicts: check duplicate folders under `app/tools`.
- Auth/DB: ensure `AUTH_SECRET`, valid D1 binding.
- Cloudflare: run `npm run build:worker`.

## Contributing Safely

- Keep changes focused; review `git diff` before commit; run lint + type-check + build. Report modified files and results.

Confirmed: pp/sitemap.ts and pp/robots.ts exist.
