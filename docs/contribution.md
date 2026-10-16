# Contribution Guide

See [docs/installation.md](installation.md) and [docs/development.md](development.md).

## Getting Started

1. Clone, install deps.
2. Create branch from main.
3. Run dev server `npm run dev`.
4. Inspect existing code before changes.
5. Keep changes focused.

## Conventions

- TypeScript strict; reuse components in `components/`, libs in `lib/`, shared logic in `shared/`.
- Tailwind CSS v4; lucide-react icons.
- Accessibility and responsive design.
- Avoid duplicate components/utilities.

## Validation

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

## Review

- `git diff`, `git status`.
- Explain changes in PR.
- No real secrets in commits.

## Security

- Never commit secrets; `AUTH_SECRET` must be set as secret.
- D1 and auth changes reviewed carefully.
