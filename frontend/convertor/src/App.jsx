import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./components/cards";
import Navbar from "./components/navbar";
import Header from "./components/header";
import UploadPage from "./components/upload";
import Preview from "./components/preview-pdf";
import Download from "./components/download";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <div className="flex flex-wrap justify-center">
                    <Cards
                      fontawesomeclass={"fa-solid fa-file-circle-plus fa-xl"}
                      mainheading={"Merge PDF"}
                      description={"Seamlessly Merge Your PDFs!"}
                    />
                    <Cards
                      fontawesomeclass={
                        "fa-solid fa-down-left-and-up-right-to-center fa-xl"
                      }
                      mainheading={"Compress PDF"}
                      description={"Less Size, Same Clarity!"}
                    />
                    <Cards
                      fontawesomeclass={"fa-solid fa-file-export fa-xl"}
                      fontawesomeclass2={"fa-solid fa-file-word fa-xl"}
                      mainheading={"PDF to Word"}
                      description={
                        "One Click to Edit – Convert Your PDFs to Word!"
                      }
                    />
                    <Cards
                      fontawesomeclass={"fa-solid fa-stamp fa-xl"}
                      mainheading={"Watermark"}
                      description={
                        "Mark It Yours – Add Watermarks to Your PDFs!"
                      }
                    />
                    <Cards
                      fontawesomeclass={"fa-solid fa-file-export fa-xl"}
                      fontawesomeclass2={"fa-solid fa-file-powerpoint fa-xl"}
                      mainheading={"PDF to PowerPoint"}
                      description={"Transform Your PDFs to Presentations!"}
                    />
                    <Cards
                      fontawesomeclass={"fa-solid fa-shield-virus fa-xl"}
                      mainheading={"Protect PDF"}
                      description={
                        "Lock It Tight, Keep It Safe – Secure Your PDF with a Strong Password!"
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
    </>
  );
}

export default App;
