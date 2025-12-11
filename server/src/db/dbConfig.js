const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 30000,
});

pool.query("select 1", (err, res) => {
  if(err) console.error("dbPostgre ERROR:", err.message);
  else console.log("dbPostgre OK");
})

module.exports = pool;