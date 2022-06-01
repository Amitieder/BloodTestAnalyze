const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bloodAnalyzeRouter = require('./bloodAnalyze/bloodAnalyzeRoute');
const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/get-threshold', bloodAnalyzeRouter);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});