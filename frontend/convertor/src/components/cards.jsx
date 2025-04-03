import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cards({
  fontawesomeclass,
  fontawesomeclass2,
  mainheading,
  description,
}) {
  const navigate = useNavigate();
  const sendcarddetails = () => {
    navigate("/upload", {
      state: { mainheading, description },
    });
  };

  return (
    <div
      onClick={sendcarddetails}
      className="m-4 md:w-80 w-96 h-44 p-4 bg-white dark:bg-gray-800 shadow-xl
      hover:scale-105 hover:shadow-2xl hover:rotate-1
      transition-transform duration-300 ease-in-out
      font-[Oswald] flex flex-col items-center text-center 
      border-1 rounded-2xl border-gray-200 cursor-pointer
      hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600"
    >
      <div className="mb-3 dark:text-white">
        <i className={fontawesomeclass}></i>
        <i className={fontawesomeclass2}></i>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        {mainheading}
      </h1>

      <p className="text-xl text-gray-600 mt-1 font-[Oswald] dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}
