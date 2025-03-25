const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../middleware/validators');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', validateRegister, userController.register);

// Login user
router.post('/login', validateLogin, userController.login);

// Get current user
router.get('/me', auth, userController.getCurrentUser);

module.exports = router;