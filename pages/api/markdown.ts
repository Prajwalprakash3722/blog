import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getAllTil, getPublishedPosts, getPublishedTravel } from "../../lib/api";

const SITE_URL = "https://blog.devcoffee.me";

const staticPages: Record<string, string> = {
  "/about": `# About Prajwal's Blog

Prajwal's Blog is the personal publishing home of Prajwal Prakash, a site reliability engineer in India. Since 2020, the site has collected practical engineering notes and personal essays about reliable systems, Linux, distributed systems, TypeScript, accessibility, books, philosophy, and travel.

The technical writing starts from systems Prajwal has operated or studied and aims to make difficult infrastructure concepts understandable without hiding their trade-offs. Personal writing is published as first-person experience rather than universal advice. Articles show their publication date, category, and approximate reading time.

Use the [post index](${SITE_URL}/#posts), [Today I Learned notes](${SITE_URL}/til), or [travel journal](${SITE_URL}/travel) to browse. Machine readers can use [llms.txt](${SITE_URL}/llms.txt), the [XML sitemap](${SITE_URL}/sitemap.xml), and [RSS](${SITE_URL}/rss.xml). For questions, corrections, attribution, or accessibility issues, see the [contact page](${SITE_URL}/contact).
`,
  "/contact": `# Contact Prajwal

Email Prajwal Prakash at [prajwalprakash3722@gmail.com](mailto:prajwalprakash3722@gmail.com) for corrections, source questions, accessibility problems, speaking or writing enquiries, and technical discussion related to an article on this site. Include the article URL and a concise description so the message can be routed and answered accurately.

This is a personal publication, not a support desk or an official channel for Prajwal's employer. Do not send passwords, API keys, private production data, health records, financial information, or other secrets. Unsolicited marketing and link-exchange requests may not receive a response. Responsible reports about a security issue should describe the affected URL, observable impact, and safe reproduction steps without exploiting readers or accessing data that is not yours.

You can also find Prajwal on [GitHub](https://github.com/Prajwalprakash3722) and [X/Twitter](https://twitter.com/prajwal_3722). For automated discovery, use [llms.txt](${SITE_URL}/llms.txt), the [sitemap](${SITE_URL}/sitemap.xml), or [RSS](${SITE_URL}/rss.xml).
`,
  "/privacy": `# Privacy policy

Prajwal's Blog publishes articles without requiring an account, subscription, or payment. The site does not ask readers to create profiles and does not sell personal information. Standard web infrastructure may process technical request data such as IP address, user agent, requested URL, timestamp, referrer, and coarse location for delivery, abuse prevention, reliability, and aggregate traffic measurement.

The site is delivered through hosting and content-delivery providers and uses Vercel Analytics and Cloudflare Web Analytics. Those providers may process limited request or device information under their own terms. Email sent through the contact address is processed by the sender's and recipient's email providers and retained only as reasonably needed to answer, preserve context, prevent abuse, or meet legal obligations.

Articles may link to third-party sites whose privacy practices are outside this site's control. Avoid sending secrets or sensitive personal data through email. To ask a privacy question or request deletion of information you previously sent directly, email [prajwalprakash3722@gmail.com](mailto:prajwalprakash3722@gmail.com) with enough context to identify the relevant message. This policy may change when the site's services change; the current version is effective 23 August 2026.
`,
};

function safeSlug(value: string) {
  return /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(value) ? value : null;
}

function readMarkdown(directory: string, slug: string) {
  const validated = safeSlug(slug);
  if (!validated) return null;
  const file = path.join(process.cwd(), directory, `${validated}.mdx`);
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, "utf8");
  return source.replace(/^---[\s\S]*?---\s*/, "");
}

function homepageMarkdown() {
  const posts = getPublishedPosts([
    "title",
    "date",
    "slug",
    "excerpt",
    "category",
    "readingTime",
  ]);
  const links = posts
    .map(
      (post) =>
        `- [${post.title}](${SITE_URL}/posts/${post.slug}) — ${String(
          post.date
        ).slice(0, 10)}, ${post.category || "essay"}, ${post.readingTime}`
    )
    .join("\n");

  return `# Prajwal's Blog — DevCoffee\n\nI'm Prajwal Prakash, a site reliability engineer in India. I write practical explanations of Linux, scalable and reliable systems, distributed systems, web development, and accessibility, alongside personal essays about philosophy, books, life, and travel. The full article text is server-rendered and each title below links to its canonical page.\n\n## All posts\n\n${links}\n\n## Site resources\n\n- [About](${SITE_URL}/about)\n- [Contact](${SITE_URL}/contact)\n- [Privacy](${SITE_URL}/privacy)\n- [Today I Learned](${SITE_URL}/til)\n- [Travel journal](${SITE_URL}/travel)\n- [RSS feed](${SITE_URL}/rss.xml)\n- [Sitemap](${SITE_URL}/sitemap.xml)\n- [Agent instructions](${SITE_URL}/llms.txt)\n`;
}

function collectionMarkdown(kind: "travel" | "til") {
  if (kind === "travel") {
    const trips = getPublishedTravel(["title", "date", "slug", "excerpt"]);
    return `# Prajwal's travel journal\n\n${trips
      .map(
        (trip) =>
          `- [${trip.title}](${SITE_URL}/travel/${trip.slug}) — ${String(
            trip.date
          ).slice(0, 10)}. ${trip.excerpt || ""}`
      )
      .join("\n")}\n`;
  }
  const notes = getAllTil(["title", "date", "content"]);
  return `# Today I Learned\n\nShort technical notes published by Prajwal Prakash.\n\n${notes
    .map(
      (note) =>
        `## ${note.title}\n\nPublished ${String(note.date).slice(0, 10)}.\n\n${note.content}`
    )
    .join("\n\n")}\n`;
}

function markdownFor(requestPath: string) {
  if (requestPath === "/") return homepageMarkdown();
  if (staticPages[requestPath]) return staticPages[requestPath];
  if (requestPath === "/travel") return collectionMarkdown("travel");
  if (requestPath === "/til") return collectionMarkdown("til");
  if (requestPath === "/roadmap") {
    return `# Roadmap\n\nThis experimental page is a work in progress. Its rotating third-party meme content is intentionally available only in the browser experience. Browse stable published writing through the [post index](${SITE_URL}/#posts) or [sitemap](${SITE_URL}/sitemap.xml).\n`;
  }

  const postMatch = requestPath.match(/^\/posts\/([^/]+)$/);
  if (postMatch) return readMarkdown("_posts", postMatch[1]);
  const tagMatch = requestPath.match(/^\/posts\/tag\/([^/]+)$/);
  if (tagMatch) {
    const tag = decodeURIComponent(tagMatch[1]).toLowerCase();
    const posts = getPublishedPosts([
      "title",
      "date",
      "slug",
      "excerpt",
      "category",
    ]).filter((post) => String(post.category || "").toLowerCase() === tag);
    if (!posts.length) return null;
    return `# Posts tagged ${tag}\n\n${posts
      .map(
        (post) =>
          `- [${post.title}](${SITE_URL}/posts/${post.slug}) — ${String(post.date).slice(0, 10)}. ${post.excerpt || ""}`
      )
      .join("\n")}\n`;
  }
  const travelMatch = requestPath.match(/^\/travel\/([^/]+)$/);
  if (travelMatch) return readMarkdown("_travel", travelMatch[1]);

  return null;
}

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).end();
  }

  const requestedPath = Array.isArray(request.query.path)
    ? request.query.path[0]
    : request.query.path || "/";
  const markdown = markdownFor(requestedPath);
  response.setHeader("Content-Type", "text/markdown; charset=utf-8");
  response.setHeader("Vary", "Accept");
  response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");

  if (!markdown) {
    return response.status(404).send(`# 404 — Not found\n\nNo published page exists at \`${requestedPath}\`. Recover through the [homepage](${SITE_URL}/), [sitemap](${SITE_URL}/sitemap.xml), [agent instructions](${SITE_URL}/llms.txt), or [RSS feed](${SITE_URL}/rss.xml).\n`);
  }
  return response.status(200).send(request.method === "HEAD" ? "" : markdown);
}
