const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/home', authController.home);
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route example
router.get('/protected-route', authMiddleware, (req, res) => {
  // Your logic for the protected route
  res.json({message: 'This is a protected route.'});
});

module.exports = router;
