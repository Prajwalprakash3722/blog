import Post from "../types/post";
import { slugify } from "../lib/slugify";

type Props = {
  posts: Post[];
};

const Categories = ({ posts }: Props) => {
  return (
    <section className="my-16 md:my-20">
      <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-text-heading mb-10">
        Categories
      </h2>
      <div className="flex flex-wrap gap-3">
        {posts
          .map((item) => item.category)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort()
          .map((category) => (
            <a
              href={`/posts/tag/${slugify(category)}`}
              key={category}
              className="px-5 py-2.5 bg-surface-raised border border-surface-muted rounded font-mono text-base text-text-body hover:text-accent-link hover:border-accent-terminal-muted transition-colors"
            >
              {category}
              <sup className="ml-1 text-text-muted">
                {posts.filter((post) => post.category === category).length}
              </sup>
            </a>
          ))}
      </div>
    </section>
  );
};

export default Categories;
