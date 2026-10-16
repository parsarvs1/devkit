# Tool Development Guide

See [docs/development.md](development.md).

## Add a new tool

Mandatory:
1. Pick slug, create `app/tools/<slug>/page.tsx` and `layout.tsx`.
2. Layout mirrors `app/tools/json-formatter/layout.tsx`: metadata via `toolMetadata("<slug>")`, `ToolJsonLd`.
3. Add shared logic to `shared/`.
4. Register in `data/tools.ts` (name, description, icon, href, category).
5. Implement loading/empty/error states.

Optional:
- RelatedTools, usage tracking, share state (see json-formatter page).

## UI conventions

Tailwind, lucide icons, client component with `"use client"`. Mobile responsive.

## Metadata/SEO

Handled by toolMetadata + ToolJsonLd; sitemap/robots via `app/sitemap.ts`, `app/robots.ts`.

## Test

`npm run dev`, open `/tools/<slug>`, lint + tsc.
