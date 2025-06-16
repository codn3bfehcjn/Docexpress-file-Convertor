import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);//import.meta.url-gives absoloute url of the current file
//fileURLToPath-gives file url to file path with proper adjustments for (/,%)
const __dirname = path.dirname(__filename);

export const convertPdftodocx = async (req, res) => {
  try {
    const { filepath } = req.body;

    if (!filepath || filepath.length === 0) {
      return res.status(400).json({ error: "No file provided" });
    }

    const pdfpath = path.resolve(filepath[0]);
    const outputDir = path.join(__dirname, "../final-output"); //output-directory
    const wordfilepath = path.join(outputDir, "converted.docx");//file in output directory
    const scriptpath = path.join(__dirname, "./pdftoword.py");

    execFile("python", [scriptpath, pdfpath, wordfilepath], (error,stderr) => {
      if (error) {
        console.error("Python error:", stderr);
        return res.status(500).json({ error: "Conversion failed", details: stderr });
      }

      res.status(200).json({
        message: "pdf to word sucess",
        pdftowordpath: "/final-output/converted.docx"
      });
    });
  } catch (err) {
    console.error("Conversion error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
