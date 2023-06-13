import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Button, TextInput} from 'react-native';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  registerGlobals,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
  MediaStreamTrack,
  ScreenCapturePickerView,
} from 'react-native-webrtc';
import io from 'socket.io-client';

const socket = io('http://localhost:8081'); // Replace with the appropriate server URL

const ExtraScreen3 = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [meetingId, setMeetingId] = useState('');
  const [callActive, setCallActive] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.log('getUserMedia error:', error);
      }
    };

    getMediaStream();
  }, []);

  const startCall = async () => {
    try {
      const configuration = {
        iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
      };
      const peerConnection = new RTCPeerConnection(configuration);

      if (localStream) {
        localStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, localStream);
        });
      }

      peerConnection.ontrack = event => {
        const remoteStream = event.streams[0];
        setRemoteStreams(prevStreams => [...prevStreams, remoteStream]);
      };

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const offerDescription = peerConnection.localDescription;

      console.log('Offer:', offerDescription);
      console.log('Meeting ID:', meetingId);

      // Emit the 'offer' event to the socket server
      socket.emit('offer', offerDescription, meetingId);

      // Set the call status to active
      setCallActive(true);
    } catch (error) {
      console.log('Error creating offer:', error);
    }
  };

  const generateRandomId = () => {
    const randomId = Math.random().toString(36).substr(2, 8); // Generate a random ID
    setMeetingId(randomId); // Set the random ID as the meeting ID
  };

  const endCall = () => {
    setLocalStream(null);
    setRemoteStreams([]);
    setCallActive(false);
  };

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  const joinMeeting = () => {
    if (connected) {
      socket.emit('join', meetingId);
    }
  };

  useEffect(() => {
    const handleOffer = async (offerDescription, senderId) => {
      try {
        const configuration = {
          iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
        };
        const peerConnection = new RTCPeerConnection(configuration);

        if (localStream) {
          localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
          });
        }

        peerConnection.ontrack = event => {
          const remoteStream = event.streams[0];
          setRemoteStreams(prevStreams => [...prevStreams, remoteStream]);
        };

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        const answerDescription = peerConnection.localDescription;
        console.log('Answer:', answerDescription);
        console.log('Sender ID:', senderId);

        // Emit the 'answer' event to the socket server
        socket.emit('answer', answerDescription, senderId);

        // Set the call status to active
        setCallActive(true);
      } catch (error) {
        console.log('Error creating answer:', error);
      }
    };

    socket.on('offer', handleOffer);

    return () => {
      socket.off('offer', handleOffer);
    };
  }, []);

  useEffect(() => {
    const handleAnswer = async answerDescription => {
      try {
        const peerConnection = new RTCPeerConnection();

        if (localStream) {
          localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
          });
        }

        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answerDescription),
        );
      } catch (error) {
        console.log('Error setting remote description:', error);
      }
    };

    socket.on('answer', handleAnswer);

    return () => {
      socket.off('answer', handleAnswer);
    };
  }, []);

  return (
    <View>
      <View style={styles.videoContainer}>
        {localStream && (
          <RTCView style={styles.localVideo} streamURL={localStream.toURL()} />
        )}
        {remoteStreams.map((stream, index) => (
          <RTCView
            key={`remoteVideo_${index}`}
            style={styles.remoteVideo}
            streamURL={stream.toURL()}
          />
        ))}
      </View>

      <TextInput
        style={styles.input}
        onChangeText={text => setMeetingId(text)}
        value={meetingId}
        placeholder="Enter Meeting ID"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <Button
        title="Start Call"
        onPress={startCall}
        disabled={!localStream || callActive}
      />
      <Button title="Generate Random ID" onPress={generateRandomId} />
      <Button title="End Call" onPress={endCall} />
      <Button
        title="Join Meeting"
        onPress={joinMeeting}
        disabled={!connected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideo: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  remoteVideo: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ExtraScreen3;
