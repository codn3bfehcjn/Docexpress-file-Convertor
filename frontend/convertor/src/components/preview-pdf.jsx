import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendFileToBackend } from "../utils/sendfiletobackend";
import { catchfile } from "../utils/catchfile";
import { usefilestore } from "../../store/filestore";
import { usefilepathstore } from "../../store/filepathstore";
import { useimagepathstore } from "../../store/imgpathstore";
import Fontoption from "./fontoptions";
import { usefontstore } from "../../store/fontstore";
import { hextorgb } from "../utils/hextorgb";
import axios from "axios";

export default function Preview() {
  const setimagepath = useimagepathstore((state) => state.setimagepath);
  const path = useimagepathstore((state) => state.paths);
  const setfile = usefilestore((state) => state.setfile);
  const filepath = usefilepathstore((state) => state.filepaths);
  const setfilepath = usefilepathstore((state) => state.setfilepath);
  const font = usefontstore((state) => state.font)
  const [open, setopen] = useState(false);
  const [fontsize, setfontsize] = useState(12);
  const [color, setcolor] = useState({ red: 0, green: 0, blue: 0 });
  const [watermarktext, setwatermarktext] = useState("")
  const value = useRef(12);
  const modalref = useRef(null);
  const loc = useLocation();
  let navigate = useNavigate();

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
          filepath, fontsize, color, watermarktext, font
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

  function togglesetting() {
    setopen((prev) => !prev)
  }

  function changeval(e) {
    setfontsize(Number(e.target.value));
  }

  function colorpicker(e) {
    let rgb = hextorgb(e.target.value)
    setcolor(rgb);
  }

  function gettext(e) {
    setwatermarktext(e.target.value)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalref.current && !modalref.current.contains(event.target)) { //avoiding calling .contains on null
        setopen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      {proroute === "Watermark" && (
        <div className="w-full max-w-md mb-6 px-4">
          <label
            htmlFor="watermark"
            className="block text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2"
          >
            Watermark Text
          </label>
          <input
            id="watermark"
            placeholder="Enter watermark text for your PDF"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 font-medium"
            onChange={gettext}
          />

          <div className="relative inline-block mt-4" ref={modalref}>
            <button
              onClick={togglesetting}
              className="flex items-center gap-1 text-red-600 dark:text-red-400 transition-colors text-base font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">add_circle</span>
              <span>Customize</span>
            </button>

            <div
              className={`transition-all duration-300 origin-top transform ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                } mt-2 absolute bg-white dark:bg-gray-700 p-4 rounded-xl shadow-xl w-72 z-10 space-y-4`}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Text Color (RGB):
                  <div className="ml-1 text-xs text-gray-600 dark:text-gray-300">
                    <span>R: {color.red}</span><br />
                    <span>G: {color.green}</span><br />
                    <span>B: {color.blue}</span>
                  </div>
                </label>
                <input
                  type="color"
                  id="color"
                  className="w-full h-10 cursor-pointer rounded"
                  onChange={colorpicker}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Font Size: <span className="ml-1">{fontsize}</span>
                </label>
                <input
                  type="range"
                  id="num"
                  min="12"
                  max="48"
                  className="w-full"
                  ref={value}
                  onInput={changeval}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Font Style:
                </label>
                <Fontoption />
              </div>
            </div>
          </div>
        </div>
      )}


      <section className="flex justify-center flex-wrap gap-2">
        {path.map((path, index) => (
          <figure
            key={index}
            className="p-1 rounded-xl bg-white shadow-xl gap-4"
          >
            {path ? (
              <span className="group">
                <img
                  src={`http://localhost:3000/${path}`}
                  width={190}
                  height={170}
                  className="rounded-md p-2"
                />
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