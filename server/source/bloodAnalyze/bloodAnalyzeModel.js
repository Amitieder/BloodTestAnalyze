const https    = require('https');
const aws      = require('aws-sdk');
const { json } = require('express/lib/response');

async function getBloodDataAsync() {

    const myPromise = new Promise((resolve, reject) => {
            
        let s3 = new aws.S3();

        let param = {
            Bucket: 's3.helloheart.home.assignment',
            Key: 'bloodTestConfig.json'
        };

        aws.config.update({
            region: 'US-EAST-1',
        });

        s3.makeUnauthenticatedRequest('getObject',param, (err, data) => {
            if (!err) {
                let bloodTests = JSON.parse(data.Body).bloodTestConfig;
                resolve(bloodTests);
            }
        });
    });

    return myPromise;
}

module.exports = getBloodDataAsync;