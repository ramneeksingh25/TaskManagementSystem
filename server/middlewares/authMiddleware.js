const jwt = require("jsonwebtoken");
const db = require("../models"); // Sequelize User model
const dotenv = require("dotenv");
const User = db.User;

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined in the environment variables");
}
exports.authorizeAdmin = async (req, res, next) => {
	try {
		const user = req.user; 
		console.log("USER AUTHORIZE ADMIN: " + JSON.stringify(user));
		
		if (user.role !== 'admin') {
			return res.status(403).json({ message: 'Access forbidden: admins only' });
		}

		next();
	} catch (error) {
		console.error("Authorization error:", error);
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
};
exports.authenticateJWT = async (req, res, next) => {	
	const token = req.headers["authorization"]?.startsWith('Bearer ')?req.headers['authorization']?.split(" ")[1]:req.headers['authorization'];
	if (!token) {
		return res.status(403).json({ message: "No token provided"});
	}
	try {		
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findByPk(decoded.id);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized token - user not found" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log("JWT verification error:", error); 
		return res.status(401).json({ message: "Unauthorized", error: error.message });
	}
};
