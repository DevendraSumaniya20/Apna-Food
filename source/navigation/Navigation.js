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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name={navigationStrings.LOGIN}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationStrings.HOME}
          component={BottomTabNavigator}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.mainThemesColor,
            },
            headerTintColor: colors.whiteOpacity80,
            title: 'RestaurantList',
            headerTitleStyle: {
              fontSize: scale(17),
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name={navigationStrings.MAP}
          component={MapScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.mainThemesColor,
            },
            headerTintColor: colors.whiteOpacity80,
            title: 'Map View',
            headerTitleStyle: {
              fontSize: scale(17),
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
