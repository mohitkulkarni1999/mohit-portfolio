const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : true,
}));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/education', require('./routes/education'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/services', require('./routes/services'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/tools', require('./routes/tools'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/settings', require('./routes/settings'));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

