import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/upload-route.js";

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);//url of current file
const __dirname = path.dirname(__filename); //extract folder name from full path

app.use('/file-storage', express.static(path.join(__dirname, 'file-storage')));
app.use('/final-output', express.static(path.join(__dirname, 'final-output')));


app.use(router);

const port = 3000;
app.listen(port, () => {
    console.log(`server is running at http://127.0.0.1:${port}`);
});
