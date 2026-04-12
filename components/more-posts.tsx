import Post from "../types/post";
import { format } from "date-fns";

type Props = {
  posts: Post[];
  header: string;
};

const MorePosts = ({ posts, header }: Props) => {
  const allYears = posts.map((post) => post.date.split("-")[0]);

  return (
    <section className="my-16 md:my-20" id="posts">
      <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-text-heading mb-10">
        {header}
      </h2>
      <div className="flex flex-col max-w-2xl">
        {allYears
          .filter((x, i, a) => a.indexOf(x) === i)
          .map((year) => {
            const postsByYear = posts.filter(
              (post) => post.date.split("-")[0] === year
            );
            return (
              <div key={year} className="mb-10">
                <h3 className="font-display text-xl font-bold text-text-heading mb-4">
                  {year}
                </h3>
                <div className="flex flex-col">
                  {postsByYear.map((post) => (
                    <a
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="group flex items-center py-3 px-3 -mx-3 rounded hover:bg-surface-raised transition-colors"
                    >
                      <span className="font-mono text-sm text-text-muted min-w-[70px] shrink-0">
                        {format(new Date(post.date), "dd MMM")}
                      </span>
                      <span className="text-lg font-medium text-text-body group-hover:text-accent-link transition-colors">
                        {post.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default MorePosts;
