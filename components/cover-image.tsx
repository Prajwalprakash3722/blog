import Link from "next/link";
import StaticImage from "./static-image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <StaticImage
      src={src}
      alt={`Cover Image for ${title}`}
      className="w-full h-auto rounded-md object-cover"
      loading="eager"
      fetchPriority="high"
    />
  );

  return (
    <div>
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
