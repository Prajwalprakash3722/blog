import Post from "../types/post";
import Postdraft from "./post-preview";

type Props = {
  posts: Post[];
};

const LatestPosts = ({ posts }: Props) => {
  return (
    <section className="my-16 md:my-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Latest Posts
        </h2>
        <div className="hidden md:block h-px flex-1 bg-white/10 ml-8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {posts.map((post) => (
          <Postdraft
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            content={post.content}
            category={post.category}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
