/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";

interface BookWrapperProps {
  imgSrc: string;
  bookName: string;
  articleLink?: string;
}

const BookWrapper = ({ imgSrc, bookName, articleLink }: BookWrapperProps) => {
  const router = useRouter();
  const cent = Math.floor(Math.random() * 100) + "%";
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <div
        className="flex flex-col items-center"
        onClick={() => {
          articleLink ? router.push(articleLink) : null;
        }}
      >
        <img src={imgSrc} className="h-48 w-96 object-contain" alt={bookName} />
        <h3 className="text-lg leading-snug text-slate-50 my-4">{bookName}</h3>
      </div>
      <div className="shadow w-full bg-grey-light mt-2">
        <div
          className="bg-teal-400 text-xs leading-none py-1 text-center text-white rounded-l-xl"
          style={{ width: cent }}
        >
          {cent}
        </div>
      </div>
    </div>
  );
};

export default BookWrapper;
