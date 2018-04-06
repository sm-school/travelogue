'use strict';

[
	'TRAVELOGUE_DB_PORT',
	'TRAVELOGUE_DB_NAME',
	'TRAVELOGUE_DB_USER',
	'TRAVELOGUE_DB_PASS',
].forEach( env => {
	if (!process.env[env]) {
		console.log(`Can't run Travelogue: ${env} not set.`);
		process.exit(1);
	}
});

const port = process.env.TRAVELOGUE_DB_PORT;
const name = process.env.TRAVELOGUE_DB_NAME;
const user = process.env.TRAVELOGUE_DB_USER;
const pass = process.env.TRAVELOGUE_DB_PASS;

module.exports = {
	DB_URL: `postgres://${user}:${pass}@localhost:${port}/${name}`,
};

