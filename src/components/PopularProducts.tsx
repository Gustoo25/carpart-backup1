"use client";

import Link from "next/link";
import clsx from "clsx";
import { PLACEHOLDER_PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/stripe";
import type { Product } from "@/types/product";

const ROW_ONE = PLACEHOLDER_PRODUCTS;

function slugSeed(slug: string) {
  return slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

function getOriginalPrice(product: Product): number {
  const extra = 20000 + (slugSeed(product.slug) % 30001);
  return product.priceCents + extra;
}

function stockCount(slug: string): number {
  return (slugSeed(slug) % 7) + 1;
}

function MarqueeCard({ product }: { product: Product }) {
  const originalPrice = getOriginalPrice(product);
  const left = stockCount(product.slug);
  const lowStock = left <= 4;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative w-56 flex-shrink-0 overflow-hidden border border-ink-500 bg-ink-800 transition-all duration-500 hover:border-accent hover:shadow-[0_0_35px_rgba(220,38,38,0.4)] sm:w-64"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden sm:h-48">
        <div
          className={clsx(
            "h-full w-full bg-gradient-to-br transition-transform duration-700 group-hover:scale-110",
            product.imageGradient
          )}
        />
        <div className="absolute inset-0 bg-carbon-weave opacity-[0.08]" />
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" />

        <span className="absolute left-3 top-3 bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          Sale
        </span>

        {/* Low stock */}
        {lowStock && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">
              Only {left} left!
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          {product.brand} · {product.fitment}
        </div>
        <h3 className="mt-1 text-sm font-semibold text-white transition-colors duration-300 group-hover:text-accent sm:text-base">
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-red-500 sm:text-lg">
            {formatPrice(product.priceCents)}
          </span>
          <span className="text-xs text-zinc-500 line-through sm:text-sm">
            {formatPrice(originalPrice)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function MarqueeRow({ products }: { products: Product[] }) {
  return (
    <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
      {[...products, ...products, ...products, ...products].map((product, i) => (
        <MarqueeCard key={`${product.slug}-${i}`} product={product} />
      ))}
    </div>
  );
}

export function PopularProducts() {
  return (
    <section id="popular" className="overflow-hidden bg-ink-950 py-20">
      <div className="container-x mb-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="skew-badge mb-3">
              <span>Best Sellers</span>
            </div>
            <h2 className="heading-display text-3xl font-black text-white sm:text-4xl">
              Popular Products
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Hover to pause. Click any card to view details.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white sm:block"
          >
            Shop All &rarr;
          </Link>
        </div>
      </div>

      <div className="relative flex flex-col gap-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent sm:w-32" />
        <MarqueeRow products={ROW_ONE} />
      </div>
    </section>
  );
}
