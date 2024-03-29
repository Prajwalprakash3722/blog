import Post from "../types/post";
import Postdraft from "./post-preview";

type Props = {
  posts: Post[];
};

const LatestPosts = ({ posts }: Props) => {
  return (
    <section className="relative bg-[#1A1D23] p-8 rounded-lg my-8">
      <h2 className="text-3xl font-bold leading-snug text-slate-100 my-4">
        Latest Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts
          // .sort((a, b) => 1 ? new Date(b.date).valueOf() - new Date(a.date).valueOf() : new Date(a.date).valueOf() - new Date(b.date).valueOf())
          .map((post) => (
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
