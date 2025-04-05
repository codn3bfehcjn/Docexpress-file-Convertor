import React from "react";
import { useLocation } from "react-router-dom";

export default function Preview() {
  const loc = useLocation();
  const { imgpath, proroute, count } = loc.state || {};

  return (
    <main className="flex flex-col items-center mt-10 px-4 md:px-8 lg:px-16">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        <label
          htmlFor="add"
          className="w-44 flex justify-center items-center gap-2 bg-gradient-to-r from-gray-400 to-gray-500 p-2  rounded-md cursor-pointer font-[Oswald] font-semibold h-[46px] text-white hover:scale-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          <span>Add More Files</span>
          <p>({count})</p>
          <input type="file" id="add" className="hidden" accept=".pdf" />
        </label>

        <button
          className="h-[46px] px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 w-44 hover:scale-105"
        >
          {proroute}
        </button>
      </div>

      <section
        className="flex justify-center gap-3 flex-wrap"
        aria-label="Uploaded PDF previews"
      >
        {imgpath.map((path, index) => (
          <figure key={index} className="p-2 rounded-xl bg-white shadow-2xl">
            {path ? (
              <img
                src={`http://localhost:3000/${path}`}
                width={190}
                height={170}
                className="rounded-md"
              />
            ) : (
              <figcaption className="text-center text-gray-500">
                No image found.
              </figcaption>
            )}
          </figure>
        ))}
      </section>
    </main>
  );
}
