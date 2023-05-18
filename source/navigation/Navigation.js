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
import BottomTabNavigator from '../screens/TabNavigationScreen/BottomTabsNavigator';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const theme = useColorScheme();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
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
          component={BottomTabNavigator}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
