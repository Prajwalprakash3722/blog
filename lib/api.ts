import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "/_posts");
const tilDirectory = join(process.cwd(), "/_til");
const journalDirectory = join(process.cwd(), "/_journal");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
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
    [key: string]: string;
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
  });

  return items;
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

export function getAllTil(fields: any) {
  const slugs = getTilSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, tilDirectory))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
