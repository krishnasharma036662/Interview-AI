const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

app.use(express.json());
/* require all the routes here */
const authRoutes = require('./routes/auth.routes');
const interviewRoutes = require('./routes/interview.routes');
/* use the routes here */
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
module.exports = app;