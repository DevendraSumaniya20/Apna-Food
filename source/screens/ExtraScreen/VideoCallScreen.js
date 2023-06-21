import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const VideoCallScreen = ({navigation}) => {
  const [meetingId, setMeetingId] = useState('');
  const [inputMeetingId, setInputMeetingId] = useState('');

  const generateMeetingId = () => {
    const randomId = Math.random().toString(36).substr(2, 6);
    setMeetingId(randomId);
  };

  const startCall = async () => {
    if (!meetingId) {
      generateMeetingId();
    }

    if (meetingId) {
      try {
        await firestore()
          .collection('meetings')
          .doc(meetingId)
          .set({started: true});
        navigation.navigate('JoinScreen', {meetingId: meetingId});
      } catch (error) {
        console.log('Error starting call:', error);
      }
    }
  };

  const joinCall = async () => {
    if (inputMeetingId) {
      try {
        const meetingRef = firestore()
          .collection('meetings')
          .doc(inputMeetingId);
        const meetingSnapshot = await meetingRef.get();

        if (meetingSnapshot.exists && meetingSnapshot.data().started) {
          navigation.navigate('JoinScreen', {meetingId: inputMeetingId});
        } else {
          console.log('Meeting does not exist or has not started yet.');
        }
      } catch (error) {
        console.log('Error joining call:', error);
      }
    }
  };

  const endCall = async () => {
    if (meetingId) {
      try {
        await firestore().collection('meetings').doc(meetingId).delete();
        setMeetingId('');
      } catch (error) {
        console.log('Error ending call:', error);
      }
    }
  };

  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={generateMeetingId}>
        <Text style={styles.buttonText}>Generate Meeting ID</Text>
      </TouchableOpacity>
      <Text style={styles.meetingIdText}>{meetingId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Meeting ID"
        value={inputMeetingId}
        onChangeText={setInputMeetingId}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={startCall}>
        <Text style={styles.buttonText}>Start Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={joinCall}>
        <Text style={styles.buttonText}>Join Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={endCall}>
        <Text style={styles.buttonText}>End Call</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  meetingIdText: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    width: '80%',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});

export default VideoCallScreen;
