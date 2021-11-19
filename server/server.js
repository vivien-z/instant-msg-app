const express = require('express')
const path = require('path') //(router)
const app = express()

const http = require('http')
const { Server }= require("socket.io")
const server = http.createServer(app)
// const cors = require('cors')
// const netlifyLink = "https://instant-msg-page.netlify.app/"

const PORT = process.env.PORT || 8080

const io = new Server(server, {
  cors: {
    origin: "https://instant-msg-page.netlify.app/",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["instant-msg-page"],
    credentials: true
  }
});

app.use(express.static(path.join(__dirname, 'build')))
// // app.use(cors())
// app.use(cors({
//     origin: [netlifyLink, "http://localhost:3000"],
//     methods: ["GET", "POST", "PUT"],
// }))

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  res.send('Server is up and running')
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


// const io = require('socket.io')(5000, {

//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT"],
//     credentials: true
//   }
// })

// io.on('connection', socket => {
//   // const id = socket.handshake.query.myId
//   // socket.join(id)

//   // socket.on('create-new-chatroom', ({ roomUserIds }) => {
//   //   socket.broadcast.emit('match-new-chatroom', { roomUserIds })
//   // })

// })

