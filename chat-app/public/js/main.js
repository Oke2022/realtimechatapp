const socket = io();

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit('chatMessage', msg);
  e.target.elements.msg.value = '';
});

socket.on('chatMessage', (msg) => {
  const chatBox = document.getElementById('chat-box');
  const message = document.createElement('div');
  message.innerText = msg;
  chatBox.appendChild(message);
});
