import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function watermark(req,res) {
    const {filepath, fontsize, color, watermarktext, font} = req.body
}