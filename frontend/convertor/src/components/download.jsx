import React from "react";
import { useLocation } from "react-router-dom";

export default function Download() {
  const location = useLocation();
  const { value } = location.state;
  let outputpath = value.mergedpdfpath;
  let filename = outputpath.split("/")[2];

  return (
    <div className="flex flex-col justify-center items-center px-4 mt-24">
      <h2 className="text-xl sm:text-3xl font-bold text-black dark:text-white font-[Oswald] mb-6 text-center">
        🎉 We stitched it! Your merged PDF is ready to download.
      </h2>

      <div className="bg-red-600 w-full max-w-md p-6 rounded-2xl shadow-lg text-center text-white">
        <p className="mb-6 text-sm sm:text-base font-medium">
          Click the button below to grab your file.
        </p>

        <a
          className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition duration-300 text-sm sm:text-base"
          href={`http://localhost:3000/download/${filename}`}
          download
        >
          ⬇ Download Merged PDF
        </a>
      </div>
    </div>
  );
}
