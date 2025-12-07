import DateFormatter from "./date-formatter";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  slug: string;
  content: string;
  category: string;
};

const Postdraft = ({ title, date, slug, content, category }: Props) => {
  return (
    <Link href={`/posts/${slug}`} className="group relative block h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-500 group-hover:duration-200" />
      <div className="relative h-full flex flex-col justify-between p-6 bg-[#1A1D23] border border-white/5 rounded-2xl hover:border-white/10 transition-colors duration-300">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20">
              {category}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              <DateFormatter dateString={date} short />
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
            {title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
            {content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-4 pt-4 border-t border-white/5">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {Math.floor(content.split(" ").length / 200) || 1} min read
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Postdraft;
