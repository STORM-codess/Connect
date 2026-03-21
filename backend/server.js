require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');

const app = express();

// ── CORS — allow frontend on localhost:5173 to talk to backend ──
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

// ── Body parsers ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Request logger ──
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ──
app.use('/api/auth', require('./routes/authRoutes'));

// ── Health check ──
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎓 Connect — College Club Platform API is running!',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/auth/register',
      login:    'POST /api/auth/login',
      profile:  'GET  /api/auth/me',
    },
  });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong on the server.' });
});

// ── Start ──
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Test the API at: http://localhost:${PORT}/\n`);
  });
};

startServer();
