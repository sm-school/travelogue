'use strict';

const rootRouter = require('express').Router();
const apiRouter = require('./api');

const { sendIndexHtml } = require('../controllers/react');

const isLoggedInWithRedirect = require('../helpers/isLoggedInWithRedirect');

rootRouter.use('/api', apiRouter);

rootRouter.get([ '/', '/login', '/logout', '/register'], sendIndexHtml);

rootRouter.get('/*', isLoggedInWithRedirect, sendIndexHtml);

module.exports = rootRouter;
