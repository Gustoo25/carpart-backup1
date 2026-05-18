import { withSentryConfig } from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

// CSP is set per-request in middleware.ts (with a fresh nonce) so we can
// drop 'unsafe-inline' from script-src. The headers below are static and
// apply to every route regardless of method.
const securityHeaders = [
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

// withSentryConfig is silent without SENTRY_AUTH_TOKEN. When Adrian wires
// up his Sentry org/project/auth token, source maps get uploaded on build.
// Until then, this is a no-op wrapper and the runtime SDK is also no-op
// (no NEXT_PUBLIC_SENTRY_DSN configured).
export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: {
    // Delete source maps after upload so we never serve them publicly.
    // When no SENTRY_AUTH_TOKEN is set, nothing uploads but maps are
    // still deleted from the build output.
    deleteSourcemapsAfterUpload: true
  }
});
