import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../HomeScreen';
import MapScreen from '../MapScreen';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import navigationStrings from '../../constant/navigationStrings';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
    },
  });

  return (
    <Tab.Navigator
      labeled={false}
      activeColor={isDarkMode ? '#000' : '#fff'}
      inactiveColor={isDarkMode ? '#fff' : '#000'}
      barStyle={[
        styles.container,
        {
          height: moderateScale(70),
          borderTopLeftRadius: moderateScale(15),
          borderTopRightRadius: moderateScale(15),
        },
      ]}>
      <Tab.Screen
        name={navigationStrings.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={24} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name={navigationStrings.MAP}
        component={MapScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="map" color={color} size={24} style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
