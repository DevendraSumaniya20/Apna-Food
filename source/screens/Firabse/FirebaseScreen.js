import React, {useEffect, useState} from 'react';
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NativeModules} from 'react-native';
import Video from 'react-native-video';

const {VoiceChangingModule} = NativeModules;

const FirebaseScreen = () => {
  const audioTrackURL = 'https://youtube.com/shorts/zmeCCpybfqE?feature=share';

  const changeToAlein = async () => {
    if (Platform.OS === 'android') {
      await VoiceChangingModule.changeVoiceToAlien(audioTrackURL);
      console.log('changeToAlein is working');
    }
  };

  const changeToChild = async () => {
    if (Platform.OS === 'android') {
      await VoiceChangingModule.changeVoiceToChild(audioTrackURL);
      console.log('changeToChild is working');
    }
  };

  const changeToFast = async () => {
    if (Platform.OS === 'android') {
      await VoiceChangingModule.speedUpVoice(audioTrackURL);
      console.log('changeToFast is working');
    }
  };

  const changeToSlow = async () => {
    if (Platform.OS === 'android') {
      await VoiceChangingModule.slowDownVoice(audioTrackURL);
      console.log('changeToSlow is working');
    }
  };

  useEffect(() => {
    console.log('Audio playback triggered');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#e4e5ea'} />
      <Text style={styles.title}>Voice Changer</Text>
      <Text style={styles.title}>Change Voice Effects</Text>
      <Video
        source={{uri: audioTrackURL}}
        style={styles.audioPlayer}
        controls={true}
        paused={true}
        repeat={true}
      />
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => changeToAlein()}>
          <Image
            source={{
              uri: 'https://icons.iconarchive.com/icons/google/noto-emoji-smileys/256/10101-alien-icon.png',
            }}
            resizeMode={'contain'}
            style={styles.icon}
          />
          <Text>Alien</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeToChild()}>
          <Image
            source={{
              uri: 'https://pics.freeicons.io/uploads/icons/png/2793494581535699799-512.png',
            }}
            resizeMode={'contain'}
            style={styles.icon}
          />
          <Text>Child</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeToFast()}>
          <Image
            source={{
              uri: 'https://www.pngjoy.com/pngl/346/6457386_black-arrows-fast-forward-symbol-transparent-png-download.png',
            }}
            resizeMode={'contain'}
            style={styles.icon}
          />
          <Text>Fast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeToSlow()}>
          <Image
            source={{
              uri: 'https://img.pngio.com/action-motion-play-slow-icon-slow-motion-png-512_512.png',
            }}
            resizeMode={'contain'}
            style={styles.icon}
          />
          <Text>Slow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e4e5ea',
    flex: 1,
    paddingTop: 50,
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
  },
  icon: {
    height: 40,
    width: 40,
    marginBottom: 15,
  },
  audioPlayer: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
});

export default FirebaseScreen;
