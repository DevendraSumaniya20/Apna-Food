import 'react-native-gesture-handler';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './source/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import './source/constant/DCSLocalize';
import {useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLISHABLE_KEY} from '@env';

import {requestUserPermission} from './source/util/Notification/PushNotification';

const App = () => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  useEffect(() => {
    requestUserPermission();
    SplashScreen.hide();
  }, []);

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <View style={[styles.main]}>
        <StatusBar
          backgroundColor={isDarkMode ? 'black' : 'white'}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <Navigation />
      </View>
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
