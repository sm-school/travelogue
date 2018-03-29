const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const cors = require('cors')

AWS.config.update({
    signatureVersion: 'v4',
    region: process.env.AWS_REGION
});

app.use(cors());

const s3 = new AWS.S3();

app.get('/sign-s3', (req, res) => {
    console.log(req.query);
    const {
        fileName,
        fileType
    } = req.query;

    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        ContentType: fileType,
        ACL: 'public-read-write'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
            res.json({
                signedRequest: data,
                url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`
            });
        }
    });
});

app.listen(8080, function () {
    console.log('Listening on port 8080!');
});