import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './source/navigation/Navigation';

const App = () => {
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
