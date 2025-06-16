import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [theme, settheme] = useState(localStorage.getItem("theme") || "light");
  let nav = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); //data-theme in index.html
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    settheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <nav className="bg-gray-100 dark:text-white dark:bg-gray-800 w-full min-h-16 flex justify-between items-center px-8 font-[Oswald] transition-colors shadow-lg sticky top-0 ">
      <Link to={"/"}>
        <div className="text-2xl font-extrabold cursor-pointer text-red-500">
          DOCXPRESS
        </div>
      </Link>

      <div className="hidden md:flex space-x-6 text-xl font-bold absolute left-1/2 -translate-x-1/2">
        <div
          className="hover:text-red-500 cursor-pointer transition text-xl"
          onClick={() =>
            nav("/upload", {
              state: {
                mainheading: "Merge PDF",
                description: "Seamlessly merge PDFs!",
              },
            })
          }
        >
          MERGE PDF
        </div>

        <div
          className="hover:text-red-500 cursor-pointer transition text-xl"
          onClick={() =>
            nav("/upload", {
              state: {
                mainheading: "Compress PDF",
                description: "Reduce file size without losing quality!",
              },
            })
          }
        >
          COMPRESS PDF
        </div>
      </div>

      <div className="font-[Oswald] font-bold flex items-center space-x-0 md:space-x-3">
        <button onClick={toggleTheme} className="cursor-pointer">
          {theme === "light" ? (
            <span className="material-symbols-outlined text-yellow-500 hover:bg-gray-200 rounded-xl p-2 transition">
              light_mode
            </span>
          ) : (
            <span className="material-symbols-outlined text-cyan-600 hover:bg-gray-200 rounded-xl p-2 transition">
              nights_stay
            </span>
          )}
        </button>
        <span className="cursor-pointer hover:bg-gray-200 rounded-xl p-2 transition dark:hover:bg-gray-600">
          <i className="fa-solid fa-circle-user fa-xl"></i>
        </span>
      </div>
    </nav>
  );
}
