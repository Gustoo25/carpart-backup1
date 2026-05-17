import Link from "next/link";

export const metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <section className="bg-ink-900 py-20">
      <div className="container-x">
        <h1 className="heading-display text-4xl font-black text-white sm:text-5xl">
          Your Cart
        </h1>
        <div className="mt-10 border border-ink-600 bg-ink-800 p-12 text-center">
          <p className="text-zinc-400">
            Cart is a placeholder. Wire up persistent cart state (Zustand,
            cookies, or DB) in pass two, then post the line items to{" "}
            <code className="rounded bg-ink-700 px-1.5 py-0.5 text-xs text-zinc-300">
              /api/checkout
            </code>{" "}
            to hand off to Stripe.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-accent-hover"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}
