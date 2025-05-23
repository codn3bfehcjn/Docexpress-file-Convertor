import React, { useState } from "react";
import { usefontstore } from "../../store/fontstore";
export default function Fontoption() {
    const setfontstyle = usefontstore((state) => state.setfont)
    const fonts = [
        { name: "Roboto", family: "'Roboto', sans-serif" },
        { name: "Lobster", family: "'Lobster', cursive" },
        { name: "Open Sans", family: "'Open Sans', sans-serif" },
        { name: "Playfair Display", family: "'Playfair Display', serif" },
        { name: "Pacifico", family: "'Pacifico', cursive" },
        { name: "Raleway", family: "'Raleway', sans-serif" },
        { name: "Monospace", family: "monospace" },
        { name: "Indie Flower", family: "'Indie Flower', cursive" },
        { name: "Oswald", family: "'Oswald', sans-serif" },
        { name: "Courier Prime", family: "'Courier Prime', monospace" },
        { name: "Roboto Mono", family: "'Roboto Mono', monospace" },
        { name: "Quicksand", family: "'Quicksand', sans-serif" },
        { name: "Anton", family: "'Anton', sans-serif" },
        { name: "Caveat", family: "'Caveat', cursive" },
        { name: "Orbitron", family: "'Orbitron', sans-serif" },
    ];

    function Getfontstyle(e) {
        setfontstyle(e.target.value)
    }
    return (
        <>
            <div>
                <select onChange={Getfontstyle} className="bg-gray-300 dark:bg-gray-200 rounded-md">
                    {fonts.map((font, idx) => (
                        <option key={idx} value={font.family} style={{ fontFamily: font.name }}>
                            {font.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}