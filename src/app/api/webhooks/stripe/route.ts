import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import type Stripe from "stripe";
import { eq } from "drizzle-orm";
import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db/client";
import {
  orders,
  orderItems,
  webhookEvents,
  type ShippingAddress
} from "@/lib/db/schema";
import { getProduct } from "@/lib/products";

// Webhook endpoint must run in the Node runtime (needs raw request body for
// signature verification, and the Stripe SDK isn't Edge-compatible).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CartItem {
  slug: string;
  quantity: number;
}

function parseCart(metadata: Stripe.Metadata | null): CartItem[] {
  const raw = metadata?.cart;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item: unknown): item is CartItem =>
        !!item &&
        typeof item === "object" &&
        typeof (item as CartItem).slug === "string" &&
        typeof (item as CartItem).quantity === "number" &&
        (item as CartItem).quantity > 0
    );
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const db = getDb();

  const alreadyProcessed = await db
    .select({ id: webhookEvents.id })
    .from(webhookEvents)
    .where(eq(webhookEvents.id, event.id))
    .limit(1);

  if (alreadyProcessed.length > 0) {
    return NextResponse.json({ received: true, replay: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      case "charge.refunded":
        await handleChargeRefunded(event.data.object);
        break;
      default:
        // Other events are logged for audit but not acted on.
        break;
    }

    await db.insert(webhookEvents).values({
      id: event.id,
      type: event.type,
      payload: event as unknown as Record<string, unknown>
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    // Return 500 so Stripe retries delivery. Idempotency check above
    // prevents double-processing on the eventual successful retry.
    console.error(`Failed to process Stripe event ${event.id}`, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const cart = parseCart(session.metadata);
  const db = getDb();

  const email =
    session.customer_details?.email ?? session.customer_email ?? "unknown";
  const name = session.customer_details?.name ?? null;

  const shipping = session.shipping_details?.address ?? null;
  const shippingAddress: ShippingAddress | null = shipping
    ? {
        line1: shipping.line1 ?? null,
        line2: shipping.line2 ?? null,
        city: shipping.city ?? null,
        state: shipping.state ?? null,
        postal_code: shipping.postal_code ?? null,
        country: shipping.country ?? null
      }
    : null;

  const orderId = randomUUID();

  await db.insert(orders).values({
    id: orderId,
    stripeSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : null,
    status: "paid",
    amountTotalCents: session.amount_total ?? 0,
    currency: session.currency ?? "usd",
    customerEmail: email,
    customerName: name,
    shippingAddress
  });

  const itemRows = cart
    .map((item) => {
      const product = getProduct(item.slug);
      if (!product) {
        console.warn(
          `Order ${orderId}: unknown product slug '${item.slug}' — skipping line`
        );
        return null;
      }
      return {
        orderId,
        productSlug: item.slug,
        productName: product.name,
        productBrand: product.brand,
        productFitment: product.fitment,
        quantity: item.quantity,
        unitPriceCents: product.priceCents,
        subtotalCents: product.priceCents * item.quantity
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  if (itemRows.length > 0) {
    await db.insert(orderItems).values(itemRows);
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId =
    typeof charge.payment_intent === "string" ? charge.payment_intent : null;
  if (!paymentIntentId) return;

  const db = getDb();
  await db
    .update(orders)
    .set({ status: "refunded", updatedAt: new Date() })
    .where(eq(orders.stripePaymentIntentId, paymentIntentId));
}
