import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: "postgres://postgres:12345678@localhost:5432/mindhub",
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // host: process.env.DB_HOST,
    // port: parseInt(process.env.DB_PORT || "5432"),
    // database: process.env.DB_NAME
});

const db = drizzle(pool);
module.exports = pool;