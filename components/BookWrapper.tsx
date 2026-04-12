/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

interface BookWrapperProps {
  imgSrc: string;
  bookName: string;
  articleLink?: string;
}

const BookWrapper = ({ imgSrc, bookName, articleLink }: BookWrapperProps) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => {
        articleLink ? router.push(articleLink) : null;
      }}
    >
      <img
        src={imgSrc}
        className="h-48 w-auto object-contain rounded"
        alt={bookName}
      />
      <h3 className="font-body text-sm text-text-body mt-3">{bookName}</h3>
    </div>
  );
};

export default BookWrapper;
