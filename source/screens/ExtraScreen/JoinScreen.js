import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';
import firestore from '@react-native-firebase/firestore';

const JoinScreen = ({route}) => {
  const [localStream, setLocalStream] = useState(null);
  const [participants, setParticipants] = useState([]);
  const {meetingId} = route.params;

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

        const pc = new RTCPeerConnection(configuration);
        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });

        pc.onicecandidate = event => handleIceCandidate(event, pc);

        pc.ontrack = event => handleTrack(event, pc);

        const participantsSnapshot = await firestore()
          .collection('meetings')
          .doc(meetingId)
          .collection('participants')
          .get();
        const participantsData = participantsSnapshot.docs.map(doc => ({
          id: doc.id,
          stream: new MediaStream(),
        }));
        setParticipants(participantsData);

        // Add current participant to Firestore
        const participantRef = firestore()
          .collection('meetings')
          .doc(meetingId)
          .collection('participants')
          .doc(pc.localDescription.sdpMid);
        await participantRef.set({id: pc.localDescription.sdpMid});

        // Listen for changes in participants
        firestore()
          .collection('meetings')
          .doc(meetingId)
          .collection('participants')
          .onSnapshot(snapshot => {
            const updatedParticipants = snapshot.docs.map(doc => ({
              id: doc.id,
              stream: new MediaStream(),
            }));
            setParticipants(updatedParticipants);
          });
      } catch (error) {
        console.log('Error setting up WebRTC:', error);
      }
    };

    setupWebRTC();

    return () => {
      // Clean up resources when the component unmounts
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
        await firestore()
          .collection('meetings')
          .doc(meetingId)
          .collection('participants')
          .doc(pc.localDescription.sdpMid)
          .update({
            iceCandidates: firestore.FieldValue.arrayUnion(candidate),
          });
      } catch (error) {
        console.log('Error handling ICE candidate:', error);
      }
    }
  };

  const handleTrack = (event, pc) => {
    const stream = event.streams[0];
    const participantId = pc.localDescription.sdpMid;
    const updatedParticipants = participants.map(participant =>
      participant.id === participantId ? {...participant, stream} : participant,
    );
    setParticipants(updatedParticipants);
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
      {participants.map(participant => (
        <RTCView
          key={participant.id}
          streamURL={participant.stream.toURL()}
          style={{width: 300, height: 200}}
        />
      ))}
    </View>
  );
};

export default JoinScreen;
