/**
 * @format
 */

import {initializeApp} from 'firebase/app';

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import {store, persistor} from './source/store/store';
import {PersistGate} from 'redux-persist/integration/react';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const firebaseConfig = {
  apiKey: 'AIzaSyAXhdAy3iEt_HdNAW4RnYa3DN_1E7Ki-lI',
  authDomain: 'apna-food-c8049.firebaseapp.com',
  // databaseURL: 'https://apna-food-c8049-default-rtdb.firebaseio.com',
  projectId: 'apna-food-c8049',
  storageBucket: 'apna-food-c8049.appspot.com',
  messagingSenderId: '80890309219',
  appId: '1:80890309219:web:5f80ac9abf90d4e6b26656',
  measurementId: 'G-2HZPMWP96H',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const ApnaFood = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ApnaFood);
