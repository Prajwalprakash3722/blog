import Post from "../types/post";
import { format } from "date-fns";

type Props = {
  posts: Post[];
  header: string;
};

const MorePosts = ({ posts, header }: Props) => {
  let allYears = posts.map((post) => post.date.split("-")[0]);

  return (
    <section className="relative bg-[#1A1D23] p-8 rounded-lg my-4" id="posts">
      <h2 className="text-3xl font-bold leading-snug text-slate-100 my-4">
        {header}
      </h2>
      <div className="flex flex-col items-stretch justify-center max-w-2xl">
        {allYears
          .filter((x, i, a) => a.indexOf(x) == i)
          .map((year) => {
            let postsByYear = posts.filter(
              (post) => post.date.split("-")[0] === year
            );
            return (
              <div key={year}>
                <h3 className="text-2xl font-bold leading-snug text-slate-100 my-4 underline">
                  {year}
                </h3>
                <div>
                  {postsByYear.map((post) => (
                    <div key={post.title}>
                      <a href={"https://blog.devcoffee.me/posts/" + post.slug}>
                        <div className="max-w-full divide-y-2 divide-gray-200">
                          <div className="p-2 group rounded-lg hover:bg-[#1D2433]">
                            <div className="flex flex-row items-center">
                              <p className="px-4 py-2 text-lg  text-[#A4A8B2] whitespace-nowrap ">
                                {format(new Date(post.date), "dd MMM") + " "}
                              </p>
                              <p className="break-words text-xl px-4 py-2 text-[#DFDFF3] font-medium md:text-2xl group-hover:text-[#5686F5]">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
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
