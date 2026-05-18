// Next.js calls register() once per runtime when the server starts.
// Routes the appropriate Sentry init based on which runtime is active.
// All inits are no-op when their respective DSN env vars aren't set.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
