"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Catches React rendering errors at the root level and forwards them to
// Sentry. Without this, root-render errors slip past instrumentation.
export default function GlobalError({
  error
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#ffffff",
            fontFamily: "system-ui, sans-serif",
            padding: "2rem",
            textAlign: "center"
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Something broke.
          </h1>
          <p style={{ marginTop: "1rem", color: "#a0a0a0" }}>
            We&apos;ve been notified. Try refreshing — or come back in a few
            minutes.
          </p>
        </div>
      </body>
    </html>
  );
}
