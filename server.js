const express = require('express')
const path = require('path') //(router)
const cors = require('cors')
const app = express()

const http = require('http')
const { Server }= require("socket.io")
const server = http.createServer(app)

const PORT = process.env.PORT || 8080

const io = new Server(server)
// , {
//   // cors: {
//   //   origin: 'https://instant-msg-page.netlify.app/',
//   //   // origin: [netlifyLink, "http://localhost:3000"],
//   //   methods: ["GET", "POST", "HEAD", "OPTIONS"],
//   //   allowedHeaders: ["instant-msg-page", "Origin"],
//   //   credentials: true
//   // }
// });

const whiteList = ['https://instant-msg-page.netlify.app/', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors({
//     origin: 'https://instant-msg-page.netlify.app/',
//     methods: ["GET", "POST", "HEAD", "OPTIONS"],
//     // allowedHeaders: ["instant-msg-page", "Origin"],
//     credentials: true
// }))
app.options('*', cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', cors(corsOptions), (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  res.send('CORS-enabled for a whitelisted domain')
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
