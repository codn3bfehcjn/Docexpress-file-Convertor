import React from "react";
import { usefontstore } from "../../store/fontstore";
export default function Fontoption() {
    const setfontstyle = usefontstore((state) => state.setfont)
    const fonts = [
        { name: "Roboto", family: "'Roboto', sans-serif" },
        { name: "Lobster", family: "'Lobster', cursive" },
        { name: "Ancizar Serif", family: "'Ancizar Serif', serif" },
        { name: "Crimson Pro", family: "'Crimson Pro', serif" },
        { name: "Source Code Pro", family: "'Source Code Pro', monospace" },
        { name: "Manrope", family: "'Manrope', sans-serif" },
        { name: "WDXL Lubrifont TC", family: "'WDXL Lubrifont TC', sans-serif" },
    ];

    function Getfontstyle(e) {
        let v = e.target.value
        let font = v.split(',')[0]
        console.log(font);

        setfontstyle(font)
    }
    return (
        <>
            <div>
                <select onChange={Getfontstyle} className="bg-gray-300 dark:bg-gray-200 rounded-md">
                    {fonts.map((font, idx) => (
                        <option key={idx} value={font.name} style={{ fontFamily: font.family }}>
                            {font.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}