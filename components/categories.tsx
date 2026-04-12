import Post from "../types/post";

type Props = {
  posts: Post[];
};

const Categories = ({ posts }: Props) => {
  return (
    <section className="my-12 md:my-16">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-8">
        Categories
      </h2>
      <div className="flex flex-wrap gap-3">
        {posts
          .map((item) => item.category)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort()
          .map((category) => (
            <a
              href={`posts/tag/${category}`}
              key={category}
              className="px-4 py-2 bg-surface-raised border border-surface-muted rounded font-mono text-sm text-text-body hover:text-accent-link hover:border-accent-terminal-muted transition-colors"
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
