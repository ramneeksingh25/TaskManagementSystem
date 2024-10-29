const db = require('../models');
const User = db.User;
const Task = db.Task;


exports.createTask = async (req, res, io) => {
  try {
    const { name, description, dueDate, priority, assigneeIds } = req.body;
    const creatorId = req.user.id; 
    const isMultiUser = assigneeIds && assigneeIds.length > 1;

    const assignees = await User.findAll({ where: { id: assigneeIds } });
    console.log("Assignees IDS:",assigneeIds);
    console.log("Assignees:",assignees);
    
    if (assignees.length !== assigneeIds.length) {
      return res.status(404).json({ message: 'One or more assignees not found' });
    }

    const newTask = await Task.create({
      name,
      description,
      dueDate,
      priority,
      status: 'To Do',
      creatorId,
      isMultiUser,
    });

    await newTask.setAssignees(assignees); 
    
    io.emit('taskUpdate');

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error("Error creating task:", error); // Log the error
    res.status(500).json({ message: 'Error creating task', error });
  }
};

exports.getTasksAssignedByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({
      where: {
        creatorId: userId
      },
      include: [
        { model: User, as: 'creator', attributes: ['name', 'email'] },
        { model: User, as: 'assignees', attributes: ['name', 'email'] }
      ]
    });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks assigned by user:", error);
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

exports.getTasksAssignedToUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({
      where: {
        '$assignees.id$': userId
      },
      include: [
        { model: User, as: 'creator', attributes: ['name', 'email'] },
        { model: User, as: 'assignees', attributes: ['name', 'email'] }
      ]
    });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks assigned to user:", error);
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({
      where: {
        id: taskId,
        [db.Sequelize.Op.or]: [
          { creatorId: userId },
          { '$assignees.id$': userId }
        ]
      },
      include: [
        { model: User, as: 'creator', attributes: ['name', 'email'] },
        { model: User, as: 'assignees', attributes: ['name', 'email'] }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error("Error fetching task:", error); 
    res.status(500).json({ message: 'Error fetching task details', error });
  }
};

// Update task
exports.updateTask = async (req, res, io) => {
  try {
    const taskId = req.params.id;
    const { status, priority, dueDate, assignees, isMultiUser } = req.body;
    
    console.log(req.body);

    const task = await Task.findOne({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    // Update task properties
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.isMultiUser = isMultiUser || task.isMultiUser;

    console.log("TASK STATUS: " + task);

    await task.save();

    if (assignees && assignees.length > 0) {
      const assigneeIds = assignees.map(assignee => assignee.id);
      
      const assigneesFromDB = await User.findAll({ where: { id: assigneeIds } });
      
      await task.setAssignees(assigneesFromDB);
    }

    console.log("UPDATED TASK", task);

    io.emit('taskUpdate', { taskId, task });

    res.status(200).json({ message: 'Task updated successfully', task });

  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: 'Error updating task',error });
  }
};

exports.deleteTask = async (req, res,io) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({
      where: {
        id: taskId,
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    await task.destroy();
    io.emit('taskUpdate');

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: 'creator', attributes: ['name', 'email'] },
        { model: User, as: 'assignees', attributes: ['name', 'email'] } 
      ]
    });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log the error
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};