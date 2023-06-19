const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  socket.on('join', meetingID => {
    socket.join(meetingID); // Join the specific room (meetingID) provided by the client
  });

  socket.on('offer', (meetingID, offer) => {
    socket.to(meetingID).emit('offer', offer); // Relay the offer to other participants in the room
  });

  socket.on('answer', (meetingID, answer) => {
    socket.to(meetingID).emit('answer', answer); // Relay the answer to other participants in the room
  });

  socket.on('candidate', (meetingID, candidate) => {
    socket.to(meetingID).emit('candidate', candidate); // Relay the candidate to other participants in the room
  });

  socket.on('disconnect', () => {
    // Clean up any resources or notify other participants about disconnections
  });
});

const port = 8080;
http.listen(port, () => {
  console.log(`Signaling server is running on http://localhost:${port}`);
});
