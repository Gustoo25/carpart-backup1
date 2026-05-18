import { NextResponse, type NextRequest } from "next/server";

const isProd = process.env.NODE_ENV === "production";

/**
 * Sets per-request CSP with a cryptographic nonce so we can drop
 * `'unsafe-inline'` from script-src. Next.js detects the x-nonce header
 * we forward and auto-applies the nonce to its injected hydration scripts.
 *
 * 'strict-dynamic' lets scripts loaded BY a nonce'd script also execute —
 * necessary because Next.js chunks its JS and loads pieces dynamically.
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const directives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isProd ? "" : " 'unsafe-eval'"} https://js.stripe.com`,
    `style-src 'self' 'unsafe-inline'`,
    `font-src 'self' data:`,
    `img-src 'self' data: blob: https:`,
    `connect-src 'self' https://api.stripe.com https://*.upstash.io https://*.neon.tech wss://*.neon.tech${isProd ? "" : " ws://localhost:* http://localhost:*"}`,
    `frame-src https://js.stripe.com https://checkout.stripe.com`,
    `form-action 'self' https://checkout.stripe.com`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `frame-ancestors 'none'`,
    ...(isProd ? [`upgrade-insecure-requests`] : [])
  ];
  const csp = directives.join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders }
  });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    {
      // Skip Next.js internals and favicon to avoid running middleware
      // for every static asset request.
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" }
      ]
    }
  ]
};
