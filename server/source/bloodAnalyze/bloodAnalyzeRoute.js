const express = require('express');
const bloodAnalyzeRouter = express.Router();
const getBloodMatchDataAsync = require('./bloodAnalyzeController');

bloodAnalyzeRouter.post('/', async function (req, res) {
    let testName = req.body.testName;
    let response = await getBloodMatchDataAsync(testName);
    res.send(response)  
});

module.exports = bloodAnalyzeRouter;