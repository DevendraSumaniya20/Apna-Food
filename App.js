import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './source/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import './source/constant/DCSLocalize';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.main}>
      <Navigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
