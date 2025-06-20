import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export const convertPdftodocx = async (req, res) => {
  try {
    const { filepath } = req.body;
    if (!filepath || filepath.length === 0) {
      return res.status(400).json({ error: "No file provided" });
    }

    const pdfpath = path.resolve(filepath[0]);
    const outputdir = path.join(process.cwd(), "final-output", `Word.docx`); //output-directory
    const scriptpath = path.join(dirname, "./pdftoword.py");

    execFile("py", [scriptpath, pdfpath, outputdir], (error, stderr) => {
      if (error) {
        console.error("Python error:", stderr);
        return res.status(500).json({ error: "Conversion failed", details: stderr });
      }

      res.status(200).json({
        message: "pdf to word sucess",
        pdftowordpath: `/final-output/Word.docx`
      });
    });
  } catch (err) {
    console.error("Conversion error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
