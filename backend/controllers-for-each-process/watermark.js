import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import fontkit from '@pdf-lib/fontkit'

export async function watermark(req, res) {
    try {
        const { filepath, fontsize, color: { red, green, blue }, text, font } = req.body;
        const savepath = path.join(process.cwd(), 'final-output', 'watermark.pdf');
        let element = filepath[0];
        let read = await fs.readFile(element)
        const pdf = await PDFDocument.load(read);

        pdf.registerFontkit(fontkit)// custom fonts add kar rahe hai given pdf mein
        let fontbytes;
        const selectedFont = font.trim();
        switch (selectedFont) { //for applying fonts to the watermark text user has given
            case 'Roboto':
                fontbytes = await fs.readFile('./fonts/Roboto-VariableFont_wdth,wght.ttf');
                break;
            case 'Lobster':
                fontbytes = await fs.readFile('./fonts/Lobster-Regular.ttf');
                break;
            case 'Ancizar Serif':
                fontbytes = await fs.readFile('./fonts/AncizarSerif-VariableFont_wght.ttf')
                break;
            case 'Crimson Pro':
                fontbytes = await fs.readFile('./fonts/CrimsonPro-VariableFont_wght.ttf')
                break;
            case 'Manrope':
                fontbytes = await fs.readFile('./fonts/Manrope-VariableFont_wght.ttf')
                break;
            case 'Source Code Pro':
                fontbytes = await fs.readFile('./fonts/SourceCodePro-VariableFont_wght.ttf')
                break;
            case 'WDXL Lubrifont TC':
                fontbytes = await fs.readFile('./fonts/WDXLLubrifontTC-Regular.ttf')
                break;
            default:
                throw new Error(`Unsupported font: ${selectedFont}`);
        }

        const customfont = await pdf.embedFont(fontbytes);
        let pages = pdf.getPages();
        for (let page of pages) {
            const { width, height } = page.getSize();
            const textwidth = text.length * 10;
            page.drawText(text, {
                x: (width - textwidth) / 2,
                y: height / 2,
                size: fontsize,
                color: rgb(red, green, blue),
                font: customfont
            });
        }
        const bytes = await pdf.save();
        await fs.writeFile(savepath, bytes);
        res.status(200).json({
            message: "Watermark added to PDF successfully.",
            watermarkedpdf: `/final-output/watermark.pdf`,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Adding watermark to PDF failed." });
    }
} 