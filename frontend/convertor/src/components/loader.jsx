import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative w-20 h-20">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-gray-300 dark:border-gray-700 rounded-full animate-spin border-t-red-500"></div>
        
        {/* Middle Ring */}
        <div className="absolute inset-2 border-4 border-gray-300 dark:border-gray-700 rounded-full animate-ping border-t-blue-500"></div>

        {/* Inner Dot */}
        <div className="absolute inset-5 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
}
