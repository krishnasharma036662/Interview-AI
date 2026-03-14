const router = require('express').Router();
const register = require('../controllers/auth.controller');
const { auth } = require('../middlewares/auth.middleware');

router.post('/register', register.register);
router.post('/login', register.login);
router.post('/logout', register.logout);
router.get('/me', auth, register.getCurrentUser);
module.exports = router;