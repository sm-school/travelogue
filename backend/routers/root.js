'use strict';

const rootRouter = require('express').Router();
const apiRouter = require('./api');

const { sendIndexHtml } = require('../controllers/react');

const isLoggedIn = require('../helpers/isLoggedIn');

rootRouter.use('/api', apiRouter);

rootRouter.get([ '/', '/login', '/logout', '/register' ], sendIndexHtml);

rootRouter.get( '/.well-known/acme-challenge/RCLTT3G4dOYLF8bIMi2Sy-0iu7MMljhOYFkcSmQcRnI', (req,res)=>{
    res.status(200).sendFile('sslcheck', { root: './backend/static' });
});
rootRouter.get( '/googlefc6baf798576a6fd.html ', (req,res)=>{
    res.status(200).sendFile('googlefc6baf798576a6fd.html', { root: './backend/static' });
});


rootRouter.get('/*', isLoggedIn, sendIndexHtml);

module.exports = rootRouter;
