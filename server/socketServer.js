const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

    // Emit the list of participants to the joined participant
    socket.emit('participants', activeMeetings[meetingId].participants);

    // Broadcast the list of participants to all participants in the meeting
    io.to(meetingId).emit(
      'participants',
      activeMeetings[meetingId].participants,
    );
    socket.to(meetingId).emit('userJoined', socket.id);
  });

  socket.on('offer', (offerDescription, senderId, meetingId) => {
    // Broadcast the offer to all participants in the meeting except the sender
    socket.to(meetingId).emit('offer', offerDescription, senderId);
  });

  socket.on('answer', (answerDescription, senderId, meetingId) => {
    // Broadcast the answer to the specific participant who sent the offer
    socket.to(senderId).emit('answer', answerDescription, socket.id);
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

        // Broadcast the updated list of participants to all participants in the meeting
        io.to(room).emit('participants', activeMeetings[room].participants);
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Socket server listening on port 3000');
});
