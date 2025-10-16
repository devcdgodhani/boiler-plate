/*
Example socket.io client (Node or browser) to test the server:

Node example:
  npm install socket.io-client
  node client-example.js
*/
const { io } = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected:', socket.id);
  socket.emit('ping', 'Hello server');
  socket.emit('joinRoom', 'room1');
});

socket.on('pong', (data) => {
  console.log('Received pong:', data);
});

socket.on('system', (data) => {
  console.log('System message:', data);
});
