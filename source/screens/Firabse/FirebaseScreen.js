import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {NativeModules} from 'react-native';

const {VoiceChangingModule} = NativeModules;

const FirebaseScreen = () => {
  const audioTrackURL =
    'https://www.youtube.com/watch?v=25ROFXjoaAU&ab_channel=7clouds';
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);

  const playAudio = async () => {
    if (Platform.OS === 'android') {
      await VoiceChangingModule.playAudio(audioTrackURL);
      setIsPlaying(true);
      audioPlayerRef.current = true;
    }
  };

  const pauseAudio = () => {
    if (Platform.OS === 'android' && isPlaying) {
      VoiceChangingModule.pauseAudio();
      setIsPlaying(false);
      audioPlayerRef.current = false;
    }
  };

  const stopAudio = () => {
    if (Platform.OS === 'android' && isPlaying) {
      VoiceChangingModule.stopAudio();
      setIsPlaying(false);
      audioPlayerRef.current = null;
    }
  };

  useEffect(() => {
    console.log('Audio playback triggered');

    return () => {
      if (isPlaying) {
        VoiceChangingModule.stopAudio();
        setIsPlaying(false);
        audioPlayerRef.current = null;
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e4e5ea" />
      <Text style={styles.title}>Voice Changer</Text>
      <Text style={styles.title}>Change Voice Effects</Text>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={playAudio} style={styles.icon}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pauseAudio} style={styles.icon}>
          <Text>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopAudio} style={styles.icon}>
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.statusText}>{isPlaying ? 'Playing' : 'Paused'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e4e5ea',
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    marginVertical: 25,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  icon: {
    height: 40,
    width: 40,
    marginBottom: 15,
  },
  statusText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default FirebaseScreen;
