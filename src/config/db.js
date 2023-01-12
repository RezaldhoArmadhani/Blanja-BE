const { Pool } = require('pg')

const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

db.connect((err) => {
  if (err) {
    console.log(err)
  }
  console.log("Database connected")
})

module.exports = db
