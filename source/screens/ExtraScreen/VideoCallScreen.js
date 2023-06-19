import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Alert} from 'react-native';
import {RTCPeerConnection, mediaDevices} from 'react-native-webrtc';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {moderateScale} from 'react-native-size-matters';
import navigationStrings from '../../constant/navigationStrings';

const VideoCallScreen = ({navigation}) => {
  const {t} = useTranslation();

  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callId, setCallId] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    initializeWebRTC();
    checkExistingMeeting();
  }, []);

  const initializeWebRTC = async () => {
    const configuration = {
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
    };
    const pc = new RTCPeerConnection(configuration);

    const stream = await mediaDevices.getUserMedia({audio: true, video: true});

    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });

    pc.onicecandidate = event => {
      if (event.candidate) {
        sendSignalingMessage(event.candidate.toJSON());
      }
    };

    pc.ontrack = event => {
      setRemoteStream(event.streams[0]);
    };

    setPeerConnection(pc);
    setLocalStream(stream);
  };

  const sendSignalingMessage = message => {
    const currentUserId = auth().currentUser.uid;
    const signalingRef = database().ref(`signalingMessages/${currentUserId}`);

    signalingRef.push(message);
  };

  const generateMeetingId = () => {
    const meetingId = Math.random().toString(36).substring(2, 8);
    setMeetingId(meetingId);
    startCall(meetingId);
  };

  const startCall = meetingId => {
    const meetingsRef = database().ref('meetings');
    const newMeetingRef = meetingsRef.child(meetingId);
    const participantRef = newMeetingRef.child('participants');
    const userId = auth().currentUser.uid;
    const userRef = participantRef.child(userId);
    userRef
      .set(true)
      .then(() => {
        newMeetingRef.set({
          meetingId,
          status: 'ongoing',
          callerUserId: userId,
        });
        listenForMeetingUpdates(meetingId);
        setCallId(meetingId);
        navigation.navigate('JoinScreen', {meetingId: meetingId});
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to start the meeting. Please try again.');
      });
  };

  const joinMeeting = () => {
    if (inputText) {
      const meetingRef = database().ref('meetings').child(inputText);
      meetingRef.once('value', snapshot => {
        const meetingData = snapshot.val();
        if (meetingData && meetingData.status === 'ongoing') {
          const participantRef = meetingRef.child('participants');
          const userId = auth().currentUser.uid;
          const userRef = participantRef.child(userId);
          userRef
            .set(true)
            .then(() => {
              navigation.navigate('JoinScreen', {meetingId: inputText});
            })
            .catch(error => {
              Alert.alert(
                'Error',
                'Failed to join the meeting. Please try again.',
              );
            });
        } else {
          Alert.alert('Error', 'Invalid meeting ID or the meeting has ended.');
        }
      });
    }
  };

  const checkExistingMeeting = () => {
    const meetingRef = database().ref('meetings').child(inputText);
    meetingRef.once('value', snapshot => {
      const meetingData = snapshot.val();
      if (meetingData && meetingData.status === 'ongoing') {
        setMeetingId(inputText);
        listenForMeetingUpdates(inputText);
      }
    });
  };

  const listenForMeetingUpdates = meetingId => {
    const meetingRef = database().ref(`meetings/${meetingId}`);
    meetingRef.on('value', snapshot => {
      const meetingData = snapshot.val();
      if (meetingData && meetingData.status === 'ended') {
        endCall();
      }
    });
  };

  const endCall = () => {
    const meetingRef = database().ref(`meetings/${callId}`);
    const participantRef = meetingRef.child('participants');
    const userId = auth().currentUser.uid;
    const userRef = participantRef.child(userId);
    userRef
      .remove()
      .then(() => {
        meetingRef.remove();
        peerConnection.close();
        localStream.release();
        setPeerConnection(null);
        setLocalStream(null);
        setRemoteStream(null);
        setCallId(null);
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to end the meeting. Please try again.');
      });
  };

  return (
    <View>
      <CustomHeaderComponents
        paddingTop={moderateScale(50)}
        back={t('common:Back')}
        label={t('common:SignUp')}
        onPress={() => {
          navigation.navigate(navigationStrings.LOGIN);
        }}
      />

      <Button title="Generate Meeting ID" onPress={generateMeetingId} />
      {meetingId && <Text>Meeting ID: {meetingId}</Text>}
      <TextInput
        placeholder="Enter Meeting ID"
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
      />
      <Button
        title="Start Call"
        onPress={startCall}
        disabled={!meetingId || callId !== null}
      />
      <Button
        title="Join Meeting"
        onPress={joinMeeting}
        disabled={!inputText || callId !== null}
      />
      <Button title="End Call" onPress={endCall} disabled={callId === null} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
});

export default VideoCallScreen;
