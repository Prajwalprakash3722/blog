import type { GetServerSideProps } from "next";
import { getAllTil, getPublishedPosts, getPublishedTravel } from "../lib/api";
import { buildSitemap, buildSitemapEntries } from "../lib/agentic";

function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getPublishedPosts(["slug", "date", "category"]);
  const travel = getPublishedTravel(["slug", "date"]);
  const til = getAllTil(["date"]);
  const entries = buildSitemapEntries({ posts, travel, til });

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildSitemap(entries));
  res.end();
  return { props: {} };
};

export default Sitemap;
