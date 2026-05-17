import { notFound } from "next/navigation";
import clsx from "clsx";
import { getProduct, PLACEHOLDER_PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/stripe";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PLACEHOLDER_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const onSale =
    product.compareAtCents !== undefined &&
    product.compareAtCents > product.priceCents;

  return (
    <section className="bg-ink-900 py-12 lg:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden border border-ink-600 bg-ink-800">
          <div
            className={clsx(
              "h-full w-full bg-gradient-to-br",
              product.imageGradient
            )}
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-carbon-weave bg-carbon-weave opacity-[0.08]"
          />
          <div className="absolute bottom-4 right-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
            [ product image placeholder ]
          </div>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            {product.brand} · {product.fitment}
          </div>
          <h1 className="heading-display mt-2 text-4xl font-black text-white sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">
              {formatPrice(product.priceCents)}
            </span>
            {onSale && product.compareAtCents !== undefined && (
              <span className="text-lg text-zinc-500 line-through">
                {formatPrice(product.compareAtCents)}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-prose text-base text-zinc-300">
            {product.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              className="bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-accent-hover"
            >
              Add To Cart
            </button>
            <button
              type="button"
              className="border border-ink-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:border-white"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-10 border-t border-ink-600 pt-6 text-sm text-zinc-400">
            Free shipping on orders over $500. Hand-laid in {product.brand === "BMW" ? "Lakeland, FL" : "the USA"}.
          </div>
        </div>
      </div>
    </section>
  );
}
