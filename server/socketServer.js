const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server);

const activeMeetings = {};

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('join', meetingId => {
    socket.join(meetingId);

    // Add meeting to active meetings
    if (!activeMeetings[meetingId]) {
      activeMeetings[meetingId] = {
        participants: [],
      };
    }

    // Add participant to active meeting
    activeMeetings[meetingId].participants.push(socket.id);

    socket.emit('participants', activeMeetings[meetingId].participants);
    socket.to(meetingId).emit('userJoined', socket.id);
  });

  socket.on('offer', (offerDescription, senderId, meetingId) => {
    socket.to(meetingId).emit('offer', offerDescription, senderId);
  });

  socket.on('answer', (answerDescription, senderId, meetingId) => {
    socket.to(meetingId).emit('answer', answerDescription, senderId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');

    const rooms = Object.keys(socket.rooms);
    rooms.forEach(room => {
      socket.to(room).emit('userLeft', socket.id);

      // Remove participant from active meeting
      if (activeMeetings[room]) {
        activeMeetings[room].participants = activeMeetings[
          room
        ].participants.filter(participantId => participantId !== socket.id);
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Socket server listening on port 3000');
});
