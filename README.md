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

## What's built

- `/` — full homepage (announcement bar, hero, vehicle grid, featured products, features strip, newsletter, footer)
- `/products` — listing
- `/products/[slug]` — detail page
- `/cart` — placeholder
- `/checkout/success` — post-payment landing
- `POST /api/checkout` — creates a Stripe Checkout Session from `{ items: [{ slug, quantity }] }`, embeds the cart in session metadata
- `POST /api/webhooks/stripe` — signature-verified webhook handler with idempotency

## What's NOT built yet

- Persistent cart state (recommend Zustand + cookie persistence, or DB-backed)
- Real product images (currently gradient placeholders)
- Filters / sort / search on `/products`
- Variant selection (size, finish) on product detail
- Auth / account pages
- Order history lookup by session ID
- Admin UI for adding/editing products
- Rate limiting on `/api/checkout`
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
