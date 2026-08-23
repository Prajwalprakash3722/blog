const SITE_URL = "https://blog.devcoffee.me";

function parseAccept(header) {
  if (!header || !header.trim()) return [];

  return header
    .split(",")
    .map((entry, index) => {
      const [mediaRange, ...parameters] = entry.trim().toLowerCase().split(";");
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().startsWith("q=")
      );
      const parsedQuality = qualityParameter
        ? Number.parseFloat(qualityParameter.trim().slice(2))
        : 1;

      return {
        mediaRange,
        quality:
          Number.isFinite(parsedQuality) && parsedQuality >= 0 && parsedQuality <= 1
            ? parsedQuality
            : 0,
        index,
      };
    })
    .filter(({ mediaRange }) => mediaRange.includes("/"));
}

function matchSpecificity(mediaRange, offeredType) {
  if (mediaRange === offeredType) return 2;
  const [rangeType, rangeSubtype] = mediaRange.split("/");
  const [offeredMainType] = offeredType.split("/");
  if (rangeType === offeredMainType && rangeSubtype === "*") return 1;
  if (mediaRange === "*/*") return 0;
  return -1;
}

function preferenceFor(accepted, offeredType) {
  let best = null;

  for (const entry of accepted) {
    const specificity = matchSpecificity(entry.mediaRange, offeredType);
    if (specificity < 0) continue;
    if (
      !best ||
      specificity > best.specificity ||
      (specificity === best.specificity && entry.index < best.index)
    ) {
      best = { ...entry, specificity };
    }
  }

  return best;
}

function selectRepresentation(header) {
  const accepted = parseAccept(header);
  if (accepted.length === 0) return "html";

  // A generic */* request should preserve normal browser/server behavior and
  // select HTML. An explicit Markdown preference still wins by specificity or q.
  const offered = ["text/html", "text/markdown"]
    .map((type, serverOrder) => ({
      type,
      serverOrder,
      preference: preferenceFor(accepted, type),
    }))
    .filter(({ preference }) => preference && preference.quality > 0)
    .sort((left, right) => {
      if (right.preference.quality !== left.preference.quality) {
        return right.preference.quality - left.preference.quality;
      }
      if (left.preference.index !== right.preference.index) {
        return left.preference.index - right.preference.index;
      }
      if (right.preference.specificity !== left.preference.specificity) {
        return right.preference.specificity - left.preference.specificity;
      }
      return left.serverOrder - right.serverOrder;
    });

  if (offered.length === 0) return null;
  return offered[0].type === "text/markdown" ? "markdown" : "html";
}

function appendVary(current, value = "Accept") {
  const values = (current || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  if (!values.some((entry) => entry.toLowerCase() === value.toLowerCase())) {
    values.push(value);
  }
  return values.join(", ");
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildSitemap(entries) {
  const body = entries
    .map(({ path, lastmod }) => {
      const lastmodElement = lastmod
        ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
        : "";
      return `  <url>\n    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>${lastmodElement}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function sitemapDate(value, fallback) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString();
}

function buildSitemapEntries({ posts, travel, til }) {
  const generatedAt = new Date().toISOString();
  const latest = sitemapDate(posts[0]?.date, generatedAt);
  const categories = Array.from(
    new Map(
      posts
        .filter((post) => post.category)
        .map((post) => [String(post.category).toLowerCase(), post])
    ).entries()
  );

  return [
    { path: "/", lastmod: latest },
    { path: "/about", lastmod: "2026-08-23T00:00:00.000Z" },
    { path: "/contact", lastmod: "2026-08-23T00:00:00.000Z" },
    { path: "/privacy", lastmod: "2026-08-23T00:00:00.000Z" },
    { path: "/developers", lastmod: "2026-08-23T00:00:00.000Z" },
    { path: "/til", lastmod: sitemapDate(til[0]?.date, latest) },
    { path: "/travel", lastmod: sitemapDate(travel[0]?.date, latest) },
    ...posts.map((post) => ({
      path: `/posts/${encodeURIComponent(post.slug)}`,
      lastmod: sitemapDate(post.date, latest),
    })),
    ...categories.map(([category, newestPost]) => ({
      path: `/posts/tag/${encodeURIComponent(category)}`,
      lastmod: sitemapDate(newestPost.date, latest),
    })),
    ...travel.map((trip) => ({
      path: `/travel/${encodeURIComponent(trip.slug)}`,
      lastmod: sitemapDate(trip.date, latest),
    })),
  ];
}

module.exports = {
  SITE_URL,
  appendVary,
  buildSitemap,
  buildSitemapEntries,
  escapeXml,
  parseAccept,
  selectRepresentation,
};
