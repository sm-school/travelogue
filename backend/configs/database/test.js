'use strict';

const username = 'travelogue';
const password = 'test db password';
const port = 5432;
const db_name = 'travelogue_test';

module.exports = {
	DB_URL: `postgres://${username}:${password}@localhost:${port}/${db_name}`,
};
