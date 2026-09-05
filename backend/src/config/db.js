const { Pool } = require('pg');

try { require('dotenv').config(); } catch {}

const connectionString = (process.env.DATABASE_URL
  || process.env.POSTGRES_URL
  || process.env.SUPABASE_DB_URL
  || process.env.DIRECT_URL
  || `postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'portfolio_db'}`)
  .replace(/(\?|&)sslmode=[^&]*/g, '');

const isRemote = !!(process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.SUPABASE_DB_URL || process.env.DIRECT_URL);

const pool = new Pool({
  connectionString,
  ssl: isRemote
    ? { rejectUnauthorized: false }
    : process.env.DB_SSL === 'true'
      ? { rejectUnauthorized: false }
      : false,
});

module.exports = pool;
