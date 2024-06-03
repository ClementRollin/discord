const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Un utilisateur a rejoint la salle: ${room}`);
  });

  socket.on('message', (data) => {
    io.to(data.room).emit('message', data.msg);
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });
});

server.listen(3000, () => {
  console.log('Serveur écoute sur le port 3000');
});