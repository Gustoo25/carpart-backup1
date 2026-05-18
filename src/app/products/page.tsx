import { ProductsClient } from "@/components/ProductsClient";

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
            Filter by vehicle to find parts built for your exact model.
          </p>
        </div>

        <ProductsClient />
      </div>
    </section>
  );
}
