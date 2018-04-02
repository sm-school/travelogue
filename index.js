'use strict';

const env = require('./backend/configs/env');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rootRouter = require('./backend/routers/root');
const passport = require('./backend/passport');
const expressSession = require('express-session');


if (!env['DB_URL']) {
	console.log(`Can't run Travelogue: ${env} not set.`);
	process.exit(1);
}
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
	.use('/', rootRouter)
	.listen(env.PORT, () => {
		console.log(`Starting Travelogue on port ${env.PORT}.`);
	});




