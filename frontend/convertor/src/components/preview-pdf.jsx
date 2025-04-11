import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sendFileToBackend } from "../utils/sendfiletobackend";
import { catchfile } from "../utils/catchfile";
import { usefilestore } from "../../store/filestore";
import { usefilepathstore } from "../../store/filepathstore";
import axios from "axios";

export default function Preview() {
  const [path, setpath] = useState([]);
  const setfile = usefilestore((state) => state.setfile);
  const filepath = usefilepathstore((state) => state.filepaths);
  const loc = useLocation();
  const { imgpath, proroute } = loc.state || {};

  useEffect(() => setpath(imgpath), [imgpath]);

  const routeMap = {
    "Merge PDF": "merge",
  };

  let route = routeMap[proroute]; //space gets encoded as %20 in url

  async function addmorefiles(event) {
    const files = catchfile(event.target.files);
    setfile(files);
    const { imgpath } = await sendFileToBackend(files, proroute);
    setpath((prev) => [...prev, ...imgpath]);
  }

  async function process() {
    try {
      console.log(filepath);

      const data = await axios.post(
        `http://127.0.0.1:3000/${route}`,
        {
          filepath,
        },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <main className="flex flex-col items-center mt-10 px-4 md:px-8 lg:px-16">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        <label
          htmlFor="add"
          className="w-44 flex justify-center items-center gap-2 bg-gradient-to-r from-gray-400 to-gray-500 p-2  rounded-md cursor-pointer font-[Oswald] font-semibold h-[46px] dark:text-white text-black hover:scale-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 "
        >
          <span>Add More Files</span>

          <input
            type="file"
            id="add"
            className="hidden"
            accept=".pdf"
            onChange={addmorefiles}
            multiple
          />
        </label>

        <button
          onClick={process}
          className="h-[46px] px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 w-44 hover:scale-105 cursor-pointer"
        >
          {proroute}
        </button>
      </div>

      <section
        className="flex justify-center gap-3 flex-wrap"
        aria-label="Uploaded PDF previews"
      >
        {path.map((path, index) => (
          <figure key={index} className="p-3 rounded-xl bg-white shadow-xl">
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
