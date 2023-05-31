import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'this is the old token');

  if (!fcmToken) {
    try {
      const newToken = await messaging().getToken();
      if (newToken) {
        console.log(newToken, 'New token');
        await AsyncStorage.setItem('fcmToken', newToken);
      }
    } catch (error) {
      console.log(error, 'error occurred while setting the token');
    }
  }
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}
