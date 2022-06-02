const express = require('express');
const bloodAnalyzeRouter = express.Router();
const getBloodMatchDataAsync = require('./bloodAnalyzeController');

bloodAnalyzeRouter.post('/', async function (req, res) {
    const testName = req.body.testName;
    const response = await getBloodMatchDataAsync(testName);
    res.send(response)  
});

module.exports = bloodAnalyzeRouter;