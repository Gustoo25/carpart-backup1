# Carbon Storefront

Next.js 15 + TypeScript + Tailwind storefront for a carbon fiber car parts shop, wired for Stripe Checkout. First pass focuses on a polished homepage; product detail, cart, checkout, and admin are scaffolded but intentionally minimal.

## Stack

- **Next.js 15** (App Router, Server Components by default)
- **React 19**, **TypeScript 5** (strict)
- **Tailwind CSS 3** with a custom dark theme (`ink-*` shades + `accent` red)
- **Stripe** server SDK + `@stripe/stripe-js` for Checkout
- **Lucide** icons
- Fonts: Inter (body) + Bebas Neue (display) via `next/font/google`

## Quick start

```powershell
npm install
copy .env.example .env.local   # then fill in your Stripe keys
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `STRIPE_SECRET_KEY` — server-side, from <https://dashboard.stripe.com/apikeys>. Use a **test** key (`sk_test_...`) until you're ready for real payments.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — client-side counterpart (`pk_test_...`).
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` in dev, your real domain in prod. Used for Stripe success/cancel redirects.

## What's built

- `/` — full homepage: announcement bar, header, hero, vehicle category grid, featured products, features strip, newsletter, footer
- `/products` — product listing (grid of placeholder products)
- `/products/[slug]` — product detail page
- `/cart` — placeholder
- `/checkout/success` — post-payment landing
- `POST /api/checkout` — creates a Stripe Checkout Session from `{ items: [{ slug, quantity }] }`

## What's NOT built yet (pass two)

- Persistent cart state (recommend Zustand + cookie persistence, or DB-backed)
- Real product images (currently gradient placeholders)
- Filters / sort / search on `/products`
- Variant selection (size, finish) on product detail
- Auth / account pages
- Order history / lookup by Stripe session ID
- Admin UI for adding/editing products
- Newsletter integration (Klaviyo / Mailchimp / ConvertKit)
- SEO meta per product, sitemap, structured data
- Stripe webhook handler (`/api/webhooks/stripe`) for fulfillment

## What to swap before launch

| Where | What |
| --- | --- |
| `src/lib/config.ts` | Brand name, tagline, contact info, announcement bar text, social links, hero copy |
| `src/lib/products.ts` | Replace `PLACEHOLDER_PRODUCTS` with your real catalog. Swap `imageGradient` for a real image URL when you wire up `next/image` |
| `src/components/Hero.tsx` | Hero background — currently CSS gradient + carbon-weave pattern. Swap for a real photo when you have one |
| `tailwind.config.ts` | `accent` color if you want a different highlight |
| `src/app/layout.tsx` | Metadata, fonts if you want a different display family |

## Project structure

```
src/
├── app/                  # routes (App Router)
│   ├── api/checkout/     # Stripe Checkout Session endpoint
│   ├── cart/             # placeholder
│   ├── checkout/success/ # post-payment landing
│   ├── products/         # listing + detail
│   ├── layout.tsx        # root layout (header/footer/fonts)
│   ├── page.tsx          # homepage
│   └── globals.css       # Tailwind + base styles
├── components/           # presentational components
├── lib/                  # config, stripe client, product data
└── types/                # shared TS types
```

## Scripts

- `npm run dev` — dev server with hot reload
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint (Next.js config)
- `npm run typecheck` — `tsc --noEmit`
