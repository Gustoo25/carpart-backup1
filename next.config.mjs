const isProd = process.env.NODE_ENV === "production";

// CSP directives. Tighter in production.
//
// 'unsafe-inline' is required in script-src because Next.js App Router
// injects inline <script> tags for hydration. The upgrade path is
// per-request nonces generated in middleware — solid v2 work but more
// involved. Until then, the rest of CSP still blocks scripts from
// untrusted origins.
const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    ...(isProd ? [] : ["'unsafe-eval'"]),
    "https://js.stripe.com"
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "font-src": ["'self'", "data:"],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "connect-src": [
    "'self'",
    "https://api.stripe.com",
    "https://*.upstash.io",
    "https://*.neon.tech",
    "wss://*.neon.tech",
    ...(isProd ? [] : ["ws://localhost:*", "http://localhost:*"])
  ],
  "frame-src": ["https://js.stripe.com", "https://checkout.stripe.com"],
  "form-action": ["'self'", "https://checkout.stripe.com"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
  "frame-ancestors": ["'none'"]
};

if (isProd) cspDirectives["upgrade-insecure-requests"] = [];

const csp = Object.entries(cspDirectives)
  .map(([directive, sources]) =>
    sources.length === 0 ? directive : `${directive} ${sources.join(" ")}`
  )
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  },
  { key: "X-DNS-Prefetch-Control", value: "on" }
];

if (isProd) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload"
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" }
    ]
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  }
};

export default nextConfig;
