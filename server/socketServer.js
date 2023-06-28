const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const admin = require('firebase-admin');
const serviceAccount = require('./apna-food-c8049-firebase-adminsdk-gp9po-70363e3d4c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://apna-food-c8049-default-rtdb.firebaseio.com', // Replace with your own Firebase Realtime Database URL
});

const participants = {};

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

io.on('connection', socket => {
  console.log('A user connected');

  // Handle joinCall event
  socket.on('joinCall', meetingID => {
    console.log(`User joined call with meeting ID: ${meetingID}`);
    socket.join(meetingID);

    if (!participants[meetingID]) {
      participants[meetingID] = [];
    }

    participants[meetingID].push(socket.id);

    io.to(meetingID).emit('participants', participants[meetingID]);
  });

  // Handle offer event
  socket.on('offer', ({meetingID, participantID, description}) => {
    console.log(
      `Received offer from participant ${participantID} in call ${meetingID}`,
    );
    socket.to(meetingID).emit('offer', {meetingID, participantID, description});
  });

  // Handle answer event
  socket.on('answer', ({meetingID, participantID, description}) => {
    console.log(
      `Received answer from participant ${participantID} in call ${meetingID}`,
    );
    socket
      .to(meetingID)
      .emit('answer', {meetingID, participantID, description});
  });

  // Handle candidate event
  socket.on('candidate', ({meetingID, participantID, candidate}) => {
    console.log(
      `Received ICE candidate from participant ${participantID} in call ${meetingID}`,
    );
    socket
      .to(meetingID)
      .emit('candidate', {meetingID, participantID, candidate});
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');

    // Remove the disconnected participant from the participants list
    for (const meetingID in participants) {
      const index = participants[meetingID].indexOf(socket.id);
      if (index !== -1) {
        participants[meetingID].splice(index, 1);
        io.to(meetingID).emit('participants', participants[meetingID]);
        break;
      }
    }
  });
});

http.listen(8080, () => {
  console.log('http://localhost:8080');
});
