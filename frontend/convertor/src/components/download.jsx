import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { usefilestore } from "../../store/filestore";
import { usefilepathstore } from "../../store/filepathstore";
import { useimagepathstore } from "../../store/imgpathstore";

export default function Download() {
  const location = useLocation();
  const [flag, setflag] = useState(false)
  const { value } = location.state;
  const setfile = usefilestore((state) => state.setfile);
  const clearfilepath = usefilepathstore((state) => state.clearfilepath);
  const clearimagepath = useimagepathstore((state) => state.clearimagepath);

  let output = Object.values(value);//Array of values of the provided object
  let outputpath = output[1];

  let filename = outputpath.split("/")[2];
  const navigate = useNavigate();

  async function downloadFile() {
    try {
      const response = await axios.get(`http://localhost:3000/download/${filename}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      if (response) {
        navigate('/')
        setflag(true)
      }
    } catch (error) {
      console.error("Download failed:", error.message);
    }
  }

  useEffect(() => {
    if (flag) {
      setfile([])
      clearfilepath()
      clearimagepath()
    }
  }, [flag])
  return (
    <>
      <div className="flex flex-col justify-center items-center px-4 mt-24" >
        <h2 className="text-xl sm:text-3xl font-bold text-black dark:text-white font-[Oswald] mb-6 text-center">
          🎉 Your PDF is ready to download.
        </h2>
        <div className="bg-red-600 w-full max-w-md p-6 rounded-2xl shadow-lg text-center text-white">
          <p className="mb-6 text-sm sm:text-base font-medium">
            Click the button below to grab your file.
          </p>

          <button
            download
            onClick={downloadFile}
            className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition duration-300 text-sm sm:text-base cursor-pointer"
          >
            ⬇ Download PDF
          </button>
        </div>
        <p className="text-white font-[Oswald] text-xl mt-3">Your files will be deleted from our server in 24 hours</p>
      </div>
    </>
  );
}
