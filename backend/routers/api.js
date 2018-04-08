'use strict';

const api = require('express').Router();

const auth = require('./auth');
const image = require('./image');
const s3 = require('../controllers/s3');
const trip = require('./trip');
const user = require('./user');

api.use('/auth', auth);
api.use('/image', image);
api.get('/sign-s3', s3);;
api.get('/trip', trip);
api.use('/user', user);

module.exports = api;
