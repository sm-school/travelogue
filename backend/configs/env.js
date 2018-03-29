const stage = process.env.NODE_ENV || 'development';
const serverConfig = require(`./serverConfigs/${stage}`);
const databaseConfig = require(`./databaseConfigs/${stage}`);
const env = { ...serverConfig, ...databaseConfig };

module.exports = env;
