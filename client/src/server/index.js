// const path = require('path');

// const express = require('express');
// const app = express();
// const http = require('http')
// const server = http.createServer(app);
// const { Server } = require("socket.io")
// const io = new Server(server, {
//     cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT"],
//     credentials: true
//   }
// });


// app.use(express.static(path.join(__dirname, '../../build')));

// app.get('/', (req, res, next) => {
//   res.sendFile(__dirname + '/index.html')
// });


// io.on('connection', (socket) => {
//   // const id = socket.handshake.query.myId
//   // socket.join(id)
//   socket.emit('hello', { message: 'hello from server!' })
//   socket.on('send-message', ({ selectedChatroom, sender, msgText, roomUsers }) => {
//     socket.broadcast.emit('receive-message', {selectedChatroom, sender, msgText})
//   })
//   // socket.on('create-new-chatroom', ({ roomUserIds }) => {
//   //   socket.broadcast.emit('match-new-chatroom', { roomUserIds })
//   // })
// })
// const port = process.env.PORT || 8080;

// server.listen(port, () => {
//   console.log('listening on *:8080')
// });



// // const io = require('socket.io')(5000, {

// //   cors: {
// //     origin: "http://localhost:3000",
// //     methods: ["GET", "POST", "PUT"],
// //     credentials: true
// //   }
// // })

