// HEADs the dev server and prints all security headers so you can confirm
// they're being applied. Run: node scripts/test-security-headers.mjs

const url = process.argv[2] ?? "http://localhost:3000/";

const expected = [
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-dns-prefetch-control",
  "strict-transport-security"
];

const res = await fetch(url, { method: "HEAD" });
console.log(`HEAD ${url} → ${res.status}\n`);

let missing = 0;
for (const name of expected) {
  const value = res.headers.get(name);
  if (value === null) {
    console.log(`  ❌ ${name}: not set`);
    missing++;
  } else {
    const display = value.length > 100 ? value.slice(0, 100) + "..." : value;
    console.log(`  ✓  ${name}: ${display}`);
  }
}

console.log(
  `\n${missing === 0 ? "All expected headers present." : `${missing} header(s) missing.`}`
);
console.log(
  "Note: strict-transport-security is intentionally omitted in dev (set only when NODE_ENV=production)."
);
