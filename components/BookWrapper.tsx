import StaticImage from "./static-image";

interface BookWrapperProps {
  imgSrc: string;
  bookName: string;
  articleLink?: string;
}

const BookWrapper = ({ imgSrc, bookName, articleLink }: BookWrapperProps) => {
  const book = (
    <>
      <StaticImage
        src={imgSrc}
        sizes="200px"
        className="h-48 w-auto object-contain rounded"
        alt={bookName}
      />
      <h3 className="font-body text-sm text-text-body mt-3">{bookName}</h3>
    </>
  );
  return articleLink ? (
    <a href={articleLink} className="flex flex-col items-center">
      {book}
    </a>
  ) : (
    <div className="flex flex-col items-center">{book}</div>
  );
};

export default BookWrapper;
