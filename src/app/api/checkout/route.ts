import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { getCheckoutRateLimiter, getClientIp } from "@/lib/ratelimit";

const MAX_ITEMS_IN_CART = 20;
const MAX_QUANTITY_PER_ITEM = 99;
const SLUG_PATTERN = /^[a-z0-9-]+$/;

const isProd = process.env.NODE_ENV === "production";

interface CartItem {
  slug: string;
  quantity: number;
}

type ValidationResult =
  | { ok: true; items: CartItem[] }
  | { ok: false; status: number; error: string };

function validate(value: unknown): ValidationResult {
  if (!value || typeof value !== "object") {
    return { ok: false, status: 400, error: "Body must be a JSON object" };
  }
  const body = value as { items?: unknown };
  if (!Array.isArray(body.items)) {
    return { ok: false, status: 400, error: "items must be an array" };
  }
  if (body.items.length === 0) {
    return { ok: false, status: 400, error: "Cart is empty" };
  }
  if (body.items.length > MAX_ITEMS_IN_CART) {
    return {
      ok: false,
      status: 422,
      error: `Too many items (max ${MAX_ITEMS_IN_CART})`
    };
  }

  const items: CartItem[] = [];
  for (const [index, raw] of body.items.entries()) {
    if (!raw || typeof raw !== "object") {
      return {
        ok: false,
        status: 400,
        error: `items[${index}] must be an object`
      };
    }
    const item = raw as { slug?: unknown; quantity?: unknown };

    if (typeof item.slug !== "string" || !SLUG_PATTERN.test(item.slug)) {
      return {
        ok: false,
        status: 400,
        error: `items[${index}].slug must be lowercase letters, digits, and hyphens`
      };
    }
    if (
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > MAX_QUANTITY_PER_ITEM
    ) {
      return {
        ok: false,
        status: 422,
        error: `items[${index}].quantity must be an integer between 1 and ${MAX_QUANTITY_PER_ITEM}`
      };
    }
    if (!getProduct(item.slug)) {
      return {
        ok: false,
        status: 404,
        error: `Unknown product: ${item.slug}`
      };
    }
    items.push({ slug: item.slug, quantity: item.quantity });
  }
  return { ok: true, items };
}

// Production hides internal error details from clients; logs keep the full
// context for Sentry / Vercel logs. Dev returns the raw message for debugging.
function publicErrorMessage(err: unknown, fallback: string): string {
  if (isProd) return fallback;
  return err instanceof Error ? err.message : fallback;
}

export async function POST(request: Request) {
  // Rate limit first — block abuse before parsing input or calling Stripe.
  const limiter = getCheckoutRateLimiter();
  if (limiter) {
    const ip = getClientIp(request);
    const result = await limiter.limit(ip);
    if (!result.success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(result.limit),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": String(result.reset)
          }
        }
      );
    }
  } else if (isProd) {
    console.error(
      "[checkout] Rate limiter not configured in production — refusing request"
    );
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validate(body);
  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.error },
      { status: validation.status }
    );
  }

  const lineItems = validation.items.map((item) => {
    // validate() guarantees the product exists.
    const product = getProduct(item.slug)!;
    return {
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          description: `${product.brand} · ${product.fitment}`
        }
      }
    };
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      // Webhook handler reads this back to persist line items by slug.
      // Stripe metadata caps values at 500 chars — MAX_ITEMS_IN_CART keeps
      // us safely under that.
      metadata: { cart: JSON.stringify(validation.items) }
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe session creation failed", err);
    return NextResponse.json(
      {
        error: publicErrorMessage(
          err,
          "Could not start checkout. Please try again."
        )
      },
      { status: 500 }
    );
  }
}
