'use strict';
const authRouter = require('./auth');

const apiRouter = require('express').Router();
const userRouter = require('./user');
const fetch = require('node-fetch');

apiRouter.use('/auth',authRouter);
apiRouter.use('/user',userRouter);


module.exports = apiRouter;
