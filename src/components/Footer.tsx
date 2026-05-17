import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "By Vehicle", href: "/#vehicles" },
      { label: "Sale", href: "/products?filter=sale" },
      { label: "New Arrivals", href: "/products?filter=new" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/support/shipping" },
      { label: "Returns", href: "/support/returns" },
      { label: "Warranty", href: "/support/warranty" },
      { label: "FAQ", href: "/support/faq" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Contact", href: "/contact" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-ink-600 bg-ink-950 text-zinc-400">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="heading-display text-2xl text-white">
              {SITE_CONFIG.brandName}
            </div>
            <p className="mt-3 max-w-sm text-sm">
              {SITE_CONFIG.brandTagline}. Vehicle-specific carbon fiber, built
              in {SITE_CONFIG.address}.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href={SITE_CONFIG.social.instagram}
                aria-label="Instagram"
                className="rounded border border-ink-500 p-2 hover:border-white hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href={SITE_CONFIG.social.youtube}
                aria-label="YouTube"
                className="rounded border border-ink-500 p-2 hover:border-white hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ink-600 pt-8 text-xs sm:flex-row sm:items-center">
          <div>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.brandName}. All
            rights reserved.
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <span>Secure checkout powered by</span>
            <span className="font-semibold text-zinc-300">Stripe</span>
            <span>·</span>
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>Amex</span>
            <span>·</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
