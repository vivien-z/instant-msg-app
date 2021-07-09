const io = require('socket.io')(5000)

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ chatroom, msgText }) => {
    // const recipients = roomUsers.filter(user => user.id === sender.id)
    socket.broadcast.emit('receive-message', { chatroom, msgText })

    roomUsers.forEach(roomUser => {
      const recipients = roomUsers.filter(user => user !== roomUser)
      recipients.push(id)
      socket.broadcast.to(roomUser).emit('receive-message', {
        recipients: recipients, sender: id, msgText
      })
    })
  })
})
