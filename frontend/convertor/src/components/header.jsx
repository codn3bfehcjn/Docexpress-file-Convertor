import React from "react";

export default function Header() {
  return (
    <header className="w-full flex flex-col items-center text-center px-6 md:px-12 transition-colors mt-8 mb-6 md:mb-4">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white font-[Oswald]">
        Every Tool You Need To Work With PDF'S
      </h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-800 dark:text-white w-[56vw] md:w-[45vw] font-[Oswald] font-bold text-wrap">
        Convert, Merge, and Compress your PDFs with ease. Fast, Secure, and Completely Free.
      </p>
    </header>
  );
}
