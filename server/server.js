
const io = require('socket.io')(5000, {

  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true
  }
})

io.on('connection', socket => {
  // const id = socket.handshake.query.myId
  // socket.join(id)

  socket.on('send-message', ({ selectedChatroom, sender, msgText, roomUsers }) => {

    socket.broadcast.emit('receive-message', {
      selectedChatroom, sender, msgText
    })

    // roomUsers.forEach(roomUser => {
    //   const recipients = roomUsers.filter(user => user !== roomUser)
    //   roomUsers = recipients
    //   roomUsers.push(id)
    //   socket.broadcast.to(roomUser).emit('receive-message', {
    //     selectedChatroom: selectedChatroom, sender: sender, msgText
    //   })
    // })
  })
})
