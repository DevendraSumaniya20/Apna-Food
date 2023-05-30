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

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const theme = useColorScheme();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="Home"
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
            headerTintColor: colors.mainThemesColor,
            statusBarColor: colors.mainThemesColor,
          }}
        />
        <Stack.Screen
          name={navigationStrings.MAP}
          component={MapScreen}
          options={{
            headerShown: false,
            headerTintColor: colors.mainThemesColor,
          }}
        />

        <Stack.Screen
          name={navigationStrings.FORGOTPASSWORD}
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
            headerTintColor: colors.mainThemesColor,
          }}
        />
        <Stack.Screen
          name={navigationStrings.SIGNUP}
          component={SignUpScreen}
          options={{
            headerShown: false,
            headerTintColor: colors.mainThemesColor,
          }}
        />
        <Stack.Screen
          name={navigationStrings.EXTRASCREEN}
          component={ExtraScreen}
          options={{
            headerShown: false,
            headerTintColor: colors.mainThemesColor,
          }}
        />
        <Stack.Screen
          name={navigationStrings.EXTRASCREEN2}
          component={ExtraScreen2}
          options={{
            headerShown: false,
            headerTintColor: colors.mainThemesColor,
          }}
        />
        <Stack.Screen
          name={navigationStrings.CHECKOUT}
          component={CheckOutScreen}
          options={{
            headerShown: false,
            headerTintColor: colors.mainThemesColor,
          }}
        />
        <Stack.Screen
          name={navigationStrings.FIREBASE}
          component={FirebaseScreen}
          options={{
            headerShown: false,
            headerTintColor: colors.mainThemesColor,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
