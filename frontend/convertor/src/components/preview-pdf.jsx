import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sendFileToBackend } from "../utils/sendfiletobackend";
import { catchfile } from "../utils/catchfile";
import { usefilestore } from "../../store/filestore";
import { usefilepathstore } from "../../store/filepathstore";
import { useimagepathstore } from "../../store/imgpathstore";
import { SquareScissors } from "lucide-react";
import axios from "axios";

export default function Preview() {
  const setimagepath = useimagepathstore((state) => state.setimagepath);
  const path = useimagepathstore((state) => state.paths);
  const setfile = usefilestore((state) => state.setfile);
  const filepath = usefilepathstore((state) => state.filepaths);
  const setfilepath = usefilepathstore((state) => state.setfilepath);
  const loc = useLocation();

  const { proroute } = loc.state || {};

  const routemap = {
    "Merge PDF": "merge",
    "Compress PDF": "compress",
    "Watermark": "watermark",
  };

  let route = routemap[proroute]; //space gets encoded as %20 in url

  async function addmorefiles(event) {
    const files = catchfile(event.target.files);
    setfile((prev) => [...prev, ...files]);
    const { imgpath, filepath } = await sendFileToBackend(files, proroute);
    setfilepath((prev) => [...prev, ...filepath]);
    setimagepath((prev) => [...prev, ...imgpath]);
  }

  async function process() {
    try {
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

      <section className="flex justify-center flex-wrap gap-2">
        {path.map((path, index) => (
          <figure
            key={index}
            className="p-3 rounded-xl bg-white shadow-xl gap-4"
          >
            {path ? (
              <span className="group">
                <img
                  src={`http://localhost:3000/${path}`}
                  width={190}
                  height={170}
                  className="rounded-md p-4 "
                />
                <div className="absolute bottom-96">
                  <span>
                    <SquareScissors
                      color="white"
                      size={"23px"}
                      className="invisible group-hover:visible bg-black rounded cursor-pointer transition"
                    />
                    <p className="invisible group-hover:visible text-black">
                      delete
                    </p>
                  </span>
                </div>
              </span>
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
