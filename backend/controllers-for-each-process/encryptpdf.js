import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export const Encryptpdf = async (req, res) => {
  try {
    const { filepath } = req.body;
    if (!filepath || filepath.length === 0) {
      return res.status(400).json({ error: "No file provided" });
    }

    const pdfpath = path.resolve(filepath[0]);
    const outputdir = path.join(process.cwd(), "final-output", `Encrypted.pdf`); //output-directory
    const scriptpath = path.join(dirname, "./en.py");

    execFile("py", [scriptpath, pdfpath, outputdir], (error, stderr) => {
      if (error) {
        console.error("Python error:", stderr);
        return res.status(500).json({ error: "Encryption failed", details: stderr });
      }

      res.status(200).json({
        message: "Enryption sucess",
        pdftowordpath: `/final-output/Encrypted.pdf`
      });
    });
  } catch (err) {
    console.error("Encryption error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
