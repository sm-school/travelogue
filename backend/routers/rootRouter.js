const router = require('express').Router();
const apiRouter = require('./apiRouter');

router.get('/',(req,res)=> res.status(200).sendFile('index.html'));
router.use('/api',apiRouter);

module.exports= router