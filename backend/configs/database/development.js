const username = 'travelogue';
const password = 'superSecret';
const port = 5432;
const db_name = 'traveloguetest';
module.exports = {
	DB_URL: `postgres://${username}:${password}@localhost:${port}/${db_name}`,
};
