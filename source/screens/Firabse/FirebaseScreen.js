import React from 'react';
import {Button} from 'react-native';
import {NativeModules} from 'react-native';

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
    <>
      <Button title="Play" onPress={playMusic} />
      <Button title="Pause" onPress={pauseMusic} />
      <Button title="Stop" onPress={stopMusic} />
    </>
  );
};

export default FirebaseScreen;
