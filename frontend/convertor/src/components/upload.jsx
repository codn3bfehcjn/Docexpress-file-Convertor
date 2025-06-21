import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendFileToBackend } from "../utils/sendfiletobackend";
import { catchfile } from "../utils/catchfile";
import { usefilestore } from "../../store/filestore";
import { usefilepathstore } from "../../store/filepathstore";
import { useimagepathstore } from "../../store/imgpathstore";

export default function Upload() {
  const location = useLocation();
  const { mainheading, description } = location.state;
  const file = usefilestore((state) => state.file);
  const setfile = usefilestore((state) => state.setfile);
  const setfilepath = usefilepathstore((state) => state.setfilepath);
  const clearfilepath = usefilepathstore((state) => state.clearfilepath);
  const setimagepath = useimagepathstore((state) => state.setimagepath);
  const clearimagepath = useimagepathstore((state) => state.clearimagepath);
  const [drag, setDrag] = useState(false);
  const [proroute, setproroute] = useState("");
  const navigate = useNavigate();


  // catch files from input field
  function catchTheFile(event) {
    const filesarray = catchfile(event.target.files);
    setfile(filesarray);
  } 

  function dropHandler(event) {
    event.preventDefault();
    setDrag(false);
    const filesarray = Array.from(event.dataTransfer.files); //files from drag and drop
    setfile(filesarray);
  }

  function dragOverHandler(event) {
    event.preventDefault();
    setDrag(true);
  }

  function handleDragLeave() {
    setDrag(false);
  }

  useEffect(() => {
    async function uploadFiles() {
      const { imgpath, proroute, filepath } = await sendFileToBackend(
        file,
        mainheading
      );
      if (imgpath.length > 0 && filepath.length > 0) {
        setproroute(proroute);
        setfilepath(filepath);
        setimagepath(imgpath);

        navigate("/preview", {
          state: { proroute},
        });
      }
    }
    if (file && file.length > 0) {
      uploadFiles();
    }
  }, [file]);

  return (
    <div className="text-gray-800 dark:text-white flex flex-col items-center justify-center px-6 transition-all mt-7">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-3xl lg:text-5xl font-[Oswald] font-bold">
          {mainheading}
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-[Oswald]  font-bold ">
          {description}
        </p>
      </div>
      <label htmlFor="input" className="cursor-pointer">
        <div
          className={`mt-10 w-60 md:w-72 p-6 rounded-xl text-center font-[Oswald] font-bold text-xl shadow-md ${drag ? "bg-gray-200" : "bg-red-600 shadow-md"
            }`}
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDragLeave={handleDragLeave}
        >
          {drag ? (
            <p className="text-2xl font-[Oswald] text-black transition">
              Drop your files, let the magic happen!
            </p>
          ) : (
            <p className="text-2xl font-[Oswald] text-white transition font-bold ">
              Select Your Files or Drop PDF here
            </p>
          )}
          <input
            type="file"
            id="input"
            className="hidden"
            accept=".pdf"
            onChange={catchTheFile}
            multiple
          />
        </div>
      </label>
    </div>
  );
}
