import 'react-native-gesture-handler';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigation from './source/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import './source/constant/DCSLocalize';
import {useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLISHABLE_KEY} from '@env';
import {requestUserPermission} from './source/util/Notification/PushNotification';
import CustomeModule from './CustomModule';

const App = () => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  useEffect(() => {
    if (Platform.OS === 'android') {
      CustomeModule.show();
    }
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
        {/* <Text
          style={{
            fontSize: scale(20),
            fontWeight: 'bold',
            color: '#34de00',
            marginTop: moderateScale(15),
            textAlign: 'center',
          }}>
          {deviceID}
        </Text> */}
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
