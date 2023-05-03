import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/color/colors';
import HomeScreen from '../HomeScreen';
import MapScreen from '../MapScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={colors.mainThemesColor}
      inactiveColor={colors.blackOpacity50}
      barStyle={{
        backgroundColor: colors.HomeScreenBackGroundColor,
        height: moderateScale(70),
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15),
        // overflow: 'visible',
      }}>
      <Tab.Screen
        name="TabHome"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="map" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
