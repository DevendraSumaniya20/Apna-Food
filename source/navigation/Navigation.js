import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import navigationStrings from '../constant/navigationStrings';
import colors from '../assets/color/colors';
import {scale} from 'react-native-size-matters';
import BottomTabNavigator from '../screens/TabNavigationScreen/BottomTabsNavigator';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
