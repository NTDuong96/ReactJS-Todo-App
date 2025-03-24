const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   POST api/users/register
// @desc    Đăng ký người dùng
// @access  Public
router.post('/register', userController.register);

// @route   POST api/users/login
// @desc    Đăng nhập & lấy token
// @access  Public
router.post('/login', userController.login);

// @route   GET api/users/me
// @desc    Lấy thông tin người dùng hiện tại
// @access  Private
router.get('/me', auth, userController.getUserProfile);

module.exports = router;