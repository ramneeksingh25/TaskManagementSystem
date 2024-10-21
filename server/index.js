const express = require('express')
const app = express()
const port = 2000
const cors = require('cors')
const userRouter = require('./routes/userRouter.js');
const taskRouter = require('./routes/taskRouter.js');
const dotenv = require('dotenv');

app.use(cors())
dotenv.config();

console.log(process.env.JWT_SECRET);


app.use(express.json());

app.get("/",(req, res) => {
  res.send({message:"Hello world"})
})
app.get('/ping', (req, res) => {
  res.send('Pong!')
})

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})




