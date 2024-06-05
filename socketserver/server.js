// server/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

// Apply CORS middleware
app.use(cors({
  origin: '*', // Adjust this to your client's URL in production for better security
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this to your client's URL in production
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('clientMessage', (message) => {
    console.log('Received message from client:', message);
    // Broadcast the message to other clients
    socket.broadcast.emit('serverMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
