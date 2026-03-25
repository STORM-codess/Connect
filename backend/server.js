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
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Security & Production Middlewares ──
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(morgan('dev')); // Request logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// ── Request logger ──
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ──
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clubs', require('./routes/clubRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/events', require('./routes/registrationRoutes')); 
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

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
