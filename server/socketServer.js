const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const firebase = require('firebase/app');

const firebaseConfig = {
  apiKey: 'AIzaSyAXhdAy3iEt_HdNAW4RnYa3DN_1E7Ki-lI',
  authDomain: 'apna-food-c8049.firebaseapp.com',
  projectId: 'apna-food-c8049',
  storageBucket: 'apna-food-c8049.appspot.com',
  messagingSenderId: '80890309219',
  appId: '1:80890309219:web:5f80ac9abf90d4e6b26656',
  measurementId: 'G-2HZPMWP96H',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

io.on('connection', socket => {
  socket.on('joinCall', meetingID => {
    socket.join(meetingID);
  });

  socket.on('offer', async (meetingID, offer) => {
    await saveMessageToFirestore(meetingID, 'offer', offer);
    io.to(meetingID).emit('offer', offer);
  });

  socket.on('answer', async (meetingID, answer) => {
    await saveMessageToFirestore(meetingID, 'answer', answer);
    io.to(meetingID).emit('answer', answer);
  });

  socket.on('candidate', async (meetingID, candidate) => {
    await saveMessageToFirestore(meetingID, 'candidate', candidate);
    io.to(meetingID).emit('candidate', candidate);
  });

  socket.on('disconnect', () => {});
});

async function saveMessageToFirestore(meetingID, type, message) {
  try {
    await db.collection('messages').doc(meetingID).collection('messages').add({
      type,
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving message to Firestore:', error);
  }
}

const port = 8080;

http.listen(port, () => {
  console.log(`Signaling server is running on http://localhost:${port}`);
});
