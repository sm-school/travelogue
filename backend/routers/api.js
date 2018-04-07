'use strict';

const api = require('express').Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const imageRouter = require('./image');

const getSignatureS3 = require('../controllers/s3');

api.use('/auth', authRouter);
api.use('/image', imageRouter);
api.get('/sign-s3', getSignatureS3);
api.use('/user', userRouter);

module.exports = api;
