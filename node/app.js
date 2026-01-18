const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const eligibilityRoutes = require('./routes/eligibilityRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Parsers
app.use(bodyParser.json());
app.use(cookieParser());

// CSRF
app.use(csurf({
  cookie: {
    httpOnly: true,
    sameSite: 'Lax',
  }
}));

app.get('/api/user/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/eligibilities', eligibilityRoutes);
app.use('/api/admin', adminRoutes);

// CSRF error handler
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next(err);
});

module.exports = app;
