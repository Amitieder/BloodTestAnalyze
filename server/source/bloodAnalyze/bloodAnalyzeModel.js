const https = require('https');
const aws = require('aws-sdk');
const { json } = require('express/lib/response');

async function getBloodDataAsync() {
            
        const s3 = new aws.S3();

        const param = {
            Bucket: 's3.helloheart.home.assignment',
            Key: 'bloodTestConfig.json'
        };

        aws.config.update({
            region: 'US-EAST-1',
        });

    const myPromise = new Promise((resolve, reject) => {

        s3.makeUnauthenticatedRequest('getObject',param, (err, data) => {
            if (!err) {
                const bloodTests = JSON.parse(data.Body).bloodTestConfig;
                resolve(bloodTests);
            }
        });
    });

    const bloodTestsData = await myPromise;

    return bloodTestsData;
}

module.exports = getBloodDataAsync;