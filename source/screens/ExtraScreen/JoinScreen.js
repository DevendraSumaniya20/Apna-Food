import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  RTCView,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
} from 'react-native-webrtc';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const JoinScreen = ({route}) => {
  const {meetingId} = route.params;
  const rtcViewRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    listenForStream();
    setupPeerConnection();
    return () => {
      stopListeningForStream();
      closePeerConnection();
    };
  }, []);

  const listenForStream = () => {
    const currentUserId = auth().currentUser.uid;
    const streamRef = database().ref(`streams/${meetingId}`);

    streamRef.on('value', snapshot => {
      const streams = snapshot.val();
      if (streams) {
        const memberIds = Object.keys(streams);
        setMemberCount(memberIds.length);

        const streamURL = streams[currentUserId];
        if (rtcViewRef.current && streamURL) {
          rtcViewRef.current.srcObject = {uri: streamURL};
        }
      } else {
        setMemberCount(0);
      }
    });
  };

  const stopListeningForStream = () => {
    const currentUserId = auth().currentUser.uid;
    const streamRef = database().ref(`streams/${meetingId}/${currentUserId}`);
    streamRef.off('value');
  };

  const setupPeerConnection = async () => {
    const configuration = {
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
    };
    peerConnectionRef.current = new RTCPeerConnection(configuration);

    peerConnectionRef.current.onicecandidate = handleICECandidate;
    peerConnectionRef.current.onaddstream = handleAddStream;

    try {
      const stream = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream
        .getTracks()
        .forEach(track => peerConnectionRef.current.addTrack(track, stream));
    } catch (error) {
      console.log('Error accessing media devices:', error);
    }

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    // Send offer to the remote peer (signaling code is not shown here)
  };

  const handleICECandidate = event => {
    if (event.candidate) {
      // Send ICE candidate to the remote peer (signaling code is not shown here)
    }
  };

  const handleAddStream = event => {
    const remoteStream = event.stream;
    if (rtcViewRef.current) {
      rtcViewRef.current.srcObject = remoteStream;
    }
  };
  const closePeerConnection = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>JoinScreen</Text>
      <Text style={styles.text}>Meeting ID: {meetingId}</Text>
      <Text style={styles.text}>Member Count: {memberCount}</Text>
      <RTCView ref={rtcViewRef} style={styles.rtcView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  rtcView: {
    width: 200,
    height: 200,
  },
});

export default JoinScreen;
