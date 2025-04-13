import { Router } from "express";
import multer, { diskStorage } from "multer";
import { promises as fs } from "fs";
import { pdfToPng } from "pdf-to-png-converter";
import { PDFDocument } from "pdf-lib";
import { mergepdf } from "../controllers-for-each-process/mergepdf.js";

const router = Router();

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "file-storage");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Extract first page and convert to PNG
async function extractfirstpage(files) {
  try {
    let extractedimages = [];
    for (const file of files) {
      const pdfPath = file.path;
      const mergedPdfDoc = await PDFDocument.create();
      const existingPdfBytes = await fs.readFile(pdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const [firstpage] = await mergedPdfDoc.copyPages(pdfDoc, [0]); //obj inside array 

      mergedPdfDoc.addPage(firstpage);
      const firstPagePdfBytes = await mergedPdfDoc.save();

      const outputimages = await pdfToPng(firstPagePdfBytes, {
        disableFontFace: false,
        useSystemFonts: false,
        viewportScale: 1.0,
      });

      if (outputimages.length > 0) {
        const firstpageimage = outputimages[0];
        const imagepath = `file-storage/${file.filename.split(".")[0]}.jpeg`;
        await fs.writeFile(imagepath, firstpageimage.content);

        extractedimages.push({
          pdfName: file.originalname,
          imagepath: imagepath,
        });
      }
    }
    return extractedimages;
  } catch (error) {
    console.error("Error extracting first page:", error);
    return [];
  }
}

router.post("/upload", upload.array("files"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded." });
  }

  try {
    const filepath = req.files.map((file) => file.path);
    const { ProcessRoute } = req.body;
    const extractedImages = await extractfirstpage(req.files);
    res.json({
      message: "Files uploaded successfully",
      imagePath: extractedImages,
      ProcessRoute: ProcessRoute,
      filepath: filepath
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File processing failed." });
  }
});

router.post("/merge", mergepdf);
// router.post("/", compresspdf);

export default router;
