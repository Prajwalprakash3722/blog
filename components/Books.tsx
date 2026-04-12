import React from "react";
import BookWidget from "./BookWidget";

const Books = () => {
  return (
    <section className="my-12 md:my-16" id="posts">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-8">
        Books I&apos;m Reading
      </h2>
      <div className="max-w-2xl">
        <BookWidget />
      </div>
    </section>
  );
};

export default Books;
