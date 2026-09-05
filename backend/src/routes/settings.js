const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/public', async (req, res) => {
  try {
    const result = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settings = {};
    result.rows.forEach((r) => { settings[r.setting_key] = r.setting_value; });
    res.json(settings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settings = {};
    result.rows.forEach((r) => { settings[r.setting_key] = r.setting_value; });
    res.json(settings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/', auth, async (req, res) => {
  try {
    const body = req.body || {};
    const allowed = Object.keys(body).filter((k) => typeof k === 'string');
    for (const key of allowed) {
      const colName = key.replace(/[^a-zA-Z0-9_]/g, '_');
      if (!colName) continue;
      await pool.query(
        `INSERT INTO site_settings (setting_key, setting_value) VALUES ($1, $2)
         ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value, updated_at = CURRENT_TIMESTAMP`,
        [colName, JSON.stringify(body[key])]
      );
    }
    const result = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settings = {};
    result.rows.forEach((r) => { settings[r.setting_key] = r.setting_value; });
    res.json(settings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
