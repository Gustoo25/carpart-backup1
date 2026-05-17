import { PLACEHOLDER_PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata = { title: "All Products" };

export default function ProductsPage() {
  return (
    <section className="bg-ink-900 py-20">
      <div className="container-x">
        <div className="mb-10">
          <div className="text-xs font-medium uppercase tracking-widest text-accent">
            Catalog
          </div>
          <h1 className="heading-display mt-2 text-4xl font-black text-white sm:text-5xl">
            All Products
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Placeholder listing. Filters, sort, and pagination land in pass two.
          </p>
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
