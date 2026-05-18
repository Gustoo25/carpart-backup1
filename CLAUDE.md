# Project Instructions

Next.js 15 storefront for carbon fiber car parts. Stripe Checkout, Neon Postgres, rate-limited APIs. Two-person team: Adrian on backend, Gus on frontend.

## Branch convention

Each developer works on their own branch. `main` is the integration branch.

- **Adrian** → `Adrian-Branch` (backend: API routes, DB schema, webhooks, auth, ML, security)
- **Gus** → `gus` (frontend: cart UI, checkout flow, product pages, design polish)
- **`main`** — only updated by merging a reviewed feature branch in. Don't push to it directly.

**Agent rules:**
- Adrian's agent: default commits/pushes to `Adrian-Branch`. Never touch `gus`.
- Gus's agent: default commits/pushes to `gus`. Never touch `Adrian-Branch`.
- Neither agent pushes to `main` without explicit user ask (typically only when merging finished work).

Standard safety: show the diff before committing, never force-push, never commit without an explicit user ask.

## Stack

- Next.js 15 (App Router, Server Components by default), React 19, TypeScript strict
- Tailwind 3, dark theme (`ink-*` shades + `accent` red, Bebas Neue display + Inter body)
- Stripe (Checkout redirect flow, server SDK 17.x)
- Neon Postgres + Drizzle ORM (`neon-http` driver)
- Upstash Redis (rate limiting on `/api/checkout`)
- Lucide icons, `next/font/google`

## What's working

- `/` — homepage (announcement bar, header, hero, vehicle grid, featured products, features strip, newsletter, footer)
- `/products`, `/products/[slug]` — listing + detail (placeholder products)
- `/cart`, `/checkout/success` — placeholder pages
- `POST /api/checkout` — creates Stripe Checkout Session. **Rate-limited 10 req/min per IP** (Upstash). Cart embedded in session metadata so the webhook can rebuild line items by slug.
- `POST /api/webhooks/stripe` — **signature-verified** raw-body handler. **Idempotent** via `webhook_events` table keyed on Stripe event ID. Handles `checkout.session.completed` (persists order + items) and `charge.refunded` (marks order refunded). Returns 500 on failure so Stripe retries.
- **Security headers** on every route via `next.config.mjs`: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy denying camera/mic/geo, HSTS (prod only).

## What's stubbed / placeholder

- **Cart state** — no persistence; Gus's first task. Recommend Zustand + cookie or DB-backed.
- **Real product images** — currently CSS gradients with `[ product image ]` labels.
- **Filters / sort / search** on `/products`.
- **Variant selection** on product detail.
- **Admin UI** — none.
- **Auth** — none.
- **AI catalog assistant** — planned (pgvector + embeddings).

## Environment vars

Copy `.env.example` to `.env.local` and fill in:

| Var | Source |
| --- | --- |
| `STRIPE_SECRET_KEY` | <https://dashboard.stripe.com/test/apikeys> |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | same dashboard |
| `STRIPE_WEBHOOK_SECRET` | printed by `stripe listen` CLI |
| `DATABASE_URL` | <https://console.neon.tech> (pooled connection string) |
| `UPSTASH_REDIS_REST_URL` | <https://console.upstash.com> |
| `UPSTASH_REDIS_REST_TOKEN` | same dashboard |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` in dev |

## Setup

```powershell
npm install
copy .env.example .env.local   # fill in values
npm run db:push                # sync Drizzle schema to Neon
npm run dev
```

Webhook testing (separate terminals):
```powershell
stripe listen --forward-to localhost:3000/api/webhooks/stripe   # terminal 2
stripe trigger checkout.session.completed                       # terminal 3
```

## Dev scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run db:push` | Sync schema to DB (dev) |
| `npm run db:generate` / `db:migrate` | Migration generate + apply (prod) |
| `npm run db:studio` | Browse DB at `local.drizzle.studio` |
| `node scripts/test-ratelimit.mjs` | Fire 15 requests; verify rate limit triggers after 10 |
| `node scripts/test-security-headers.mjs` | Print security headers from running dev server |

## Integration contract for the cart (Gus)

The cart UI POSTs to `/api/checkout` with this shape:

```json
{
  "items": [
    { "slug": "front-splitter-g80", "quantity": 1 },
    { "slug": "rear-diffuser-civic", "quantity": 2 }
  ]
}
```

Response on success: `{ "url": "https://checkout.stripe.com/c/pay/..." }` — redirect the user there with `window.location.href = url`.

- Product slugs live in `src/lib/products.ts`. Validated server-side.
- Endpoint is rate-limited (10 req/min per IP). UI should show a "slow down" message on 429.
- After payment, Stripe redirects back to `/checkout/success?session_id={CHECKOUT_SESSION_ID}`.

## Code conventions

- TypeScript strict; no `any` without a documented reason
- Files under `src/`, imports use `@/*` alias
- Functions single-responsibility, ~30 lines max
- Comments explain WHY, not WHAT
- Pin dep versions in `package.json` (no `^` or `~`)
- Tailwind utility classes; custom utilities go in `globals.css` under `@layer utilities`
- Shared types in `src/types/`, business logic in `src/lib/`, presentation in `src/components/`

## Key files for orientation

- `src/lib/config.ts` — brand identity (one source of truth)
- `src/lib/products.ts` — placeholder catalog
- `src/lib/db/schema.ts` — Postgres tables (`orders`, `order_items`, `webhook_events`)
- `src/lib/stripe.ts` — cached Stripe client + price formatter
- `src/lib/ratelimit.ts` — Upstash sliding-window limiter
- `next.config.mjs` — security headers config (CSP whitelist for Stripe, Upstash, Neon)
