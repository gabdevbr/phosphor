const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const applicationsRouter = require('./routes/applications');
const settingsRouter = require('./routes/settings');
const jsonStore = require('./database/jsonStore');

const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(express.json());

// Middleware para servir uploads com Content-Type correto
app.use('/uploads', (req, res, next) => {
  if (path.extname(req.path) === '.svg') {
    res.setHeader('Content-Type', 'image/svg+xml');
  }
  next();
}, express.static(path.join(__dirname, '../uploads')));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use('/api/applications', applicationsRouter);
app.use('/api/settings', settingsRouter);

// Catch-all handler: serve index.html para rotas do React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  try {
    await jsonStore.initialize();
    app.listen(PORT, () => {
      console.log(`🚀 Phosphor backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();