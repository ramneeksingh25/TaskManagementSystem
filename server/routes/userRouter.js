const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { authenticateJWT } = require('../middlewares/authMiddleware.js'); // JWT middleware for protected routes

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/users', authenticateJWT, userController.getAllUsers);

router.get('/profile', authenticateJWT, userController.getUserProfile);

module.exports = router;