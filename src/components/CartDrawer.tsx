"use client";

import { X, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-ink-900 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-600 px-6 py-5">
          <div className="flex items-center gap-2 text-white">
            <ShoppingCart className="h-5 w-5 text-accent" />
            <span className="heading-display text-lg font-black uppercase tracking-widest">
              Your Cart
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="rounded p-1 text-zinc-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Empty state */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <ShoppingCart className="h-12 w-12 text-ink-500" />
          <p className="text-sm text-zinc-400">Your cart is empty.</p>
          <Link
            href="/products"
            onClick={onClose}
            className="bg-accent px-6 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-accent-hover"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
}
