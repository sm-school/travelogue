const username= 'admin'
const password= 'postgres'
const port= 5432
const db_name= 'test'
module.exports= {
DB_URL: `postgres://${username}:${password}@localhost:${port}/${db_name}`
}