import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MapScreen from '../MapScreen/MapScreen';
import BottomTabNavigator from '../TabNavigationScreen/BottomTabsNavigator';
import navigationStrings from '../../constant/navigationStrings';
import CustomDrawer from '../../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  });

  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      color: '#ffffff',
    },
  });

  return (
    <Drawer.Navigator
      screenOptions={{
        statusBarColor: isDarkMode
          ? darkStyles.container
          : lightStyles.container,
        drawerActiveBackgroundColor: '#5294ff',
        drawerActiveTintColor: isDarkMode ? '#ffffff' : '#000000',
        drawerInactiveTintColor: isDarkMode ? '#ffffff' : '#000000',
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Products"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={navigationStrings.MAP}
        component={MapScreen}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="map-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
