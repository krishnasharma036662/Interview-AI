const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
async function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }
  const istokenblacklisted = await blacklistModel.findOne({ token });
  if (istokenblacklisted) {
    return res.status(401).json({ msg: 'Token is blacklisted' });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = { auth };