require("dotenv").config();
const {Pool}= require("pg");

module.exports = new Pool({
    connectionString: process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL
})
