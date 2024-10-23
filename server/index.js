const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const userRouter = require("./routes/userRouter.js");
const taskRouter = require("./routes/taskRouter.js");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"], 
		credentials: true, 
	},
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send({ message: "Hello world" });
});

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter(io));

io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);
	socket.on("disconnect", () => {
		console.log("A user disconnected:", socket.id);
	});
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
