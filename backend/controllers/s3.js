const fetch = require('node-fetch');
const AWS = require('aws-sdk');

AWS.config.update({
	signatureVersion: 'v4',
	region: process.env.AWS_REGION,
	accessKeyId: process.env.S3_ACCESS_KEY, 
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const getSignatureS3 = (req, res) => {
	const {
		fileName,
		fileType,
	} = req.query;

	const s3Params = {
		Bucket: process.env.AWS_S3_BUCKET,
		Key: fileName,
		ContentType: fileType,
		ACL: 'public-read-write',
	};
	console.log(s3Params)
	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		console.log(data,err)
		if (err) {
			console.error('h'+err);
		} else {
			
			res.json({
				signedRequest: data,
				url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`,
			});
		}
	});
};

module.exports = getSignatureS3;
