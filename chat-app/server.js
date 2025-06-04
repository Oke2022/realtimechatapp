const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // 🟢 define `io` before using it

app.use(express.static(path.join(__dirname, 'public')));

// ✅ Now safely use `io` after it's defined
io.on('connection', socket => {
  console.log('A user connected');

  // Save username per socket
  socket.on('set username', username => {
    socket.username = username;
  });

  socket.on('chat message', msg => {
    const messageData = {
      msg,
      username: socket.username || 'Anonymous',
      id: socket.id,
      timestamp: new Date().toLocaleTimeString()
    };
    io.emit('chat message', messageData);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
