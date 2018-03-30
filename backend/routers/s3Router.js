'use strict';

const s3Router = require('express').Router();

const {getSignatureS3} = require('../controllers/s3');

s3Router.get('/sign-s3', getSignatureS3);

module.exports = s3Router; 