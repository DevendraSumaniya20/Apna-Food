import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';

const CustomDrawer = props => {
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
    <View
      style={[
        styles.container,
        isDarkMode ? darkStyles.container : lightStyles.container,
      ]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}>
        <View
          style={[
            styles.DrawerItemListStyleView,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View></View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: moderateScale(5),
  },
  DrawerItemListStyleView: {
    flex: 1,
    paddingTop: moderateScale(10),
  },
});
