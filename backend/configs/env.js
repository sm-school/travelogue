const stage= process.env.NODE_ENV || 'development'
const serverConfig= require(`.serverConfig/${stage}`);
const databaseConfig= require(`.serverConfig/${stage}`)
export const env = {...serverConfig,...databaseConfig}