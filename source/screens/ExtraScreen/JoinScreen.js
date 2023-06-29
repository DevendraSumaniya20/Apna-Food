import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';
import firestore from '@react-native-firebase/firestore';
import io from 'socket.io-client';

const JoinScreen = ({route}) => {
  const [localStream, setLocalStream] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [peerConnections, setPeerConnections] = useState([]);
  const {meetingId, isHost} = route.params;
  const socket = io('http://localhost:8080');

  useEffect(() => {
    const setupWebRTC = async () => {
      try {
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setLocalStream(stream);

        const configuration = {
          iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
        };

        const participantsSnapshot = await firestore()
          .collection('meetings')
          .doc(meetingId)
          .collection('participants')
          .get();
        const participantsData = participantsSnapshot.docs.map(doc => ({
          id: doc.id,
          stream: new MediaStream(),
        }));

        const pcs = participantsData.map(participant => {
          const pc = new RTCPeerConnection(configuration);
          stream.getTracks().forEach(track => {
            pc.addTrack(track, stream);
          });

          pc.onicecandidate = event => handleIceCandidate(event, pc);
          pc.ontrack = event => handleTrack(event, participant.id);

          return {participantId: participant.id, pc};
        });

        setParticipants(participantsData);
        setPeerConnections(pcs);
      } catch (error) {
        console.log('Error setting up WebRTC:', error);
      }
    };

    setupWebRTC();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [meetingId]);

  const handleIceCandidate = async (event, pc) => {
    if (event.candidate) {
      try {
        const candidate = event.candidate.toJSON();

        firestore()
          .collection('meetings')
          .doc(meetingId)
          .collection('participants')
          .where('id', '!=', socket.id)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              const participantId = doc.id;
              socket.emit('candidate', {meetingId, participantId, candidate});
            });
          });
      } catch (error) {
        console.log('Error handling ICE candidate:', error);
      }
    }
  };

  const handleTrack = (event, participantId) => {
    const stream = event.streams[0];

    const updatedParticipants = participants.map(participant =>
      participant.id === participantId ? {...participant, stream} : participant,
    );
    setParticipants(updatedParticipants);
  };

  const renderParticipantStreams = () => {
    return participants.map(participant => (
      <RTCView
        key={participant.id}
        streamURL={participant.stream.toURL()}
        style={{width: 300, height: 200}}
      />
    ));
  };

  return (
    <View>
      <Text>Join Screen</Text>
      <Text>Meeting ID: {meetingId}</Text>

      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={{width: 300, height: 200}}
        />
      )}
      {renderParticipantStreams()}
    </View>
  );
};

export default JoinScreen;
