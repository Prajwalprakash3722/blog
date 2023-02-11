import { Feed } from "feed";
import fs from "fs";
import { getAllPosts } from "./api";
export default async function generateRssFeed() {
  const posts = getAllPosts([
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
      ? "https://www.blog.devcoffee.me"
      : "http://localhost:3000";
  const date = new Date();
  const author = {
    name: "Prajwal P",
    email: "prajwalprakash3722@gmail.com",
    link: "https://twitter.com/prajwal_3722",
  };

  // Creating feed
  const feed = new Feed({
    title: "Prajwals Blog",
    description:
      "Hi I'm Prajwal, and this is my blog. Here, I share through my writing my experience as a Computer science student and everything I'm learning about on React, Typescript, Go, Serverless, System Design and Testing.",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Prajwal P`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
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
