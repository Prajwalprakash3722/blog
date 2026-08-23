import { Feed } from "feed";
import fs from "fs";
import { getPublishedPosts } from "./api";
export default async function generateRssFeed() {
  const posts = getPublishedPosts([
    "title",
    "date",
    "slug",
    "content",
    "coverImage",
    "excerpt",
    "draft",
  ]);
  const siteURL =
    process.env.NODE_ENV === "production"
      ? "https://blog.devcoffee.me"
      : "http://localhost:3000";
  const date = new Date();
  const author = {
    name: "Prajwal P",
    email: "prajwalprakash3722@gmail.com",
    link: "https://twitter.com/prajwal_3722",
  };

  // Creating feed
  const feed = new Feed({
    title: "Prajwal's Blog — DevCoffee",
    description:
      "Practical writing by Prajwal Prakash about reliable systems, Linux, distributed systems, accessibility, philosophy, books, life, and travel.",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Prajwal P`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
      json: `${siteURL}/rss.json`,
    },
    author,
  });

  // Adding blogs to the rss feed
  posts.forEach((post) => {
    const url = `${siteURL}/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  // generating the xml and json for rss
  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss.xml", feed.rss2());
  fs.writeFileSync("./public/rss.json", feed.json1());
}
