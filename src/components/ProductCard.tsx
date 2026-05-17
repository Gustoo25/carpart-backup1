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

export function ProductCard({ product }: ProductCardProps) {
  const onSale =
    product.compareAtCents !== undefined &&
    product.compareAtCents > product.priceCents;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col border border-ink-600 bg-ink-800 transition-colors hover:border-zinc-500"
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
        <div className="absolute bottom-3 right-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          [ product image ]
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          {product.brand} · {product.fitment}
        </div>
        <h3 className="mt-1 text-base font-semibold text-white">
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
