const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skills ORDER BY sort_order ASC, id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, category, proficiency, icon, sort_order } = req.body;
    const result = await pool.query(
      'INSERT INTO skills (name, category, proficiency, icon, sort_order) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [name, category || 'technical', proficiency || 80, icon, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { name, category, proficiency, icon, sort_order } = req.body;
    const result = await pool.query(
      'UPDATE skills SET name=$1, category=$2, proficiency=$3, icon=$4, sort_order=$5 WHERE id=$6 RETURNING *',
      [name, category, proficiency, icon, sort_order, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM skills WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
