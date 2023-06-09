import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {NativeModules} from 'react-native';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';

import styles from './styles';

const MusicPlayer = NativeModules.MusicPlayer;

const FirebaseScreen = () => {
  const playMusic = () => {
    const fileName = 'android_11';
    MusicPlayer.play(fileName);
  };

  const pauseMusic = () => {
    MusicPlayer.pause();
  };

  const stopMusic = () => {
    MusicPlayer.stop();
  };

  const changeVoiceToAlien = () => {
    const fileName = 'android_11';
    MusicPlayer.changeVoiceToAlien(fileName);
  };

  const changeVoiceToChild = () => {
    const fileName = 'android_11';
    MusicPlayer.changeVoiceToChild(fileName);
  };

  const speedUpVoice = () => {
    const fileName = 'android_11';
    MusicPlayer.speedUpVoice(fileName);
  };

  const slowDownVoice = () => {
    const fileName = 'android_11';
    MusicPlayer.slowDownVoice(fileName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subView}>
        <ButtonCustomComponents onPress={playMusic} buttonText="Play" />
      </View>

      <View style={styles.subView}>
        <ButtonCustomComponents onPress={pauseMusic} buttonText="Pause" />
      </View>

      <View style={styles.subView}>
        <ButtonCustomComponents onPress={stopMusic} buttonText="Stop" />
      </View>

      <View style={styles.subView}>
        <ButtonCustomComponents
          onPress={changeVoiceToAlien}
          buttonText="Change Voice to Alien"
        />
      </View>

      <View style={styles.subView}>
        <ButtonCustomComponents
          onPress={changeVoiceToChild}
          buttonText="Change Voice to Child"
        />
      </View>

      <View style={styles.subView}>
        <ButtonCustomComponents
          onPress={speedUpVoice}
          buttonText="Speed Up Voice"
        />
      </View>

      <View style={styles.subView}>
        <ButtonCustomComponents
          onPress={slowDownVoice}
          buttonText="Slow Down Voice"
        />
      </View>
    </View>
  );
};

export default FirebaseScreen;
