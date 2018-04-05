'use strict';

const rootRouter = require('express').Router();
const apiRouter = require('./api');
const isLoggedInWithRedirect = require('../helpers/isLoggedInWithRedirect')
const {sendIndexHtml}= require('../controllers/react')
rootRouter.use('/api', apiRouter);

rootRouter.get(['/','/login','/register'], sendIndexHtml);

rootRouter.get('/*',isLoggedInWithRedirect,sendIndexHtml );

module.exports = rootRouter;