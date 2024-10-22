const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models'); // Sequelize User model

const User = db.User;
const dotenv = require("dotenv")

dotenv.config();

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

console.log("JWT:"+JWT_SECRET);


// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role||'user'
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN Attempt:", { email }); // Log the email for debugging
    
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("Invalid password");
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log("JWTJWTJWT:",JWT_SECRET);
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    console.log("Generated Token:", token); // Log the generated token for debugging

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Error logging in:", error); // Log the error
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get all users (for task assignment)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.status(200).json({ users });
    console.log("found");
    
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get the logged-in user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT auth middleware adds this
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email']
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};
