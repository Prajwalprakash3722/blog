import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "/_posts");
const travelDirectory = join(process.cwd(), "/_travel");
const tilDirectory = join(process.cwd(), "/_til");
const journalDirectory = join(process.cwd(), "/_journal");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getTravelSlugs() {
  return fs.readdirSync(travelDirectory);
}

export function getTilSlugs() {
  return fs.readdirSync(tilDirectory);
}

export function getJournalSlugs() {
  return fs.readdirSync(journalDirectory);
}

export function getPostBySlug(slug: string, fields: any, dir = postsDirectory) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(dir, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: any;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field: string) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }

    if (field === "excerpt" && !items[field]) {
      items[field] = content.replace(/<[^>]*>?/gm, "").substring(0, 150) + "...";
    }

    if (field === "readingTime") {
      const words = content.split(/\s+/g).length;
      const minutes = Math.ceil(words / 200);
      items[field] = `${minutes} min read`;
    }
  });

  return items;
}

export function getTravelBySlug(slug: string, fields: any) {
  return getPostBySlug(slug, fields, travelDirectory);
}

type Fields = {
  [key: string]: string;
};
export function getAllPosts(fields: any) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, postsDirectory))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPublishedPosts(fields: any) {
  const requestedFields = Array.from(new Set([...fields, "draft"]));

  return getAllPosts(requestedFields)
    .filter((post) => post.draft !== true)
    .map((post) => {
      if (!fields.includes("draft")) {
        delete post.draft;
      }

      return post;
    });
}

export function getAllTravel(fields: any) {
  const slugs = getTravelSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, travelDirectory))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPublishedTravel(fields: any) {
  const requestedFields = Array.from(new Set([...fields, "draft"]));

  return getAllTravel(requestedFields)
    .filter((post) => post.draft !== true)
    .map((post) => {
      if (!fields.includes("draft")) {
        delete post.draft;
      }

      return post;
    });
}

export function getAllTil(fields: any) {
  const slugs = getTilSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, tilDirectory))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
