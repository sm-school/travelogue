const rootRouter = require('express').Router();
const apiRouter = require('./apiRouter');

rootRouter.get('/', (req, res) => {
	res.status(200).sendFile(
		'index.html', { root: './backend/static' }
	);
});

rootRouter.use('/api', apiRouter);

module.exports = rootRouter;
