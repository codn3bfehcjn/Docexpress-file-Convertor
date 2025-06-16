import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function mergepdf(req, res) {
    const { filepath } = req.body

    try {
        if (filepath.length == 0) {
            return res.status(400).json({ error: "Invalid file paths" });
        }
        const mergedpdf = await PDFDocument.create();
        const outputPath = path.join(process.cwd(), 'final-output', 'merged.pdf');
        for (const f of filepath) {
            const pdfbytes = await fs.readFile(f);
            const pdf = await PDFDocument.load(pdfbytes);
            const copiedPages = await mergedpdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedpdf.addPage(page));
        }

        const finalmergedpdf = await mergedpdf.save();
        await fs.writeFile(outputPath, finalmergedpdf);

        res.status(200).json({
            message: "PDFs merged successfully.",
            mergedpdfpath: `/final-output/merged.pdf` 
          });
          
    } catch (error) {
        console.error("Error during PDF merge:", error);
        res.status(500).json({ error: "PDF merge failed." });
    }
}
