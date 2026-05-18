"use client";

import { useState } from "react";
import { PLACEHOLDER_PRODUCTS } from "@/lib/products";
import { INFINITI_MODELS } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";

const FILTERS = [
  { label: "All Vehicles", value: "all" },
  ...INFINITI_MODELS.map((m) => ({ label: m.model, value: m.slug }))
];

export function ProductsClient() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? PLACEHOLDER_PRODUCTS
      : PLACEHOLDER_PRODUCTS.filter((p) =>
          p.fitment.toLowerCase().includes(
            INFINITI_MODELS.find((m) => m.slug === active)?.model.toLowerCase() ?? ""
          )
        );

  return (
    <>
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActive(f.value)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors ${
              active === f.value
                ? "bg-accent text-white"
                : "border border-ink-500 bg-ink-800 text-zinc-300 hover:border-accent hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-zinc-400">
          <p className="text-sm uppercase tracking-widest">No products found for this vehicle yet.</p>
          <p className="mt-2 text-xs text-zinc-500">Check back soon — new fitments drop regularly.</p>
        </div>
      )}
    </>
  );
}
