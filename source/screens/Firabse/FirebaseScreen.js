import React from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import {NativeModules} from 'react-native';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';

import styles from './styles';

const MusicPlayer = NativeModules.MusicPlayer;

const MusicPlayerScreen = () => {
  const playMusic = () => {
    const fileName = 'android_11';
    Platform.OS === 'android' ? MusicPlayer.play(fileName) : MusicPlayer.play();
  };

  const pauseMusic = () => {
    Platform.OS === 'android' ? MusicPlayer.pause() : MusicPlayer.pause();
  };

  const stopMusic = () => {
    Platform.OS === 'android' ? MusicPlayer.stop() : MusicPlayer.stop();
  };

  const changeVoiceToAlien = () => {
    const fileName = 'android_11';
    Platform.OS === 'android'
      ? MusicPlayer.changeVoiceToAlien(fileName)
      : MusicPlayer.changeVoiceToAlien();
  };

  const changeVoiceToChild = () => {
    const fileName = 'android_11';
    Platform.OS === 'android'
      ? MusicPlayer.changeVoiceToChild(fileName)
      : MusicPlayer.changeVoiceToChild();
  };

  const speedUpVoice = () => {
    const fileName = 'android_11';
    Platform.OS === 'android'
      ? MusicPlayer.speedUpVoice(fileName)
      : MusicPlayer.speedUpVoice();
  };

  const slowDownVoice = () => {
    const fileName = 'android_11';
    Platform.OS === 'android'
      ? MusicPlayer.slowDownVoice(fileName)
      : MusicPlayer.slowDownVoice();
  };

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

export default MusicPlayerScreen;
