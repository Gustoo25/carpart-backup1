import Link from "next/link";
import clsx from "clsx";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/stripe";

interface ProductCardProps {
  product: Product;
}

const STATUS_LABEL: Record<Product["status"], string> = {
  "in-stock": "In Stock",
  "pre-order": "Pre-Order",
  "sold-out": "Sold Out"
};

function stockCount(slug: string): number {
  const seed = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (seed % 7) + 1;
}

export function ProductCard({ product }: ProductCardProps) {
  const onSale =
    product.compareAtCents !== undefined &&
    product.compareAtCents > product.priceCents;

  const left = stockCount(product.slug);
  const lowStock = product.status === "in-stock" && left <= 5;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col border border-ink-600 bg-ink-800 transition-all duration-300 hover:border-accent hover:shadow-[0_0_24px_rgba(220,38,38,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className={clsx(
            "h-full w-full bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
            product.imageGradient
          )}
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-carbon-weave bg-carbon-weave opacity-[0.08]"
        />

        {/* Accent sweep bar */}
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" />

        <div className="absolute left-3 top-3 flex gap-2">
          {onSale && (
            <span className="bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              Sale
            </span>
          )}
          <span className="border border-ink-500 bg-ink-900/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-300 backdrop-blur">
            {STATUS_LABEL[product.status]}
          </span>
        </div>

        {/* Low stock badge */}
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

      <div className="flex flex-1 flex-col p-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          {product.brand} · {product.fitment}
        </div>
        <h3 className="mt-1 text-base font-semibold text-white transition-colors group-hover:text-accent">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">
            {formatPrice(product.priceCents)}
          </span>
          {onSale && product.compareAtCents !== undefined && (
            <span className="text-sm text-zinc-500 line-through">
              {formatPrice(product.compareAtCents)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
