import Link from "next/link";

export const metadata = { title: "Order Confirmed" };

export default function CheckoutSuccessPage() {
  return (
    <section className="bg-ink-900 py-20">
      <div className="container-x max-w-xl text-center">
        <div className="text-xs font-medium uppercase tracking-widest text-accent">
          Payment Received
        </div>
        <h1 className="heading-display mt-3 text-4xl font-black text-white sm:text-5xl">
          Order Confirmed
        </h1>
        <p className="mt-4 text-zinc-400">
          Thanks for the order. A confirmation email is on its way. You can wire
          up order detail lookup against the Stripe session in pass two.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-accent-hover"
        >
          Keep Shopping
        </Link>
      </div>
    </section>
  );
}
