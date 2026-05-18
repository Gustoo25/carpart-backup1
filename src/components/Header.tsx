"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { CartDrawer } from "@/components/CartDrawer";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Vehicles", href: "/#vehicles" },
  { label: "Carbon Fiber Wheels", href: "/products?category=wheels" },
  { label: "Performance Parts", href: "/products?category=performance" },
  { label: "Popular Products", href: "/products?filter=popular" },
  { label: "Sale", href: "/products?filter=sale" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

const DESKTOP_NAV_LINKS = NAV_LINKS.filter(
  (l) => l.label !== "Vehicles" && l.label !== "Sale"
);

export function Header() {
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(href.split("?")[0].replace("/#", "/")));
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="heading-display text-2xl font-black tracking-widest text-white hover:text-red-200 sm:text-3xl"
          >
            {SITE_CONFIG.brandName}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 xl:flex xl:gap-5">
            {DESKTOP_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-colors hover:text-red-200 ${isActive(link.href) ? "border-b-2 border-white pb-0.5 text-white" : "text-white"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop icons */}
          <div className="hidden items-center gap-1 text-white xl:flex">
            <button type="button" aria-label="Search" className="rounded p-2.5 hover:text-accent">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/account" aria-label="Account" className="rounded p-2.5 hover:text-accent">
              <User className="h-5 w-5" />
            </Link>
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
              className="relative rounded p-2.5 hover:text-accent"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                0
              </span>
            </button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex items-center gap-1 xl:hidden">
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
              className="relative rounded p-3 text-white hover:text-red-200"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                0
              </span>
            </button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileNavOpen(true)}
              className="rounded p-3 text-white hover:text-red-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav backdrop */}
      <div
        onClick={() => setMobileNavOpen(false)}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Mobile nav drawer */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-ink-900 shadow-2xl transition-transform duration-300 xl:hidden ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-ink-600 px-6 py-5">
          <span className="heading-display text-xl font-black tracking-widest text-white">
            {SITE_CONFIG.brandName}
          </span>
          <button
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
            className="rounded p-2 text-zinc-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileNavOpen(false)}
              className={`border-b border-ink-600 py-4 text-base font-black uppercase tracking-widest whitespace-nowrap transition-colors hover:text-accent ${isActive(link.href) ? "text-accent" : "text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t border-ink-600 px-6 py-6">
          <button type="button" aria-label="Search" className="rounded p-3 text-zinc-400 hover:text-white">
            <Search className="h-6 w-6" />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            onClick={() => setMobileNavOpen(false)}
            className="rounded p-3 text-zinc-400 hover:text-white"
          >
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
