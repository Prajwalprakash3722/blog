import DateFormatter from "./date-formatter";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  readingTime?: string;
  category: string;
};

const PostPreview = ({
  title,
  date,
  slug,
  excerpt,
  readingTime,
  category,
}: Props) => {
  return (
    <Link href={`/posts/${slug}`} className="group block h-full">
      <article className="h-full flex flex-col justify-between p-6 bg-surface-raised border border-surface-muted rounded-md hover:border-accent-terminal-muted transition-colors">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs tracking-[0.08em] uppercase text-accent-link font-semibold">
              {category}
            </span>
            <span className="font-mono text-xs text-text-muted">
              <DateFormatter dateString={date} short />
            </span>
          </div>

          <h3 className="font-display text-xl md:text-2xl font-bold text-text-heading leading-snug mb-3 group-hover:text-accent-link transition-colors">
            {title}
          </h3>

          <p className="text-base text-text-secondary leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>

        <div className="flex items-center mt-5 pt-4 border-t border-surface-muted">
          <span className="flex items-center font-mono text-xs text-text-muted">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {readingTime || "1 min read"}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default PostPreview;
