import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
const ZAMZAR_BASE_URL = 'https://sandbox.zamzar.com/v1';

export async function convertPdftoppt(req, res) {
  try {
    const { filepath } = req.body
    const inputfilepath = filepath[0];

    const form = new FormData();
    form.append('source_file', fs.createReadStream(inputfilepath));
    form.append('target_format', 'pptx');

    const jobResponse = await axios.post(`${ZAMZAR_BASE_URL}/jobs`, form, {
      auth: { username: API_KEY, password: '' },
      headers: { "Content-Type": "multipart/form-data" },
    });

    const jobId = jobResponse.data.id;
    console.log(`Job created: ${jobId}`);

    let jobStatus = 'initializing';
    let status;
    while (jobStatus !== 'successful') {
      await new Promise((r) => setTimeout(r, 3000));
      status = await axios.get(`${ZAMZAR_BASE_URL}/jobs/${jobId}`, {
        auth: { username: API_KEY, password: '' },
      });
      jobStatus = status.data.status;
      console.log(jobStatus);

      if (jobStatus === 'failed') {
        throw new Error('Conversion failed on server.');
      }
    }

    const fileId = status.data.target_files[0].id;

    const downloadStream = await axios({
      method: 'GET',
      url: `${ZAMZAR_BASE_URL}/files/${fileId}/content`,
      auth: { username: API_KEY, password: '' },
      responseType: 'stream',
    });

    const outputFilePath = path.join(process.cwd(), 'final-output', 'convertedppt.pptx');
    const writer = fs.createWriteStream(outputFilePath);
    downloadStream.data.pipe(writer);

    res.status(200).json({
      message: "Converted PDF to PPTX succesfully.",
      outputppt: `/final-output/convertedppt.pptx`
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}