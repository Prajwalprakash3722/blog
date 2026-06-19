import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  readingTime?: string;
};

const PostHeader = ({ title, coverImage, date, readingTime }: Props) => {
  return (
    <>
      <div className="mb-4">
        <div className="font-mono text-xs text-text-secondary mb-4 flex flex-wrap gap-x-2 gap-y-1">
          <DateFormatter dateString={date} />
          {readingTime && (
            <>
              <span aria-hidden="true">/</span>
              <span>{readingTime}</span>
            </>
          )}
        </div>
        <PostTitle>{title}</PostTitle>
      </div>
      <div className="my-8">
        <CoverImage title={title} src={coverImage} />
      </div>
    </>
  );
};

export default PostHeader;
