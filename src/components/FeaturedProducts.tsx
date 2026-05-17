import Link from "next/link";
import { PLACEHOLDER_PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export function FeaturedProducts() {
  return (
    <section className="bg-ink-900 py-20">
      <div className="container-x">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-accent">
              Most Popular
            </div>
            <h2 className="heading-display mt-2 text-3xl font-black text-white sm:text-4xl">
              Featured Parts
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white sm:block"
          >
            Shop All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEHOLDER_PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
