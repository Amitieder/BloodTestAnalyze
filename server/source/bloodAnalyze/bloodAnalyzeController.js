const getBloodTestsAsync = require('./bloodAnalyzeModel');
const stringSimilarity = require("string-similarity");

async function getBloodMatchDataAsync(testName) {
    const result = {
        testName: "", 
        treshold: -1
    }

    const bloodTests = await getBloodTestsAsync();
    const testsNames = bloodTests.map(test => test.name.toUpperCase());
    const testNameMatches = stringSimilarity.findBestMatch(testName.toUpperCase(), testsNames);
    const bestMatchRating = testNameMatches.bestMatch.rating;
    
    const sameRatingMatches = testNameMatches.ratings.filter(match =>
        match.rating === bestMatchRating
    );

    if (bestMatchRating > 0 && sameRatingMatches.length === 1) {
      const bestMatchTest = bloodTests[testNameMatches.bestMatchIndex];
      result.testName = bestMatchTest.name;
      result.treshold = bestMatchTest.threshold;
    } 

    return result;
}

module.exports = getBloodMatchDataAsync;