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
