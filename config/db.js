const { Pool } = require("pg"); // Import the Pool class from the pg module
require('dotenv').config();

const db = new Pool({
    connectionString: process.env.DB
  });
  

module.exports = { db }; 