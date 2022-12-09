import React from "react";
import BookWidget from "./BookWidget";

const Books = () => {
  return (
    <section className="relative bg-[#1A1D23] p-8 rounded-lg my-4" id="posts">
      <h2 className="text-3xl font-bold leading-snug text-slate-100 my-4">
        Books Adored or Being Adored by Me :{`)`}
      </h2>
      <div className="flex justify-center max-w-2xl">
        <BookWidget />
      </div>
    </section>
  );
};

export default Books;
