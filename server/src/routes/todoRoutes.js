const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodo } = require('../middleware/validators');
const auth = require('../middleware/auth');

// Apply auth middleware to all todo routes
router.use(auth);

// Get all todos
router.get('/', todoController.getAllTodos);

// Create a new todo
router.post('/', validateTodo, todoController.createTodo);

// Update a todo
router.put('/:id', validateTodo, todoController.updateTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;