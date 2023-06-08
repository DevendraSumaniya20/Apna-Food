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
    </View>
  );
};

export default FirebaseScreen;
