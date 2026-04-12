import React from "react";
import BookWrapper from "./BookWrapper";

const BookWidget = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      <BookWrapper
        bookName="PP The Op"
        imgSrc="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1433161048l/1137215._SX98_.jpg"
      />
      <BookWrapper
        bookName="Ikigai"
        imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1456092979i/28787203.jpg"
        articleLink="https://blog.devcoffee.me/posts/ikigai"
      />
    </div>
  );
};

export default BookWidget;
