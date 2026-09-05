const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY sort_order ASC, id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, long_description, image_url, demo_url, github_url, tags, featured, sort_order } = req.body;
    const result = await pool.query(
      `INSERT INTO projects (title, description, long_description, image_url, demo_url, github_url, tags, featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [title, description, long_description, image_url, demo_url, github_url, tags || [], featured || false, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, long_description, image_url, demo_url, github_url, tags, featured, sort_order } = req.body;
    const result = await pool.query(
      `UPDATE projects SET title=$1, description=$2, long_description=$3, image_url=$4, demo_url=$5,
       github_url=$6, tags=$7, featured=$8, sort_order=$9, updated_at=CURRENT_TIMESTAMP WHERE id=$10 RETURNING *`,
      [title, description, long_description, image_url, demo_url, github_url, tags || [], featured || false, sort_order || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
