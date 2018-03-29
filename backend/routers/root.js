const rootRouter = require('express').Router();
const apiRouter = require('./api');

rootRouter.get('/', (req, res) => {
	res.status(200).sendFile(
		'index.html', { root: './backend/static' }
	);
});

rootRouter.use('/api', apiRouter);

module.exports = rootRouter;
