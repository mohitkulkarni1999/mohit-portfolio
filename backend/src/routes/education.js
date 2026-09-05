const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM education ORDER BY sort_order ASC, start_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { institution, degree, field_of_study, start_date, end_date, grade, description, sort_order } = req.body;
    const result = await pool.query(
      `INSERT INTO education (institution, degree, field_of_study, start_date, end_date, grade, description, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [institution, degree, field_of_study, start_date, end_date || null, grade, description, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { institution, degree, field_of_study, start_date, end_date, grade, description, sort_order } = req.body;
    const result = await pool.query(
      `UPDATE education SET institution=$1, degree=$2, field_of_study=$3, start_date=$4, end_date=$5,
       grade=$6, description=$7, sort_order=$8 WHERE id=$9 RETURNING *`,
      [institution, degree, field_of_study, start_date, end_date || null, grade, description, sort_order || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM education WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
