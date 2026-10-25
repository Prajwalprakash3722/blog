import React from "react";
import BookWrapper from "./BookWrapper";

const BookWidget = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      <BookWrapper
        bookName="PP The Op"
        imgSrc="/assets/images/fb780ca43efe8a7d-98.webp"
      />
      <BookWrapper
        bookName="Ikigai"
        imgSrc="/assets/images/c361c9bfa1a8a876-254.webp"
        articleLink="https://blog.devcoffee.me/posts/ikigai"
      />
    </div>
  );
};

export default BookWidget;
