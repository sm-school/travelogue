'use strict';

const rootRouter = require('express').Router();
const apiRouter = require('./api');

const { sendIndexHtml } = require('../controllers/react');

const isLoggedIn = require('../helpers/isLoggedIn');

rootRouter.use('/api', apiRouter);

rootRouter.get([ '/', '/login', '/logout', '/register' ], sendIndexHtml);

rootRouter.get('/*', isLoggedIn, sendIndexHtml);

module.exports = rootRouter;
