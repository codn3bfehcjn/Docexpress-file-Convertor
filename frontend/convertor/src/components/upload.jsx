import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendFileToBackend } from "../utils/sendfiletobackend";
import { catchfile } from "../utils/catchfile";
import { usefilestore } from "../../store/filestore";
import { usefilepathstore } from "../../store/filepathstore";

export default function Upload() {
  const location = useLocation(); 
  const { mainheading, description } = location.state;
  const setfile = usefilestore((state) => state.setfile);
  const file = usefilestore((state) => state.file);
  const setfilepath = usefilepathstore((state) => state.setfilepath);
  const [drag, setDrag] = useState(false);
  const [imgpath, setImgPath] = useState([]);
  const [proroute, setproroute] = useState("");

  // catch files from input field
  function catchTheFile(event) {
    const filesArray = catchfile(event.target.files);
    setfile(filesArray);
  }

  function dropHandler(event) {
    event.preventDefault();
    setDrag(false);
    const filesArray = Array.from(event.dataTransfer.files); //files from drag and drop
    setfile(filesArray);
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
      if (imgpath.length > 0) {
        setImgPath(imgpath);
        setproroute(proroute);
        setfilepath(filepath);
      }
    }

    if (file && file.length > 0) {
      uploadFiles();
    }
  }, [file]);

  const navigate = useNavigate();
  useEffect(() => {
    if (imgpath.length > 0) {
      navigate("/preview", {
        state: { imgpath, proroute },
      });
    }
  }, [imgpath]);

  return (
    <div className="text-gray-800 dark:text-white flex flex-col items-center justify-center px-6 font-bold font-[Oswald] transition-all mt-7">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold">
          {mainheading}
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100">
          {description}
        </p>
      </div>

      <div
        className={`mt-10 w-60 md:w-72 p-6 rounded-xl text-center font-[Oswald] font-bold text-xl shadow-md ${
          drag ? "bg-gray-200" : "bg-red-600 shadow-md"
        }`}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragLeave={handleDragLeave}
      >
        <label
          htmlFor="file"
          className="block text-center rounded-2xl cursor-pointer"
        >
          {drag ? (
            <p className="text-2xl font-[Oswald] text-black transition">
              Drop your files, let the magic happen!
            </p>
          ) : (
            <p className="text-2xl font-[Oswald] text-white transition">
              Select Your Files or Drop PDF here
            </p>
          )}
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          accept=".pdf"
          onChange={catchTheFile}
          multiple
        />
      </div>
    </div>
  );
}
