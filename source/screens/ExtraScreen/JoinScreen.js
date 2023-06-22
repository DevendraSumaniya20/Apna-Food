import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';
import firestore from '@react-native-firebase/firestore';

const JoinScreen = ({route}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
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

        pc.onicecandidate = event => handleIceCandidate(event, meetingId);

        pc.ontrack = event => handleTrack(event, meetingId);

        const remoteStreamsCopy = {...remoteStreams};
        remoteStreamsCopy[meetingId] = stream;
        setRemoteStreams(remoteStreamsCopy);
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
      if (remoteStreams[meetingId]) {
        remoteStreams[meetingId].getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [meetingId]);

  const handleIceCandidate = async (event, participantId) => {
    if (event.candidate) {
      try {
        const candidate = event.candidate.toJSON();
        await firestore()
          .collection('meetings')
          .doc(meetingId)
          .collection('participants')
          .doc(participantId)
          .update({
            iceCandidates: firestore.FieldValue.arrayUnion(candidate),
          });
      } catch (error) {
        console.log('Error handling ICE candidate:', error);
      }
    }
  };

  const handleTrack = (event, participantId) => {
    const stream = event.streams[0];
    const remoteStreamsCopy = {...remoteStreams};
    remoteStreamsCopy[participantId] = stream;
    setRemoteStreams(remoteStreamsCopy);
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
      {Object.entries(remoteStreams).map(([participantId, stream]) => (
        <RTCView
          key={participantId}
          streamURL={stream.toURL()}
          style={{width: 300, height: 200}}
        />
      ))}
    </View>
  );
};

export default JoinScreen;
