import {useColorScheme} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DarkTheme,
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import navigationStrings from '../constant/navigationStrings';
import colors from '../assets/color/colors';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import DrawerNavigator from '../screens/DrawerNavigationScreen /DrawerNavigator';
import ExtraScreen from '../screens/ExtraScreen';
import ExtraScreen2 from '../screens/ExtraScreen/ExtraScreen2';
import CheckOutScreen from '../screens/CheckOutScreen';
import FirebaseScreen from '../screens/Firabse/FirebaseScreen';
import CallScreen from '../screens/ExtraScreen/CallScreen';
import JoinScreen from '../screens/ExtraScreen/JoinScreen';
import RoomScreen from '../screens/ExtraScreen/RoomScreen';
import VideoCallScreen from '../screens/ExtraScreen/VideoCallScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const theme = useColorScheme();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="VideoCallScreen"
        screenOptions={{
          statusBarColor: colors.mainThemesColor,
        }}>
        <Stack.Screen
          name={navigationStrings.LOGIN}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.HOME}
          component={DrawerNavigator}
          options={{
            headerShown: false,

            statusBarColor: colors.mainThemesColor,
          }}
        />
        <Stack.Screen
          name={navigationStrings.MAP}
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={navigationStrings.FORGOTPASSWORD}
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.SIGNUP}
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.EXTRASCREEN}
          component={ExtraScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.EXTRASCREEN2}
          component={ExtraScreen2}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={navigationStrings.CHECKOUT}
          component={CheckOutScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.FIREBASE}
          component={FirebaseScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.CALLSCREEN}
          component={CallScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.JOINSCREEN}
          component={JoinScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.ROOMSCREEN}
          component={RoomScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationStrings.VIDEOCALLSCREEN}
          component={VideoCallScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
