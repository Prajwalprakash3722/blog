import Post from "../types/post";
import { format } from "date-fns";

type Props = {
  posts: Post[];
  header: string;
};

const MorePosts = ({ posts, header }: Props) => {
  const allYears = posts.map((post) => post.date.split("-")[0]);

  return (
    <section className="my-16 md:my-20 scroll-mt-10" id="posts">
      <div className="mb-8 border-b border-surface-muted pb-4">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-text-heading">
          {header}
        </h2>
      </div>

      <div className="flex max-w-[880px] flex-col">
        {allYears
          .filter((x, i, a) => a.indexOf(x) === i)
          .map((year) => {
            const postsByYear = posts.filter(
              (post) => post.date.split("-")[0] === year
            );
            return (
              <div key={year} className="mb-12">
                <h3 className="mb-2 font-mono text-sm font-semibold text-text-muted">
                  {year}
                </h3>
                <div className="divide-y divide-surface-muted border-t border-surface-muted">
                  {postsByYear.map((post) => (
                    <a
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="group -mx-3 grid gap-2 rounded px-3 py-4 transition-colors hover:bg-surface-raised md:grid-cols-[5.5rem_minmax(0,1fr)_13rem] md:items-baseline md:gap-6">
                      <time className="font-mono text-sm text-text-muted">
                        {format(new Date(post.date), "dd MMM")}
                      </time>

                      <span className="text-xl font-semibold leading-snug text-text-body transition-colors group-hover:text-accent-link">
                        {post.title || "Untitled"}
                      </span>

                      <span className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs tracking-[0.08em] uppercase text-text-muted md:justify-end md:text-right">
                        <span>{post.category}</span>
                        {post.readingTime && <span>{post.readingTime}</span>}
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
