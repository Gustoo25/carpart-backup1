# Carbon Storefront

Next.js 15 + TypeScript + Tailwind storefront for a carbon fiber car parts shop, wired for Stripe Checkout with order persistence in Postgres (Neon).

## Stack

- **Next.js 15** (App Router, Server Components by default)
- **React 19**, **TypeScript 5** (strict)
- **Tailwind CSS 3** with a custom dark theme (`ink-*` shades + `accent` red)
- **Stripe** server SDK + `@stripe/stripe-js` for Checkout
- **Postgres on Neon** + **Drizzle ORM** for orders, line items, webhook idempotency
- **Lucide** icons
- Fonts: Inter (body) + Bebas Neue (display) via `next/font/google`

## Quick start

```powershell
npm install
copy .env.example .env.local
# fill in .env.local — Stripe keys + Neon DATABASE_URL + webhook secret
npm run db:push       # sync the schema to your Neon database
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `STRIPE_SECRET_KEY` — server-side, from <https://dashboard.stripe.com/apikeys>. Use a **test** key (`sk_test_...`) until you're ready for real payments.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — client-side counterpart (`pk_test_...`).
- `STRIPE_WEBHOOK_SECRET` — printed by the Stripe CLI when you run `stripe listen` (see "Testing webhooks locally" below).
- `DATABASE_URL` — Neon connection string. Create a project at <https://console.neon.tech> and copy the pooled connection string.
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — used for rate-limiting `/api/checkout`. See "Rate limiting" below. Optional in dev, required in prod.
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` in dev, your real domain in prod. Used for Stripe success/cancel redirects.

## Database (Neon + Drizzle)

Schema lives in `src/lib/db/schema.ts`. Three tables:

- `orders` — one row per completed Stripe Checkout Session
- `order_items` — line items snapshot (product name/brand/fitment/price frozen at purchase time)
- `webhook_events` — idempotency log keyed by Stripe event ID

### Local development workflow

```powershell
npm run db:push       # apply schema changes directly (skip migrations, fastest for dev)
npm run db:studio     # open Drizzle Studio in browser to inspect data
```

### Production workflow

```powershell
npm run db:generate   # generate SQL migration files from schema changes
npm run db:migrate    # apply pending migrations (run in CI/CD)
```

### Neon branching tip

Create a branch off `main` in the Neon dashboard for staging or ML experiments — gives you a 1-second copy of production data, isolated. Set its connection string as a separate `DATABASE_URL` in your staging environment.

## Stripe webhooks

The handler at `POST /api/webhooks/stripe`:

1. Verifies the signature with `STRIPE_WEBHOOK_SECRET` against the raw request body
2. Checks `webhook_events` table for the event ID — short-circuits with 200 if already processed
3. Handles `checkout.session.completed` (persists order + items) and `charge.refunded` (marks order refunded)
4. Logs the event payload to `webhook_events`
5. Returns 200 on success, 500 on failure so Stripe retries

### Testing webhooks locally

Install the Stripe CLI: <https://stripe.com/docs/stripe-cli>

```powershell
# In one terminal, run the dev server
npm run dev

# In another, forward Stripe events to your local handler
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the `whsec_...` it prints into .env.local as STRIPE_WEBHOOK_SECRET, then restart dev.

# In a third terminal, trigger test events
stripe trigger checkout.session.completed
```

Successful events appear in your `orders` table (use `npm run db:studio` to see them).

### Production webhook setup

1. Deploy the app (Vercel recommended).
2. In <https://dashboard.stripe.com/webhooks>, add an endpoint at `https://yourdomain.com/api/webhooks/stripe`.
3. Subscribe to `checkout.session.completed` and `charge.refunded` at minimum.
4. Copy the signing secret to your production env (`STRIPE_WEBHOOK_SECRET`).

## Security headers

Set in `next.config.mjs` via `async headers()`. Applied to every route.

| Header | What it does |
| --- | --- |
| `Content-Security-Policy` | Restricts where scripts, styles, fonts, images, and network requests can come from. Allows Stripe, Upstash, Neon; blocks everything else by default. |
| `X-Frame-Options: DENY` + `frame-ancestors 'none'` | Prevents the site being embedded in iframes (clickjacking defense). |
| `X-Content-Type-Options: nosniff` | Prevents the browser from guessing MIME types. |
| `Referrer-Policy: strict-origin-when-cross-origin` | Don't leak full paths to external sites. |
| `Permissions-Policy` | Deny camera, microphone, geolocation, interest-cohort by default. |
| `Strict-Transport-Security` (prod only) | Force HTTPS for 1 year, includes subdomains, eligible for preload list. |

### Verify

With `npm run dev` running:

```powershell
node scripts/test-security-headers.mjs
```

Prints each header (or flags it missing).

### Known soft spot

`script-src` includes `'unsafe-inline'` because Next.js App Router injects inline `<script>` tags for hydration. To remove it, we'd add per-request nonces via middleware — a v2 upgrade. Until then, the rest of CSP (connect-src, frame-src, form-action, etc.) still blocks scripts from untrusted origins.

### When to retune

Add new domains to `connect-src` whenever you wire up a new external service (analytics, email provider, image CDN). The dev console will log a CSP violation when something gets blocked — that's your signal.

## Rate limiting

`/api/checkout` is protected with a per-IP sliding-window limit of **10 requests per minute** (configurable in `src/lib/ratelimit.ts`). Without it, anyone can spam Stripe session creation against your account.

Backed by [Upstash Redis](https://console.upstash.com) — free tier (10K commands/day) is plenty for early traffic.

### Setup

1. Sign up at <https://console.upstash.com> (Google/GitHub login, instant)
2. Create a Redis database — name it `carbon-storefront-ratelimit`, pick the region closest to your Vercel deployment (e.g. `us-east-1`)
3. From the database page, copy the **REST URL** and **REST Token**
4. Paste into `.env.local` as `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
5. Restart `npm run dev`

### Dev vs prod behavior

- **Dev** without Upstash env vars: rate limiting is disabled, one-time warning in console. Checkout still works.
- **Production** without Upstash env vars: `/api/checkout` returns `503 Service temporarily unavailable`. Fail closed — better to break checkout briefly than silently allow abuse.

### Testing the limit

In dev with Upstash configured, send 11+ POSTs to `/api/checkout` in under a minute. The 11th returns `429 Too many requests` with `X-RateLimit-*` headers showing the policy.

## What's built

- `/` — full homepage (announcement bar, hero, vehicle grid, featured products, features strip, newsletter, footer)
- `/products` — listing
- `/products/[slug]` — detail page
- `/cart` — placeholder
- `/checkout/success` — post-payment landing
- `POST /api/checkout` — creates a Stripe Checkout Session from `{ items: [{ slug, quantity }] }`, embeds the cart in session metadata, **rate-limited 10 req/min per IP**
- `POST /api/webhooks/stripe` — signature-verified webhook handler with idempotency

## What's NOT built yet

- Persistent cart state (recommend Zustand + cookie persistence, or DB-backed)
- Real product images (currently gradient placeholders)
- Filters / sort / search on `/products`
- Variant selection (size, finish) on product detail
- Auth / account pages
- Order history lookup by session ID
- Admin UI for adding/editing products
- CSP / security headers via middleware
- AI catalog assistant (next planned feature — RAG over products with pgvector)

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/             # creates Stripe Checkout Session
│   │   └── webhooks/stripe/      # signature-verified webhook handler
│   ├── cart/
│   ├── checkout/success/
│   ├── products/                 # listing + detail
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
│   ├── db/
│   │   ├── client.ts             # cached Drizzle client (neon-http)
│   │   └── schema.ts             # tables + relations + types
│   ├── config.ts                 # brand identity (one source of truth)
│   ├── products.ts               # placeholder catalog
│   └── stripe.ts                 # cached Stripe client + price formatter
└── types/
drizzle.config.ts                 # drizzle-kit config (reads .env.local)
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:push` | Sync schema to DB directly (dev) |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:migrate` | Apply pending migrations (prod) |
| `npm run db:studio` | Browse the DB in Drizzle Studio |
