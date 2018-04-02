const rootRouter = require('express').Router();
const apiRouter = require('./api');
const authRouter = require('./auth');
const isLoggedIn = require('../helpers/isLoggedIn')
const {sendIndexHtml}= require('../controllers/react')
rootRouter.use('/api', apiRouter);

rootRouter.get(['/','/login','/register'], sendIndexHtml);

rootRouter.get('/*',isLoggedIn,sendIndexHtml );

module.exports = rootRouter;