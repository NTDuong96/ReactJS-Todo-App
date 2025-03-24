const Todo = require('../models/Todo');

// Lấy tất cả todos của người dùng
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi server');
  }
};

// Lấy một todo theo id
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Không tìm thấy todo' });
    }

    // Kiểm tra người dùng có quyền với todo này
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Không có quyền truy cập' });
    }

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy todo' });
    }
    res.status(500).send('Lỗi server');
  }
};

// Tạo todo mới
exports.createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodo = new Todo({
      title,
      description,
      user: req.user.id
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi server');
  }
};

// Cập nhật todo
exports.updateTodo = async (req, res) => {
  const { title, description, status } = req.body;

  // Tạo object todoFields
  const todoFields = {};
  if (title) todoFields.title = title;
  if (description) todoFields.description = description;
  if (status) todoFields.status = status;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Không tìm thấy todo' });
    }

    // Kiểm tra người dùng có quyền với todo này
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Không có quyền truy cập' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: todoFields },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi server');
  }
};

// Xóa todo
exports.deleteTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Không tìm thấy todo' });
    }

    // Kiểm tra người dùng có quyền với todo này
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Không có quyền truy cập' });
    }

    await Todo.findByIdAndRemove(req.params.id);

    res.json({ message: 'Todo đã được xóa' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi server');
  }
};