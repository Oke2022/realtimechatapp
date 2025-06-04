io.on('connection', socket => {
  console.log('A user connected');

  socket.on('chat message', msg => {
    io.emit('chat message', { msg, id: socket.id }); // send both message and sender's id
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
