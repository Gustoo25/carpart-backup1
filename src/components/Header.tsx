import Link from "next/link";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Vehicles", href: "/#vehicles" },
  { label: "Sale", href: "/products?filter=sale" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-600 bg-ink-900/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6 !pl-0">
        <Link
          href="/"
          className="heading-display text-3xl font-black tracking-widest text-white hover:text-accent"
        >
          {SITE_CONFIG.brandName}
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          className="rounded p-2 text-zinc-300 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base font-bold uppercase tracking-wider text-white transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-white">
          <button
            type="button"
            aria-label="Search"
            className="rounded p-2 hover:text-accent"
          >
            <Search className="h-6 w-6" />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="rounded p-2 hover:text-accent"
          >
            <User className="h-6 w-6" />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded p-2 hover:text-accent"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
