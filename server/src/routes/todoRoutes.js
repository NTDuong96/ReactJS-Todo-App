const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middleware/auth');

// Bảo vệ tất cả các routes với middleware auth
router.use(auth);

// @route   GET api/todos
// @desc    Lấy tất cả todos
// @access  Private
router.get('/', todoController.getTodos);

// @route   GET api/todos/:id
// @desc    Lấy một todo theo id
// @access  Private
router.get('/:id', todoController.getTodoById);

// @route   POST api/todos
// @desc    Tạo todo mới
// @access  Private
router.post('/', todoController.createTodo);

// @route   PUT api/todos/:id
// @desc    Cập nhật todo
// @access  Private
router.put('/:id', todoController.updateTodo);

// @route   DELETE api/todos/:id
// @desc    Xóa todo
// @access  Private
router.delete('/:id', todoController.deleteTodo);

module.exports = router;