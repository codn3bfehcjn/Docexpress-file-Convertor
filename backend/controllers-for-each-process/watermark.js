import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function watermark(req, res) {
    try {
        const { filepath, fontsize, color: { red, green, blue }, watermarktext, font } = req.body;
        const savepath = path.join(process.cwd(), 'final-output', 'watermark.pdf');

        let element = filepath[0];
        let read = await fs.readFile(element)
        const pdf = await PDFDocument.load(read);
        let pages = pdf.getPages();
        for (let page of pages) {
            const { width, height } = page.getSize();
            const textWidth = watermarktext.length * 10;
            page.drawText(watermarktext, {
                x: (width - textWidth) / 2,
                y: height / 2,
                size: fontsize,
                color: rgb(red, green, blue),
            });
        }
        const bytes = await pdf.save();
        await fs.writeFile(savepath, bytes);
        res.json({
            message: "Watermark added to PDF successfully.",
            watermarkedpdf: `/final-output/watermark.pdf`,
            identifier:"watermark"
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Adding watermark to PDF failed." });
    }
} 