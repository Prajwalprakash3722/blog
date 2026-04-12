import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
};

const PostHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <div className="mb-4">
        <div className="font-mono text-xs text-text-secondary mb-4">
          <DateFormatter dateString={date} />
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
