import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function mergepdf(req, res) {
    const { filepath } = req.body
    console.log(filepath);
    

    try {
        if (filepath.length == 0) {
            return res.status(400).json({ error: "Invalid file paths" });
        }

        const mergedpdf = await PDFDocument.create();
        const outputPath = path.join(process.cwd(), 'file-storage', 'merged.pdf');
        for (const f of filepath) {
            const pdfbytes = await fs.readFile(f);
            const pdf = await PDFDocument.load(pdfbytes);
            const copiedPages = await mergedpdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedpdf.addPage(page));
        }

        const finalmergedpdf = await mergedpdf.save();
        await fs.writeFile(outputPath, finalmergedpdf);


        res.json({
            message: "PDFs merged successfully.",
            mergedPdfPath: `/file-storage/merged.pdf` 
          });
          
    } catch (error) {
        console.error("Error during PDF merge:", error);
        res.status(500).json({ error: "PDF merge failed." });
    }
}
