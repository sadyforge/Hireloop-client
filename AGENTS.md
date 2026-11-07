<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop client

Next.js 16 (App Router) + Tailwind v4 + shadcn/ui. Single app at repo root, npm-managed (`package-lock.json` — don't use pnpm/yarn). No test framework is configured; no CI. Verify changes with `npm run typecheck && npm run lint`, and `npm run build` as the final check.

## Commands (npm)

- `npm run dev` — dev server (Turbopack; it's the default bundler for dev and build in Next 16)
- `npm run lint` — ESLint CLI (Next 16 removed `next lint` and lint-during-build)
- `npm run typecheck` — `tsc --noEmit`
- `npm run build` — production build; also validates route types
- `npm run format` — Prettier on `**/*.{ts,tsx}` only (CSS/JSON not covered by this script)

## Next.js 16 notes

Before writing routes/layouts/config, read the matching guide in `node_modules/next/dist/docs/` (see block above). Verified gotchas:

- Middleware is now `proxy.ts` (the `middleware.ts` convention is gone).
- `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are async — always `await` them (synchronous access is deprecated).
- App Router code lives in `app/`; alias `@/*` maps to the repo root — there is no `src/`.

## Tailwind v4 + shadcn/ui ("base-nova" style)

- Tailwind is CSS-first: there is no `tailwind.config.js`. Theme tokens, the `@theme` mapping, and the dark variant (`@custom-variant dark`, class-based) are all in `app/globals.css`.
- shadcn components in `components/ui/` wrap `@base-ui/react` primitives — **not** Radix. Don't import `@radix-ui/*` or expect Radix props. Add components with `npx shadcn@latest add <name>` (see README.md).
- `lib/utils.ts` only re-exports the `cn` npm package; import `{ cn } from "@/lib/utils"` in app code.

## Formatting (`package.json` / `.prettierrc`)

No semicolons, double quotes, 2-space indent, LF line endings, max width 80, and `prettier-plugin-tailwindcss` sorts classes inside `cn`/`cva` calls.
