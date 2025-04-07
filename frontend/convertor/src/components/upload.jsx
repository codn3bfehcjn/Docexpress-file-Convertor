import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendFileToBackend } from "../utils/sendfiletobackend";
import { catchfile } from "../utils/catchfile";

export default function Upload() {
  const location = useLocation(); // Get data from navigation (state)
  const { mainheading, description } = location.state;

  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [imgpath, setImgPath] = useState([]);
  const [proroute, setproroute] = useState("");
  const [count, setcount] = useState(0);

  // catch files from input field
  function catchTheFile(event) {
    const [filesArray] = catchfile(event.target.files);
    setFile(filesArray);
  }

  function dropHandler(event) {
    event.preventDefault();
    setDrag(false);
    const filesArray = Array.from(event.dataTransfer.files); //files from drag and drop
    setFile(filesArray);
  }

  function dragOverHandler(event) {
    event.preventDefault();
    setDrag(true);
  }

  function handleDragLeave(event) {
    setDrag(false);
  }

  useEffect(() => {
    async function uploadFiles() {
      const { imgpath, proroute, count } = await sendFileToBackend(
        file,
        mainheading
      );
      if (imgpath.length > 0) {
        setImgPath(imgpath);
        setproroute(proroute);
        setcount(count);
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
        state: { imgpath, proroute, count },
      });
    }
  }, [imgpath]);

  return (
    <div className="text-gray-800 dark:text-white flex flex-col items-center justify-center px-6 font-bold font-[Oswald] transition-all mt-7">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
          {mainheading}
        </h1>
        <p className="text-lg md:text-2xl text-gray-800 dark:text-gray-100">
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
