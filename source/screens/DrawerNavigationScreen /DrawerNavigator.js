import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MapScreen from '../MapScreen/MapScreen';
import {useSelector} from 'react-redux';
import BottomTabNavigator from '../TabNavigationScreen/BottomTabsNavigator';
import colors from '../../assets/color/colors';
import navigationStrings from '../../constant/navigationStrings';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
    },
  });

  return (
    <Drawer.Navigator
      screenOptions={{
        statusBarColor: colors.mainThemesColor,
      }}>
      <Drawer.Screen
        name={navigationStrings.BOTTOMTABNAVIGATOR}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          headerTintColor: colors.mainThemesColor,
          statusBarColor: colors.mainThemesColor,
        }}
      />
      <Drawer.Screen
        name={navigationStrings.MAP}
        component={MapScreen}
        options={{
          headerShown: false,
          headerTintColor: colors.mainThemesColor,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
