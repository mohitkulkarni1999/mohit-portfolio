const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL
  || `postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'portfolio_db'}`;

const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = pool;
