// Hits /api/checkout 15 times to verify the 10 req/min rate limit.
// Run: node scripts/test-ratelimit.mjs

const body = JSON.stringify({
  items: [{ slug: "front-splitter-g80", quantity: 1 }]
});

for (let i = 1; i <= 15; i++) {
  try {
    const res = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
    const tag = res.status === 200 ? "ok" : res.status === 429 ? "RATE LIMITED" : "?";
    console.log(`Request ${i.toString().padStart(2)}: ${res.status} (${tag})`);
  } catch (err) {
    console.log(`Request ${i}: failed — ${err.message}`);
  }
}
