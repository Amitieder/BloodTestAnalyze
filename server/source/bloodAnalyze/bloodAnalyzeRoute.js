const express            = require('express');
const bloodAnalyzeRouter = express.Router();
const getBloodTestData   = require('./bloodAnalyzeController');

bloodAnalyzeRouter.post('/', async function (req, res) {
    let testText = req.body.testText;
    let response = await getBloodTestData(testText);
    res.send(response)
});

module.exports = bloodAnalyzeRouter;