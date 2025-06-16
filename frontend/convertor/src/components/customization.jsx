import React, { useRef, useState, useEffect } from "react";
import Fontoption from "./fontoptions";
import { hextorgb } from "../utils/hextorgb";

export default function Customize({ proroute,setopen,open,fontsize,setfontsize,color,setcolor,modalref,value,watermarktext }) {
   
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
        watermarktext.current = e.target.value
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
        <div>
            {proroute == "Watermark" && (
                <div className="w-full max-w-md mb-6 px-4">
                    <label
                        htmlFor="watermark"
                        className="block text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center"
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
                            className="flex items-center gap-1 text-red-600 dark:text-white transition-colors text-base font-medium cursor-pointer"
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
        </div>
    )

}