const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController.js");
const auth = require("../middlewares/authMiddleware.js");
const authenticateJWT = auth.authenticateJWT;
const authorizeAdmin = auth.authorizeAdmin;

module.exports = (io) => {
	router.post("/create", authenticateJWT, (req, res) =>
		taskController.createTask(req, res, io)
	);

	router.get(
		"/my-tasks",
		authenticateJWT,
		taskController.getTasksAssignedToUser
	);

	router.get(
		"/assigned-tasks",
		authenticateJWT,
		taskController.getTasksAssignedByUser
	);

	router.get("/:id", authenticateJWT, taskController.getTaskById);

	router.put("/:id", authenticateJWT, (req, res) =>
		taskController.updateTask(req, res, io)
	);

	router.delete("/:id", authenticateJWT, (req, res) =>
		taskController.deleteTask(req, res, io)
	);

	router.get(
		"/admin/all-tasks",
		authenticateJWT,
		authorizeAdmin,
		taskController.getAllTasks
	);
	return router;
};
