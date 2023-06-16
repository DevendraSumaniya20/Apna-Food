import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import firebase from '../../auth/FirebaseAuth';

import {RTCView, mediaDevices} from 'react-native-webrtc';

const firebaseConfig = {
  apiKey: 'AIzaSyAXhdAy3iEt_HdNAW4RnYa3DN_1E7Ki-lI',
  authDomain: 'apna-food-c8049.firebaseapp.com',
  projectId: 'apna-food-c8049',
  storageBucket: 'apna-food-c8049.appspot.com',
  messagingSenderId: '80890309219',
  appId: '1:80890309219:web:5f80ac9abf90d4e6b26656',
  measurementId: 'G-2HZPMWP96H',
  databaseURL:
    'https://console.firebase.google.com/u/0/project/apna-food-c8049/firestore/data/~2FvideoCalls~2FhXx1O2k9tUAtpiEFPhrq',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ExtraScreen3 = () => {
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [meetingId, setMeetingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const pcRef = useRef(null);
  const localICECandidatesRef = useRef([]);

  useEffect(() => {
    initializeWebRTC();
    return cleanupWebRTC;
  }, []);

  const initializeWebRTC = async () => {
    const configuration = {
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
    };
    pcRef.current = new RTCPeerConnection(configuration);
    pcRef.current.onicecandidate = handleICECandidate;
    pcRef.current.ontrack = handleTrack;

    const stream = await mediaDevices.getUserMedia({audio: true, video: true});
    localStreamRef.current = stream;
    setStream(stream);
    stream.getTracks().forEach(track => {
      pcRef.current.addTrack(track, stream);
    });
  };

  const handleICECandidate = event => {
    if (event.candidate) {
      localICECandidatesRef.current.push(event.candidate.toJSON());
    }
  };

  const handleTrack = event => {
    if (event.track.kind === 'video') {
      setRemoteStream(event.streams[0]);
      remoteStreamRef.current = event.streams[0];
    }
  };

  const cleanupWebRTC = () => {
    if (pcRef.current) {
      pcRef.current.close();
    }
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  };

  const handleOffer = async () => {
    try {
      setIsLoading(true);

      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      const documentData = {
        offer: offer,
        candidates: localICECandidatesRef.current,
      };

      const documentRef = await firebase
        .firestore()
        .collection('videoCalls')
        .add(documentData);

      console.log(
        'Offer created and stored in Firestore with ID:',
        documentRef.id,
      );
      setMeetingId(documentRef.id); // Set the generated meeting ID
    } catch (error) {
      console.error('Error handling offer:', error);
      Alert.alert('Error', 'An error occurred while creating the offer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async () => {
    try {
      setIsLoading(true);

      const documentRef = firebase
        .firestore()
        .collection('videoCalls')
        .doc(meetingId);
      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        const documentData = documentSnapshot.data();
        const answer = documentData.answer;

        await pc.current.setRemoteDescription(
          new RTCSessionDescription(answer),
        );

        console.log('Remote description set with answer');

        const candidates = documentData.candidates;
        candidates.forEach(candidate => {
          pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        });

        console.log('ICE candidates added');
      } else {
        console.log('Meeting ID does not exist');
      }
    } catch (error) {
      console.error('Error handling answer:', error);
      Alert.alert('Error', 'An error occurred while answering the call.');
    } finally {
      setIsLoading(false);
    }
  };

  const addDocument = async () => {
    try {
      const collectionRef = firebase.firestore().collection('videoCalls');
      const documentId = generateMeetingId(); // Generate a random meeting ID
      const documentRef = collectionRef.doc(documentId);

      await documentRef.set({
        answer: '',
        candidates: '',
        offer: '',
      });

      console.log('Document added with ID:', documentRef.id);
      setMeetingId(documentId); // Set the generated meeting ID
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const collectionRef = firebase.firestore().collection('videoCalls');
      const documentId = meetingId; // Use the current meeting ID
      const documentRef = collectionRef.doc(documentId);

      const documentSnapshot = await documentRef.get();
      if (documentSnapshot.exists) {
        const documentData = documentSnapshot.data();
        console.log('Document Data:', documentData);

        const answerValue = documentData.answer;
        const candidatesValue = documentData.candidates;
        const offerValue = documentData.offer;

        // Use the retrieved values as needed
        console.log('Answer:', answerValue);
        console.log('Candidates:', candidatesValue);
        console.log('Offer:', offerValue);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };
  const handleJoinMeeting = async () => {
    try {
      setIsLoading(true);

      const offerSnapshot = await firebase
        .firestore()
        .collection('videoCalls')
        .doc(meetingId)
        .get();

      if (offerSnapshot.exists) {
        const offerData = offerSnapshot.data();
        const offer = offerData.offer;

        await pcRef.current.setRemoteDescription(
          new RTCSessionDescription(offer),
        );

        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);

        await firebase
          .firestore()
          .collection('videoCalls')
          .doc(meetingId)
          .update({answer: answer});

        console.log('Answer created and stored in Firestore');
      } else {
        console.log('Meeting ID does not exist');
      }
    } catch (error) {
      console.error('Error handling join meeting:', error);
      Alert.alert('Error', 'An error occurred while joining the meeting.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(prevMuted => !prevMuted);
    localStreamRef.current.getAudioTracks().forEach(track => {
      track.enabled = !isMuted;
    });
  };

  const toggleVideo = () => {
    localStreamRef.current.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
  };

  const switchCamera = () => {
    localStreamRef.current.getVideoTracks().forEach(track => {
      track._switchCamera();
    });
  };

  const endCall = () => {
    cleanupWebRTC();
    // Navigate to the next screen or perform any desired actions
  };

  const generateMeetingId = () => {
    // Generate a random meeting ID using the desired logic
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };

  useEffect(() => {
    if (stream) {
      localStreamRef.current = stream;
      stream.getTracks().forEach(track => {
        pcRef.current.addTrack(track, stream);
      });
    }
  }, [stream]);

  return (
    <View style={styles.container}>
      {stream && (
        <RTCView streamURL={stream.toURL()} style={styles.localStream} />
      )}
      {remoteStream && (
        <RTCView streamURL={remoteStream.toURL()} style={styles.remoteStream} />
      )}
      <TouchableOpacity style={styles.button} onPress={addDocument}>
        <Text style={styles.buttonText}>Invite Friends</Text>
      </TouchableOpacity>
      {!remoteStream && isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : !remoteStream ? (
        <>
          <TouchableOpacity style={styles.button} onPress={handleAnswer}>
            <Text style={styles.buttonText}>Answer Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleJoinMeeting}>
            <Text style={styles.buttonText}>Join Meeting</Text>
          </TouchableOpacity>
        </>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={endCall}>
        <Text style={styles.buttonText}>End Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={toggleMute}>
        <Text style={styles.buttonText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={toggleVideo}>
        <Text style={styles.buttonText}>Toggle Video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={switchCamera}>
        <Text style={styles.buttonText}>Switch Camera</Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator style={styles.loader} />}

      <TouchableOpacity style={styles.button} onPress={handleOffer}>
        <Text style={styles.buttonText}>Create Offer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={fetchDocuments}>
        <Text style={styles.buttonText}>Fetch Documents</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localStream: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  remoteStream: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  loader: {
    marginTop: 16,
  },
});

export default ExtraScreen3;
