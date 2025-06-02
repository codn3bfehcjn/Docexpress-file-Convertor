import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendFileToBackend } from "../utils/sendfiletobackend";
import { catchfile } from "../utils/catchfile";
import { usefilestore } from "../../store/filestore";
import { usefilepathstore } from "../../store/filepathstore";
import { useimagepathstore } from "../../store/imgpathstore";
import { usefontstore } from "../../store/fontstore";
import Customize from "./customization";
import Imagepreview from "./imagepreview";
import axios from "axios";

export default function Preview() {
  const setimagepath = useimagepathstore((state) => state.setimagepath);
  const setfile = usefilestore((state) => state.setfile);
  const filepath = usefilepathstore((state) => state.filepaths);
  const setfilepath = usefilepathstore((state) => state.setfilepath);
  const font = usefontstore((state) => state.font)
  const modalref = useRef(null);
  const [open, setopen] = useState(false);
  const [fontsize, setfontsize] = useState(12);
  const [color, setcolor] = useState({ red: 0, green: 0, blue: 0 });
  const watermarktext = useRef("")
  const value = useRef(12);
  const loc = useLocation();
  const navigate = useNavigate();

  const { proroute } = loc.state || {};
  const routemap = {
    "Merge PDF": "merge",
    "Compress PDF": "compress",
    "Watermark": "watermark",
    "PDF to PowerPoint": "PdftoPPT"
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
    let text = watermarktext.current
    try {
      const data = await axios.post(
        `http://127.0.0.1:3000/${route}`,
        {
          filepath, fontsize, color, text, font
        },
        { headers: { "Content-Type": "application/json" } }
      );
      let value = data.data;
      if (value != null) {
        navigate("/download", { state: { value } });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <main className="flex flex-col items-center mt-10 px-4 md:px-8 lg:px-16">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        <label
          htmlFor="add"
          className="w-44 flex justify-center items-center gap-2 bg-red-600 p-2  rounded-md cursor-pointer font-[Oswald] font-semibold h-[46px]  text-black hover:scale-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 "
        >
          <span className="font-medium text-white">Add More Files</span>
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
          className="h-[46px] px-6 py-2 bg-red-600 text-white font-medium font-[Oswald] rounded-md shadow-lg transition duration-300 focus:outline-none focus:ring-2focus:ring-red-400 w-44 hover:scale-105 cursor-pointer"
        >
          {proroute}
        </button>
      </div>

      <Customize proroute={proroute} setopen={setopen} open={open} fontsize={fontsize} setfontsize={setfontsize} color={color} setcolor={setcolor} modalref={modalref} value={value} watermarktext={watermarktext} />

      <Imagepreview></Imagepreview>
    </main>
  );
}