import DateFormatter from "./date-formatter";
import Link from "next/link";
type Props = {
  title: string;
  date: string;
  slug: string;
  content: string;
  category: string;
};

const PostPreview = ({ title, date, slug, content, category }: Props) => {
  const colorGradients = [
    "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
    "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200",
    "bg-gradient-to-r from-green-200 via-green-400 to-purple-700",
    "bg-gradient-to-r from-green-200 via-green-300 to-blue-500",
    "bg-gradient-to-r from-indigo-300 to-purple-400",
    "bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300",
    "bg-gradient-to-r from-green-200 to-green-500",
    "bg-gradient-to-r from-red-400 via-gray-300 to-blue-500",
    "bg-gradient-to-r from-cyan-200 to-cyan-400",
  ];

  //genrate some random index for the gradients array

  const randomGradient =
    colorGradients[Math.floor(Math.random() * colorGradients.length)];

  return (
    <div className="relative group">
      {" "}
      <div
        className={`absolute -inset-0.5 ${randomGradient} rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}
      ></div>
      <div className="relative px-7 py-4 bg-[#1A1D23] rounded-lg leading-none">
        <h3
          className={`text-3xl mb-3 leading-snug text-transparent font-semibold bg-clip-text ${randomGradient}`}
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <dl className="flex mt-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">
              {" "}
              <DateFormatter dateString={date} />
            </dd>
          </div>
          <div className="hidden md:flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-gray-600">Reading time</dt>
            <dd className="text-xs text-slate-100">{Math.floor((content.split(' ').length) / 200) ?? 2} mins</dd>
          </div>
          <div className="hidden lg:flex flex-col-reverse ml-3 sm:ml-6">
            <dt className="text-sm font-medium text-gray-600">Category</dt>
            <dd className="text-xs text-slate-100">
              {category}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PostPreview;
