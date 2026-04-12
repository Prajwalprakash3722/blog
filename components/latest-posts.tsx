import Post from "../types/post";
import PostPreview from "./post-preview";

type Props = {
  posts: Post[];
};

const LatestPosts = ({ posts }: Props) => {
  return (
    <section className="my-12 md:my-16">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-8">
        Latest
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
            readingTime={post.readingTime}
            category={post.category}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
