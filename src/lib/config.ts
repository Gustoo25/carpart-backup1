// Edit this file to brand the site. One source of truth for shop-wide settings.

export const SITE_CONFIG = {
  brandName: "APEX CARBON",
  brandTagline: "Precision Carbon Fiber",
  email: "hello@apexcarbon.example",
  phone: "+1 (555) 010-1234",
  address: "Lakeland, FL",
  announcement: "FREE SHIPPING ON ORDERS OVER $500 — LIMITED TIME",
  social: {
    instagram: "https://instagram.com/your-handle",
    youtube: "https://youtube.com/@your-channel",
    tiktok: "https://tiktok.com/@your-handle"
  },
  hero: {
    eyebrow: "Hand-laid · Autoclave-cured · Vehicle-specific",
    headline: "Built For The Cars You Love",
    sub: "Genuine 2x2 twill carbon fiber upgrades, engineered for fit and finished to last.",
    ctaPrimary: { label: "Shop The Collection", href: "/products" },
    ctaSecondary: { label: "Find Your Vehicle", href: "#vehicles" }
  }
} as const;

export const VEHICLE_BRANDS = [
  "BMW",
  "Honda",
  "Infiniti",
  "Nissan",
  "Subaru",
  "Toyota"
] as const;
