import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './source/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import './source/constant/DCSLocalize';
import {useSelector} from 'react-redux';

const App = () => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={[styles.main]}>
      <StatusBar
        backgroundColor={isDarkMode ? 'black' : 'white'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
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
