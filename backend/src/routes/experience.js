const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM experience ORDER BY sort_order ASC, start_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { company, position, description, start_date, end_date, is_current, location, sort_order } = req.body;
    const result = await pool.query(
      `INSERT INTO experience (company, position, description, start_date, end_date, is_current, location, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [company, position, description, start_date, end_date || null, is_current || false, location, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { company, position, description, start_date, end_date, is_current, location, sort_order } = req.body;
    const result = await pool.query(
      `UPDATE experience SET company=$1, position=$2, description=$3, start_date=$4, end_date=$5,
       is_current=$6, location=$7, sort_order=$8 WHERE id=$9 RETURNING *`,
      [company, position, description, start_date, end_date || null, is_current || false, location, sort_order || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM experience WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
