import type { Product } from "@/types/product";

// Placeholder catalog. Replace with your real products + image URLs.
// Each product has a CSS gradient placeholder until you supply a real image.

export const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    slug: "front-splitter-g80",
    name: "Front Splitter",
    brand: "BMW",
    fitment: "M3 G80 · 2021+",
    priceCents: 89900,
    compareAtCents: 109900,
    status: "in-stock",
    imageGradient: "from-zinc-800 via-zinc-900 to-black",
    description: "Aggressive front lip, autoclave-cured 2x2 twill."
  },
  {
    slug: "rear-diffuser-civic",
    name: "Rear Diffuser",
    brand: "Honda",
    fitment: "Civic Type R · FL5",
    priceCents: 64900,
    status: "in-stock",
    imageGradient: "from-stone-800 via-zinc-900 to-black",
    description: "OEM-fit diffuser with integrated fins."
  },
  {
    slug: "side-skirts-q60",
    name: "Side Skirts (Pair)",
    brand: "Infiniti",
    fitment: "Q60 · 2017+",
    priceCents: 74900,
    status: "pre-order",
    imageGradient: "from-neutral-800 via-zinc-900 to-black",
    description: "Vehicle-specific fit, double-sided weave."
  },
  {
    slug: "hood-vents-gtr",
    name: "Hood Vents",
    brand: "Nissan",
    fitment: "GT-R · R35",
    priceCents: 42900,
    compareAtCents: 54900,
    status: "in-stock",
    imageGradient: "from-zinc-800 via-stone-900 to-black",
    description: "Functional venting, gloss-clear finish."
  },
  {
    slug: "mirror-caps-wrx",
    name: "Mirror Caps",
    brand: "Subaru",
    fitment: "WRX · 2022+",
    priceCents: 18900,
    status: "in-stock",
    imageGradient: "from-stone-800 via-neutral-900 to-black",
    description: "Snap-on replacement caps, no cutting required."
  },
  {
    slug: "trunk-spoiler-supra",
    name: "Ducktail Spoiler",
    brand: "Toyota",
    fitment: "GR Supra · A90",
    priceCents: 54900,
    status: "in-stock",
    imageGradient: "from-zinc-800 via-zinc-900 to-stone-950",
    description: "Subtle duckbill profile, factory-line fit."
  },
  {
    slug: "steering-wheel-m4",
    name: "Steering Wheel Trim",
    brand: "BMW",
    fitment: "M4 G82 · 2021+",
    priceCents: 32900,
    status: "in-stock",
    imageGradient: "from-neutral-800 via-zinc-900 to-stone-950",
    description: "Direct-replacement upper trim section."
  },
  {
    slug: "interior-trim-kit-civic",
    name: "Interior Trim Kit",
    brand: "Honda",
    fitment: "Civic Si · 2022+",
    priceCents: 49900,
    compareAtCents: 64900,
    status: "in-stock",
    imageGradient: "from-stone-800 via-zinc-900 to-neutral-950",
    description: "Full dash + door trim replacement set."
  },
  {
    slug: "cold-air-intake-q50",
    name: "Cold Air Intake",
    brand: "Infiniti",
    fitment: "Q50 · 3.0T",
    priceCents: 38900,
    compareAtCents: 52900,
    status: "in-stock",
    imageGradient: "from-red-950 via-zinc-900 to-black",
    description: "High-flow intake with heat shield, bolt-on fitment."
  },
  {
    slug: "cat-back-exhaust-q60",
    name: "Cat-Back Exhaust",
    brand: "Infiniti",
    fitment: "Q60 · 3.0T",
    priceCents: 129900,
    compareAtCents: 159900,
    status: "in-stock",
    imageGradient: "from-zinc-700 via-stone-900 to-black",
    description: "Stainless steel cat-back with carbon fiber tips."
  },
  {
    slug: "coilover-kit-g37",
    name: "Coilover Kit",
    brand: "Infiniti",
    fitment: "G37 · 2008–2013",
    priceCents: 89900,
    compareAtCents: 119900,
    status: "in-stock",
    imageGradient: "from-neutral-700 via-zinc-900 to-black",
    description: "32-way adjustable damping, dropped stance."
  },
  {
    slug: "strut-bar-g35",
    name: "Front Strut Bar",
    brand: "Infiniti",
    fitment: "G35 · 2003–2007",
    priceCents: 24900,
    compareAtCents: 34900,
    status: "in-stock",
    imageGradient: "from-zinc-800 via-neutral-900 to-black",
    description: "Billet aluminum tower brace, reduces flex."
  },
  {
    slug: "intercooler-q50-red-sport",
    name: "Front Mount Intercooler",
    brand: "Infiniti",
    fitment: "Q50 Red Sport · 400HP",
    priceCents: 74900,
    compareAtCents: 99900,
    status: "pre-order",
    imageGradient: "from-red-900 via-zinc-900 to-black",
    description: "Drop-in FMIC upgrade, 30% more cooling capacity."
  }
];

export function getProduct(slug: string): Product | undefined {
  return PLACEHOLDER_PRODUCTS.find((p) => p.slug === slug);
}
