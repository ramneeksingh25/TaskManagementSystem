const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');
const { authenticateJWT } = require('../middlewares/authMiddleware.js'); // JWT middleware for protected routes

// Route to create a new task (authenticated users only)
router.post('/create', authenticateJWT, taskController.createTask);

// Route to get all tasks for the logged-in user (authenticated users only)
router.get('/my-tasks', authenticateJWT, taskController.getTasksForUser);

// Route to get task details by task ID (authenticated users only)
router.get('/:id', authenticateJWT, taskController.getTaskById);

// Route to update a task (authenticated users only)
router.put('/:id', authenticateJWT, taskController.updateTask);

// Route to delete a task (authenticated users only)
router.delete('/:id', authenticateJWT, taskController.deleteTask);

// Route to get all tasks (admin only)
router.get('/admin/all-tasks', authenticateJWT, taskController.getAllTasks);

module.exports = router;