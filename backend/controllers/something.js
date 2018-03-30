'use strict';

const db = require('../controllers/db.js');

function something (thing) {
	const sql = `
SELECT something
FROM something
WHERE thing = $1`;

	return db.manyOrNone(sql, thing)
		.then( something => {
			return something;
		})
		.catch( error => {
			console.log({ error: error.message });
		});
}

module.exports = { something };
