import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';
import firestore from '@react-native-firebase/firestore';

const JoinScreen = ({route}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [peerConnections, setPeerConnections] = useState({});
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
        setPeerConnections({[meetingId]: pc}); // Store the peer connection for the local user

        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });

        pc.onicecandidate = handleIceCandidate;
        pc.ontrack = handleTrack;

        if (meetingId) {
          joinMeeting();
        }
      } catch (error) {
        console.log('Error setting up WebRTC:', error);
      }
    };

    setupWebRTC();

    return () => {
      // Close all peer connections when component unmounts
      Object.values(peerConnections).forEach(pc => pc.close());
    };
  }, [meetingId]);

  useEffect(() => {
    const handleSnapshot = async snapshot => {
      const data = snapshot.data();
      if (data && data.offer) {
        try {
          const pc = new RTCPeerConnection(
            peerConnections[meetingId].getConfiguration(),
          );
          pc.onicecandidate = handleIceCandidate;
          pc.ontrack = handleTrack;

          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          await snapshot.ref.update({answer: pc.localDescription});

          setPeerConnections(prevPeerConnections => ({
            ...prevPeerConnections,
            [snapshot.id]: pc, // Store the peer connection for the new participant
          }));
        } catch (error) {
          console.log('Error handling offer:', error);
        }
      }
      if (data && data.iceCandidates) {
        data.iceCandidates.forEach(async candidate => {
          try {
            await peerConnections[snapshot.id].addIceCandidate(
              new RTCIceCandidate(candidate),
            );
          } catch (error) {
            console.log('Error handling ICE candidate:', error);
          }
        });
      }
    };

    const unsubscribe = firestore()
      .collection('meetings')
      .doc(meetingId)
      .collection('participants')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            handleSnapshot(change.doc);
          }
        });
      });

    return () => {
      unsubscribe();
    };
  }, [meetingId, peerConnections]);

  const joinMeeting = async () => {
    try {
      const meetingRef = firestore().collection('meetings').doc(meetingId);
      const meetingSnapshot = await meetingRef.get();

      if (meetingSnapshot.exists && meetingSnapshot.data().started) {
        const offer = await peerConnections[meetingId].createOffer();
        await peerConnections[meetingId].setLocalDescription(
          new RTCSessionDescription(offer),
        );

        await meetingRef.collection('participants').add({
          offer: peerConnections[meetingId].localDescription,
        });
      } else {
        console.log('Meeting does not exist or has not started yet.');
      }
    } catch (error) {
      console.log('Error joining meeting:', error);
    }
  };

  const handleIceCandidate = (event, participantId) => {
    if (event.candidate) {
      firestore()
        .collection('meetings')
        .doc(meetingId)
        .collection('participants')
        .doc(participantId)
        .update({
          iceCandidates: firestore.FieldValue.arrayUnion(
            event.candidate.toJSON(),
          ),
        })
        .catch(error => {
          console.log('Error adding ICE candidate:', error);
        });
    }
  };

  const handleTrack = (event, participantId) => {
    const stream = event.streams[0];

    setRemoteStreams(prevStreams => ({
      ...prevStreams,
      [participantId]: stream, // Store the remote stream for the participant
    }));
  };

  return (
    <View>
      <Text>Join Screen</Text>
      {localStream && <RTCView streamURL={localStream.toURL()} />}
      {Object.entries(remoteStreams).map(([participantId, stream]) => (
        <RTCView key={participantId} streamURL={stream.toURL()} />
      ))}
    </View>
  );
};

export default JoinScreen;
