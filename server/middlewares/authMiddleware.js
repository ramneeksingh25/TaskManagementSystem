const jwt = require('jsonwebtoken');
const db = require('../models'); // Sequelize User model
const dotenv = require('dotenv');
const User = db.users;

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

exports.authenticateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized',error });
  }
};