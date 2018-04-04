'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./backend/configs/backend');
const router = require('./backend/routers/root');
const logger = require('morgan');

const passport = require('./backend/passport');
const expressSession = require('express-session');


//add error handler middleware

express()
	.use(logger('dev'))
	.use('/static',express.static('backend/static'))
	.use(bodyParser.json())
	.use(cookieParser())
	.use(require('express-session')({
		secret: 'some random text',
		resave: false,
		saveUninitialized: false
	}))
	.use(passport.initialize())
	.use(passport.session())
	.use('/', router)
	.listen(config.PORT, () => {
		console.log(`Starting Travelogue on port ${config.PORT}.`);
	});




