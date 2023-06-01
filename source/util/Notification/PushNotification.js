import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const getFCMToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken, 'This is the old token');

    if (!fcmToken) {
      const newToken = await messaging().getToken();
      if (newToken) {
        console.log(newToken, 'New token');
        await AsyncStorage.setItem('fcmToken', newToken);
      }
    }
  } catch (error) {
    console.log(
      error,
      'An error occurred while retrieving or setting the token',
    );
  }
};

export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFCMToken();
    }
  } catch (error) {
    console.log(error, 'An error occurred while requesting user permission');
  }
};
