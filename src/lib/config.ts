// Edit this file to brand the site. One source of truth for shop-wide settings.

export const SITE_CONFIG = {
  brandName: "APEX CARBON",
  brandTagline: "Precision Carbon Fiber",
  email: "hello@apexcarbon.example",
  phone: "+1 (555) 010-1234",
  address: "Lakeland, FL",
  announcement: "🔥 Huge Summer Sale — Shop Now & Save Big! May 5 Through September 15, 2026 — Limited Time Only 🔥",
  social: {
    instagram: "https://instagram.com/your-handle",
    youtube: "https://youtube.com/@your-channel",
    tiktok: "https://tiktok.com/@your-handle"
  },
  hero: {
    eyebrow: "Built To Be Seen · Made To Stand Apart · Engineered To Perform",
    headline: "More Than A Build.\nA Statement.",
    sub: "Vehicle-specific carbon fiber and performance parts crafted for enthusiasts who expect factory-level fit with aggressive styling.",
    ctaPrimary: { label: "Shop The Collection", href: "/products" },
    ctaSecondary: { label: "Find Your Vehicle", href: "#vehicles" }
  }
} as const;

export const INFINITI_MODELS = [
  {
    model: "Q50",
    slug: "q50",
    image: "/models/q50.jpg",
    years: [
      { label: "2014–2017", value: "2014-2017" },
      { label: "2018+", value: "2018-plus" },
    ],
  },
  {
    model: "Q60",
    slug: "q60",
    image: "/models/q60.jpg",
    years: [{ label: "2017–2024", value: "2017-2024" }],
  },
  {
    model: "G35",
    slug: "g35",
    image: "/models/g35.jpg",
    years: [{ label: "2003–2007", value: "2003-2007" }],
  },
  {
    model: "G37",
    slug: "g37",
    image: "/models/g37.jpg",
    years: [{ label: "2008–2013", value: "2008-2013" }],
  },
];
