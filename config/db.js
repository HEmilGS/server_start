const { Pool } = require("pg"); // Import the Pool class from the pg module

const db = new Pool({
    connectionString: "postgresql://myPostgres_owner:D0yM9RZnBgPJ@ep-floral-moon-a5oafbd3.us-east-2.aws.neon.tech/catedraapi?sslmode=require",
  });
  

module.exports = { db }; 