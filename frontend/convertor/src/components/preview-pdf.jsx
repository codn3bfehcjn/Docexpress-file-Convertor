import React from "react";
import { useLocation } from "react-router-dom";

export default function Preview() {
  let loc = useLocation();
  const { imgpath, proroute } = loc.state || {};

  return (
    <>
      <div className="flex justify-center min-h-16 mt-16 gap-3 m-3">
        {imgpath.map((path, index) => (
          <div
            key={index}
            className=" p-2 rounded-xl bg-gray-200 dark:bg-white"
          >
            {path ? (
              <img
                src={`http://localhost:3000/${path}`}
                alt="Uploaded Preview"
                width={190}
                height={170}
              />
            ) : (
              <p>No image found.</p>
            )}
          </div>
        ))}
        <button className=" relative flex flex-col items-center justify-center w-8 h-8 bg-red-600 rounded-full group hover:bg-red-700 transition duration-300 cursor-pointer">
          <span className="material-symbols-outlined text-white ">
            add_circle
          </span>
          <span className="absolute left-[40px] bg-gray-600 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition duration-300 p-2">
            Add More Files
          </span>
        </button>
      </div>
    </>
  );
}
