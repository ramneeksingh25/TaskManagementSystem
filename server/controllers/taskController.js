const db = require('../models'); // Sequelize Task and User models
const User = db.users
const Task = db.tasks

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { name, description, dueDate, priority, assigneeId } = req.body;
    const creatorId = req.user.id; // assuming JWT auth middleware adds this

    // Ensure the assignee exists
    const assignee = await User.findByPk(assigneeId);
    if (!assignee) {
      return res.status(404).json({ message: 'Assignee not found' });
    }

    // Create task
    const newTask = await Task.create({
      name,
      description,
      dueDate,
      priority,
      status: 'To Do', // default status
      creatorId,
      assigneeId
    });

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks for the logged-in user
exports.getTasksForUser = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT auth middleware adds this

    const tasks = await Task.findAll({
      where: { assigneeId: userId },
      include: [{ model: User, as: 'creator', attributes: ['name', 'email'] }] // include creator info
    });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Get task details by task ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId, {
      include: [
        { model: User, as: 'creator', attributes: ['name', 'email'] },
        { model: User, as: 'assignee', attributes: ['name', 'email'] }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task details', error });
  }
};

// Update a task (status, priority, due date)
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status, priority, dueDate } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task details
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

// Get all tasks (admin-only)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: 'creator', attributes: ['name', 'email'] },
        { model: User, as: 'assignee', attributes: ['name', 'email'] }
      ]
    });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};
