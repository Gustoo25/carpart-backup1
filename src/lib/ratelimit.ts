import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const REQUESTS_PER_MINUTE = 10;

let cached: Ratelimit | null = null;
let warnedOnce = false;

/**
 * Returns a sliding-window rate limiter for the checkout endpoint, or null
 * when Upstash isn't configured. In dev, missing env vars log a one-time
 * warning and disable rate limiting. In production, callers must fail
 * closed when this returns null — never silently allow unlimited traffic.
 */
export function getCheckoutRateLimiter(): Ratelimit | null {
  if (cached) return cached;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (!warnedOnce && process.env.NODE_ENV !== "production") {
      console.warn(
        "[ratelimit] UPSTASH_REDIS_REST_URL/TOKEN not set — rate limiting disabled in dev."
      );
      warnedOnce = true;
    }
    return null;
  }

  cached = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(REQUESTS_PER_MINUTE, "1 m"),
    analytics: true,
    prefix: "ratelimit:checkout"
  });
  return cached;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
