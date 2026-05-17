import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

interface CheckoutLineItem {
  slug: string;
  quantity: number;
}

interface CheckoutRequestBody {
  items: CheckoutLineItem[];
}

function isValidBody(value: unknown): value is CheckoutRequestBody {
  if (!value || typeof value !== "object") return false;
  const maybe = value as { items?: unknown };
  if (!Array.isArray(maybe.items) || maybe.items.length === 0) return false;
  return maybe.items.every((item) => {
    if (!item || typeof item !== "object") return false;
    const line = item as { slug?: unknown; quantity?: unknown };
    return (
      typeof line.slug === "string" &&
      typeof line.quantity === "number" &&
      line.quantity > 0
    );
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return NextResponse.json(
      { error: "Body must be { items: [{ slug, quantity }] }" },
      { status: 400 }
    );
  }

  const lineItems = body.items.map((item) => {
    const product = getProduct(item.slug);
    if (!product) {
      throw new Response(`Unknown product: ${item.slug}`, { status: 400 });
    }
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
      // Stripe metadata caps values at 500 chars — fine for ~10 items.
      // If carts ever get larger, store the cart in the DB and put its
      // ID here instead.
      metadata: { cart: JSON.stringify(body.items) }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Stripe session failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
