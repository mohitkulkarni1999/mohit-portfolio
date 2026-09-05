const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM profile ORDER BY id LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const { full_name, title, bio, email, phone, location, github, linkedin, twitter, website, avatar_url, resume_url } = req.body;
    const result = await pool.query(
      `UPDATE profile SET full_name=$1, title=$2, bio=$3, email=$4, phone=$5, location=$6,
       github=$7, linkedin=$8, twitter=$9, website=$10, avatar_url=$11, resume_url=$12, updated_at=CURRENT_TIMESTAMP
       RETURNING *`,
      [full_name, title, bio, email, phone, location, github, linkedin, twitter, website, avatar_url, resume_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
