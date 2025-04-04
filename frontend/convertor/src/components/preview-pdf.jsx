import React from "react";
import { useLocation } from "react-router-dom";

export default function Preview() {
  let loc = useLocation();
  const { imgpath, proroute, count } = loc.state || {};

  return (
    <>
      <div className="flex justify-center min-h-16 mt-16 gap-3 m-3">
        {imgpath.map((path, index) => (
          <div
            key={index}
            className=" p-2 rounded-xl bg-white shadow-lg dark:shadow-md"
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
        <div className=" relative flex flex-col items-center justify-center w-8 h-8 bg-red-600 rounded-full group hover:bg-red-700 transition duration-300 cursor-pointer">
          <label htmlFor="add">
            <p className="absolute left-6 bg-red-600 rounded-full bottom-5 w-5 text-center text-white font-bold">{count}</p>
            <input type="file" name="" id="add" className="hidden" />
            <span className="material-symbols-outlined text-white cursor-pointer mt-1">
              add_circle
            </span>
            <span className="absolute left-[51px] bg-gray-600 text-white text-lg rounded-md opacity-0 group-hover:opacity-100 transition duration-300 w-28 p-2 text-center font-[Oswald] ">
              Add More Files
            </span>
          </label>
        </div>
      </div>
    </>
  );
}
