const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use('/file-storage', express.static('file-storage'));

const router = require('./routes/upload-route');
app.use(router);

let port = 3000;
app.listen(port, () => {
    console.log(`server is running at http://127.0.0.1:${port}`);
})

