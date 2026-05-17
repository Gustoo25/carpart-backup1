import { config } from "dotenv";
import type { Config } from "drizzle-kit";

// Next.js convention: .env.local overrides .env. drizzle-kit runs outside
// Next, so we load both manually.
config({ path: ".env.local" });
config({ path: ".env" });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL not set. Add it to .env.local (see .env.example)."
  );
}

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url }
} satisfies Config;
