'use strict';

const username = 'travelogue';
const password = process.env.TRAVELOGUE_DB_PASS;
const port = 5432;
const db_name = 'travelogue';

if (!password) {
	throw new Error('Can\'t start Travelogue: set TRAVELOGUE_DB_PASS in env');
}

module.exports = {
	DB_URL: `postgres://${username}:${password}@localhost:${port}/${db_name}`,
};
