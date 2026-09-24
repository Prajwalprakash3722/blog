import fs from "fs";
import { join } from "path";
import type { GetServerSideProps } from "next";
import { getPublishedPosts } from "../../../lib/api";

// Behaves like raw.githubusercontent.com: the exact .mdx bytes as text/plain,
// with GitHub's raw headers. Only published posts resolve; anything else is a
// plain-text 404, never an HTML page.
function RawPost() {
  return null;
}

function send(res: Parameters<GetServerSideProps>[0]["res"], status: number, body: string | Buffer) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "deny");
  res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Cache-Control",
    status === 200 ? "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" : "public, max-age=60"
  );
  res.end(body);
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const slug = String(params?.slug ?? "");
  // Match against the published list instead of trusting the URL, so drafts
  // and path tricks never reach the filesystem.
  const published = getPublishedPosts(["slug"]).some((post) => post.slug === slug);

  if (!published) {
    send(res, 404, "404: Not Found");
  } else {
    send(res, 200, fs.readFileSync(join(process.cwd(), "_posts", `${slug}.mdx`)));
  }
  return { props: {} };
};

export default RawPost;
