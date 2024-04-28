const { Pool } = require("pg");
require("dotenv").config();
const myURI = process.env.PG_URI;

const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
