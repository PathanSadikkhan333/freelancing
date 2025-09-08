import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)
  socket.on('join', (room) => socket.join(room))
  socket.on('message', (msg) => {
    // msg: { room, from, to, text }
    io.to(msg.room).emit('message', { ...msg, createdAt: new Date() })
  })
})

httpServer.listen(4000, ()=> console.log('Socket server running on 4000'))