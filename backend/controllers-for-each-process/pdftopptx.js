import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
const ZAMZAR_BASE_URL = 'https://sandbox.zamzar.com/v1';

export async function convertPdfToPptx(req, res) {
  try {
    const { filepath } = req.body
    const inputfilepath = filepath[0];
    // Step 1: Upload and create conversion job
    const form = new FormData();
    form.append('source_file', fs.createReadStream(inputfilepath));
    form.append('target_format', 'pptx');

    const jobResponse = await axios.post(`${ZAMZAR_BASE_URL}/jobs`, form, {
      auth: { username: API_KEY, password: '' },
      headers: { "Content-Type": "multipart/form-data" },
    });

    const jobId = jobResponse.data.id;
    console.log(`✅ Job created: ${jobId}`);

    // Step 2: Poll job status until complete
    let jobStatus = 'initializing';
    let statusRes;
    while (jobStatus !== 'successful') {
      await new Promise((r) => setTimeout(r, 3000)); // wait 3 seconds
      statusRes = await axios.get(`${ZAMZAR_BASE_URL}/jobs/${jobId}`, {
        auth: { username: API_KEY, password: '' },
      });

      if (jobStatus === 'failed') {
        throw new Error('Conversion failed on server.');
      }
    }

    const fileId = statusRes.data.target_files[0].id;

    // Step 3: Download converted file
    const downloadStream = await axios({
      method: 'GET',
      url: `${ZAMZAR_BASE_URL}/files/${fileId}/content`,
      auth: { username: API_KEY, password: '' },
      responseType: 'stream',
    });

    // Define output path inside existing final-output folder
    const outputFilePath = path.join(process.cwd(), 'final-output', 'output.pptx');
    const writer = fs.createWriteStream(outputFilePath);
    downloadStream.data.pipe(writer);

    res.json({
      message: "Converted PDF to PPTX succesfully.",
      watermarkedpdf: `/final-output/output.pptx`,
    });
  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message);
  }
}