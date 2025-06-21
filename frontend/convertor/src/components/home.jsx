import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./cards";
import Navbar from "./navbar";
import Header from "./header";
import UploadPage from "./upload";
import Preview from "./preview-pdf";
import Download from "./download";

export default function Home() {

    return (
        <BrowserRouter>
            <div className="bg-linear-to-b from-gray-200 to-gray-300 dark:bg-linear-to-t dark:from-gray-800 dark:to-gray-700 min-h-screen">
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                <div className="flex flex-wrap justify-center text-wrap">
                                    <Cards
                                        fontawesomeclass={"fa-solid fa-file-circle-plus fa-xl"}
                                        mainheading={"Merge PDF"}
                                        description={"Seamlessly combine multiple PDF files into one"}
                                    />
                                    <Cards
                                        fontawesomeclass={
                                            "fa-solid fa-down-left-and-up-right-to-center fa-xl"
                                        }
                                        mainheading={"Compress PDF"}
                                        description={"Compress PDFs to save space without compromising quality"}
                                    />
                                    <Cards
                                        fontawesomeclass={"fa-solid fa-file-export fa-xl"}
                                        fontawesomeclass2={"fa-solid fa-file-word fa-xl"}
                                        mainheading={"PDF to Word"}
                                        description={
                                            "One Click to Edit – Convert Your PDFs to Word"
                                        }
                                    />
                                    <Cards
                                        fontawesomeclass={"fa-solid fa-stamp fa-xl"}
                                        mainheading={"Watermark"}
                                        description={
                                            "Mark It Yours – Add Watermarks to Your PDFs"
                                        }
                                    />
                                    <Cards
                                        fontawesomeclass={"fa-solid fa-file-export fa-xl"}
                                        fontawesomeclass2={"fa-solid fa-file-powerpoint fa-xl"}
                                        mainheading={"PDF to PowerPoint"}
                                        description={"Transform Your PDFs to Presentations!(Max 1MB File Size)"}
                                    />
                                    <Cards
                                        fontawesomeclass={"fa-solid fa-shield-virus fa-xl"}
                                        mainheading={"Protect PDF"}
                                        description={
                                            "Lock It Tight, Keep It Safe – Secure Your PDF with a Strong Password"
                                        }
                                    />
                                </div>
                            </>
                        }
                    />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/preview" element={<Preview />} />
                    <Route path="/download" element={<Download />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}