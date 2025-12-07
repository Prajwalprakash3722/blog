/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import cn from "classnames";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <div className="grid place-items-center">
      <img
        src={src}
        alt={`Cover Image for ${title}`}
        className={cn("shadow-sm", {
          "hover:shadow-lg transition-shadow duration-200 rounded-xl w-full h-full object-cover": !slug,
        })}
      />
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
