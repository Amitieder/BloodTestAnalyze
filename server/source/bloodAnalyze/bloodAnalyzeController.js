const getBloodDataAsync = require('./bloodAnalyzeModel');
const stringSimilarity = require("string-similarity");

function getBloodMatchData(testText) {
    let bestMatchedTestName = "";
    let bestMatchedTreshold = -1;

    const bloodData = getBloodDataAsync();

    const testNames = bloodData.map( test => {
        return test.name.toUpperCase();
    });

    const testMatches = stringSimilarity.findBestMatch(
        testText.toUpperCase(),
        testNames
    );

    const bestMatchRating = testMatches.bestMatch.rating;

    const sameRating = testMatches.ratings.filter((match) =>
        match.rating === bestMatchRating
    )

    if (bestMatchRating > 0 && sameRating.length === 1) {
      const bestMatchedTest = bloodData[testMatches.bestMatchIndex];

      bestMatchedTestName = bestMatchedTest.name;
      bestMatchedTreshold = bestMatchedTest.threshold;
    } 

    return { matchedTestName: bestMatchedTestName, 
             matchedTreshold: bestMatchedTreshold }
}

module.exports = getBloodMatchData;