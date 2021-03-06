const express = require('express')
const path = require('path') //(router)
const cors = require('cors')
const app = express()

const http = require('http')
const { Server }= require("socket.io")
const server = http.createServer(app)

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  res.send('Server is up and running')
});

const io = new Server(server, {
  cors: {
    origin: "https://instant-msg-page.netlify.app",
    methods: ["GET", "POST", "HEAD", "OPTIONS"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('We have a new connection.')

  socket.on('add-new-user', ({id, username}) => {
    socket.broadcast.emit('new-user-created', ({id, username}))
    console.log('new-user-created')
  })

  socket.on('send-message', ({ selectedChatroom, sender, msgText, roomUsers }) => {
    socket.broadcast.emit('receive-message', {selectedChatroom, sender, msgText})
  })

  socket.on('disconnect', () => {
    console.log('A user had left.')
  })
})

server.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))
