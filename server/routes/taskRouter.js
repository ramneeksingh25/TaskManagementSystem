const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');
const auth = require('../middlewares/authMiddleware.js');
const authenticateJWT = auth.authenticateJWT;
const authorizeAdmin=auth.authorizeAdmin;

router.post('/create', authenticateJWT, taskController.createTask);

router.get('/my-tasks', authenticateJWT, taskController.getTasksForUser);

router.get('/:id', authenticateJWT, taskController.getTaskById);

router.put('/:id', authenticateJWT, taskController.updateTask);

router.delete('/:id', authenticateJWT, taskController.deleteTask);

router.get('/admin/all-tasks', authenticateJWT, authorizeAdmin, taskController.getAllTasks);

module.exports = router;