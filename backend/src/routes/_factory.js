const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const INSERTABLE_COLUMNS = [
  'name', 'category', 'proficiency', 'icon', 'sort_order',
  'title', 'description', 'long_description', 'image_url', 'demo_url', 'github_url', 'tags', 'featured',
  'company', 'position', 'start_date', 'end_date', 'is_current', 'location',
  'institution', 'degree', 'field_of_study', 'grade',
  'issuer', 'date_earned', 'credential_url', 'date_awarded',
  'features', 'role', 'message', 'avatar_url', 'rating', 'label', 'value', 'suffix',
  'icon_url', 'slug', 'excerpt', 'content', 'cover_image', 'published', 'read_minutes',
  'subject', 'email', 'is_read', 'text'
];

function isInsertable(key) {
  return INSERTABLE_COLUMNS.includes(key);
}

function jsonParse(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'string') {
    try { const p = JSON.parse(v); return p; } catch { return v; }
  }
  return v;
}

function createCrudRouter(table, opts = {}) {
  const router = express.Router();
  const { sortDefault = 'sort_order ASC, id ASC', readOnly = false } = opts;

  router.get('/', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table} ORDER BY ${sortDefault}`);
      res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  router.get('/:id', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  if (!readOnly) {
    router.post('/', auth, async (req, res) => {
      try {
        const body = req.body || {};
        const columns = Object.keys(body).filter(isInsertable);
        if (columns.length === 0) return res.status(400).json({ error: 'No valid fields provided' });
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
        const values = columns.map((c) => jsonParse(body[c]));
        const result = await pool.query(
          `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`,
          values
        );
        res.status(201).json(result.rows[0]);
      } catch (err) { res.status(500).json({ error: err.message }); }
    });

    router.put('/:id', auth, async (req, res) => {
      try {
        const body = req.body || {};
        const columns = Object.keys(body).filter(isInsertable);
        if (columns.length === 0) return res.status(400).json({ error: 'No valid fields provided' });
        const sets = columns.map((c, i) => `${c} = $${i + 1}`).join(', ');
        const values = columns.map((c) => jsonParse(body[c]));
        values.push(req.params.id);
        const result = await pool.query(
          `UPDATE ${table} SET ${sets} WHERE id = $${values.length} RETURNING *`,
          values
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
      } catch (err) { res.status(500).json({ error: err.message }); }
    });

    router.delete('/:id', auth, async (req, res) => {
      try {
        await pool.query(`DELETE FROM ${table} WHERE id = $1`, [req.params.id]);
        res.json({ message: 'Deleted' });
      } catch (err) { res.status(500).json({ error: err.message }); }
    });
  }

  return router;
}

module.exports = { createCrudRouter };
