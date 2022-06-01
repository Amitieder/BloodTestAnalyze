const express = require('express');
const bloodAnalyzeRouter = express.Router();
const getBloodMatchData = require('./bloodAnalyzeController');

bloodAnalyzeRouter.post('/', async function (req, res) {
    let testText = req.body.testText;
    let response = await getBloodMatchData(testText);
    res.send(response)
});

module.exports = bloodAnalyzeRouter;