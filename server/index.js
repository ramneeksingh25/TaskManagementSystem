const express = require('express')
const app = express()
const port = 2000
const cors = require('cors')

app.use(cors())

app.use(express.json());

app.get("/",(req, res) => {
  res.send({message:"Hello world"})
})
app.get('/ping', (req, res) => {
  res.send('Pong!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})