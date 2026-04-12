import Post from "../types/post";
import { format } from "date-fns";

type Props = {
  posts: Post[];
  header: string;
};

const MorePosts = ({ posts, header }: Props) => {
  const allYears = posts.map((post) => post.date.split("-")[0]);

  return (
    <section className="my-12 md:my-16" id="posts">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-8">
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
              <div key={year} className="mb-8">
                <h3 className="font-display text-lg font-bold text-text-heading mb-3">
                  {year}
                </h3>
                <div className="flex flex-col">
                  {postsByYear.map((post) => (
                    <a
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="group flex items-center py-2.5 px-3 -mx-3 rounded hover:bg-surface-raised transition-colors"
                    >
                      <span className="font-mono text-xs text-text-muted min-w-[60px] shrink-0">
                        {format(new Date(post.date), "dd MMM")}
                      </span>
                      <span className="text-[15px] font-medium text-text-body group-hover:text-accent-link transition-colors">
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
