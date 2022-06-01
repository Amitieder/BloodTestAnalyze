const getBloodDataAsync = require('./bloodAnalyzeModel');
const stringSimilarity  = require("string-similarity");

async function getBloodTestData(testText) {
    const bloodData     = await getBloodDataAsync();
    let matchedTestName = "";
    let matchedTreshold = -1;

    const allTestNames = bloodData.map( test => {
        return test.name.toUpperCase();
    });

    const matches = stringSimilarity.findBestMatch(
        testText.toUpperCase(),
        allTestNames
    );

    const bestMatchRating = matches.bestMatch.rating;

    const sameRating = matches.ratings.filter((match) =>
        match.rating === bestMatchRating
    )

    if (bestMatchRating > 0 && sameRating.length === 1) {
      const matchedTest = bloodData[matches.bestMatchIndex];

      matchedTestName = matchedTest.name;
      matchedTreshold = matchedTest.threshold;
    } 

    return { matchedTestName: matchedTestName, 
             matchedTreshold: matchedTreshold }
}

module.exports = getBloodTestData;