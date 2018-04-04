'use strict';
const fetch = require('node-fetch');

const api = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');

const db = require('../controllers/db');
const getSignatureS3 = require('../controllers/s3');

api.use('/auth',authRouter);
api.use('/user',userRouter);

api.get('/sign-s3', getSignatureS3);

module.exports = api;
