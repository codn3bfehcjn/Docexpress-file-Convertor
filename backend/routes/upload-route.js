const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { pdfToPng } = require("pdf-to-png-converter");
const { PDFDocument } = require('pdf-lib');

const router = express.Router();
const { mergepdf } = require("../controllers-for-each-process/mergepdf");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'file-storage');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100);
        cb(null, file.originalname + '-' + uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, //file size 10MB
});

// function to extract the first page as PNG
async function extractfirstpage(files) {
    try {
        let extractedimages = [];
        for (const file of files) {
            let pdfPath = file.path; // path of uploaded pdf's
            const mergedPdfDoc = await PDFDocument.create();
            const existingPdfBytes = await fs.promises.readFile(pdfPath);
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const [firstpage] = await mergedPdfDoc.copyPages(pdfDoc, [0])
            
            mergedPdfDoc.addPage(firstpage)
            const firstPagePdfBytes = await mergedPdfDoc.save();

            // convert PDF to PNG
            const outputimages = await pdfToPng(firstPagePdfBytes, {
                disableFontFace: false,
                useSystemFonts: false,
                viewportScale: 1.0,
            });//returns an array

            // save the first-page image
            if (outputimages.length > 0) {
                const firstpageimage = outputimages[0];
                const imagepath = `file-storage/${file.filename.split('.')[0]}.png`;
                await fs.promises.writeFile(imagepath, firstpageimage.content);

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
        let { ProcessRoute } = req.body
        let extractedImages = await extractfirstpage(req.files);
        res.json({
            message: "Files uploaded successfully",
            imagePath: extractedImages,
            ProcessRoute: ProcessRoute
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "File processing failed." });
    }
});

// router.post('/merge', mergepdf)

module.exports = router;