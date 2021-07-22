const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server }= require("socket.io")
// const io = new Server(server, {
//   allowRequest: (req, callback) => {
//     const noOriginHeader = req.headers.origin === undefined;
//     callback(null, noOriginHeader);
//   }
// })

const cors = require('cors')

const PORT = process.env.PORT || 8080
// const router = require('./router')
const path = require('path') //(router)

// cors setting
const io = new Server(server, {
  cors: {
    origin: "https://60f9beea5eca372f0d813e4e--instant-msg-page.netlify.app/" || "http://localhost:3000" ,
    methods: ["GET", "POST", "PUT"],
    credentials: true
  }
});


app.use(express.static(path.join(__dirname, '../../build'))) //(router)
// app.use(router)
app.use(cors())

//(router)
app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html')
  res.send('Server is up and running')
});


io.on('connection', (socket) => {
  console.log('We have a new connection.')

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

//   socket.on('send-message', ({ selectedChatroom, sender, msgText, roomUsers }) => {
//     socket.broadcast.emit('receive-message', {selectedChatroom, sender, msgText})
//   })

//   // socket.on('create-new-chatroom', ({ roomUserIds }) => {
//   //   socket.broadcast.emit('match-new-chatroom', { roomUserIds })
//   // })

// })

