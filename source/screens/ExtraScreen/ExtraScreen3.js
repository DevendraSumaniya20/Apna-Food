import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCSessionDescription,
} from 'react-native-webrtc';
import io from 'socket.io-client';
import styles from './style';

const socket = io('http://YOUR_SERVER_IP:3000'); // Replace 'YOUR_SERVER_IP' with the IP address or hostname of your socket server

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

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const offerDescription = peerConnection.localDescription;

      // Emit the 'join' event to the socket server
      socket.emit('join', meetingId);

      // Emit the 'offer' event to the socket server
      socket.emit('offer', offerDescription, socket.id, meetingId);

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
    if (meetingId.trim() !== '') {
      // Emit the 'join' event to the socket server with the meeting ID
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

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        const answerDescription = peerConnection.localDescription;

        // Emit the 'answer' event to the socket server
        socket.emit('answer', answerDescription, senderId, meetingId);

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
    const handleAnswer = async (answerDescription, senderId) => {
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
      {/* Video container */}
      <View>
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

      {/* Meeting ID input */}
      <TextInput
        style={styles.input}
        onChangeText={text => setMeetingId(text)}
        value={meetingId}
        placeholder="Enter Meeting ID"
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />

      {/* Start Call button */}
      <TouchableOpacity
        style={styles.ButtonStyles}
        onPress={startCall}
        disabled={!localStream || callActive}>
        <Text style={styles.buttonTextVideoCall}>Start Call</Text>
      </TouchableOpacity>

      {/* Generate Random ID button */}
      <TouchableOpacity
        style={styles.ButtonStyles}
        onPress={generateRandomId}
        disabled={callActive}>
        <Text style={styles.buttonTextVideoCall}>Generate Random ID</Text>
      </TouchableOpacity>

      {/* End Call button */}
      <TouchableOpacity
        style={styles.ButtonStyles}
        onPress={endCall}
        disabled={!callActive}>
        <Text style={styles.buttonTextVideoCall}>End Call</Text>
      </TouchableOpacity>

      {/* Join Meeting button */}
      <TouchableOpacity
        style={styles.ButtonStyles}
        onPress={joinMeeting}
        disabled={!meetingId.trim()}>
        <Text style={styles.buttonTextVideoCall}>Join Meeting</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExtraScreen3;
