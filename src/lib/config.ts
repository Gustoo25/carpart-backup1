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

export const VEHICLE_BRANDS = [
  "BMW",
  "Honda",
  "Infiniti",
  "Nissan",
  "Subaru",
  "Toyota"
] as const;
