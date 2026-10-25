import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const base = new URL(process.argv[2] || "http://localhost:3100");
const samples = Number(process.argv[3] || 5);
assert(
  Number.isInteger(samples) && samples > 0,
  "Sample count must be positive"
);
const paths = [
  "/",
  "/travel",
  "/posts/2026-09-24-i-sometimes-forget-that-i-am-deaf",
  "/posts/2026-08-03-nginx-in-production",
];
const observations = [];

for (const pathname of paths) {
  for (let sample = 0; sample < samples; sample++) {
    for (const accept of ["text/html", "text/markdown"]) {
      const start = performance.now();
      const response = await fetch(new URL(pathname, base), {
        headers: { accept },
      });
      const headersMs = performance.now() - start;
      const body = await response.text();
      assert.equal(response.status, 200, `${pathname} ${accept} status`);
      assert(
        response.headers.get("content-type")?.includes(accept),
        `${pathname} ${accept} content type`
      );
      assert(
        accept === "text/html"
          ? body.includes("<html")
          : body.startsWith("#") || body.length > 100,
        "Response contains the requested document"
      );
      if (accept === "text/html") {
        assert.equal(
          (body.match(/<main[\s>]/g) || []).length,
          1,
          "One main landmark"
        );
        assert(
          !body.includes("fonts.googleapis.com"),
          "No blocking external font stylesheet"
        );
        for (const match of body.matchAll(/<img\b[^>]*>/gi)) {
          assert(
            /\bsrc="\/assets\/images\//.test(match[0]),
            `First-party static image ${match[0]}`
          );
          assert(
            /\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]),
            "Image dimensions reserve layout space"
          );
        }
        for (const match of body.matchAll(
          /<img\b[^>]*loading="lazy"[^>]*>/gi
        )) {
          assert(
            /\bsrcset=/i.test(match[0]),
            "Body image has static responsive variants"
          );
        }
      }
      observations.push({
        pathname,
        accept,
        sample,
        headersMs,
        totalMs: performance.now() - start,
        bytes: Buffer.byteLength(body),
        cloudflare: response.headers.get("cf-cache-status"),
        vercel: response.headers.get("x-vercel-cache"),
        cacheControl: response.headers.get("cache-control"),
        cloudflareControl: response.headers.get("cloudflare-cdn-cache-control"),
        vary: response.headers.get("vary"),
      });
    }
  }
}

const manifest = JSON.parse(
  await readFile(new URL("../lib/image-manifest.json", import.meta.url), "utf8")
);
const assets = [];
for (const pathname of Object.keys(manifest).slice(0, 3)) {
  const response = await fetch(new URL(pathname, base));
  const bytes = (await response.arrayBuffer()).byteLength;
  assert.equal(response.status, 200, `Static image ${pathname}`);
  assert(
    response.headers.get("content-type")?.includes("image/webp"),
    "Static WebP content type"
  );
  assert(
    response.headers.get("cache-control")?.includes("31536000"),
    "One-year browser image TTL"
  );
  assert(
    response.headers.get("cache-control")?.includes("immutable"),
    "Hashed images are immutable"
  );
  assert(
    response.headers.get("cloudflare-cdn-cache-control")?.includes("31536000"),
    "One-year Cloudflare image TTL"
  );
  assert(
    !response.headers
      .get("vary")
      ?.toLowerCase()
      .split(",")
      .map((header) => header.trim())
      .includes("accept"),
    "Images bypass representation negotiation"
  );
  assert(bytes > 0, "Image body was transferred");
  assets.push({
    pathname,
    bytes,
    cloudflare: response.headers.get("cf-cache-status"),
    cacheControl: response.headers.get("cache-control"),
  });
}

for (const pathname of paths) {
  for (const accept of ["text/html", "text/markdown"]) {
    const times = observations
      .filter((row) => row.pathname === pathname && row.accept === accept)
      .map((row) => row.totalMs)
      .sort((a, b) => a - b);
    console.error(
      JSON.stringify({
        pathname,
        accept,
        samples,
        minMs: times[0],
        medianMs: times[Math.ceil(samples / 2) - 1],
        maxMs: times.at(-1),
        ...(samples >= 100
          ? { empiricalP99Ms: times[Math.ceil(samples * 0.99) - 1] }
          : {}),
      })
    );
  }
}
console.log(
  JSON.stringify(
    {
      base: base.href,
      measured:
        "Sequential full GETs including response body, reused connections, one client location. These samples do not establish global production p99 or browser load time.",
      errors: 0,
      observations,
      assets,
    },
    null,
    2
  )
);
