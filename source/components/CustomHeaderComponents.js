import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import colors from '../assets/color/colors';

import {useSelector} from 'react-redux';
const CustomHeaderComponents = ({
  label,
  onPress,
  back,
  paddingTop = moderateScale(40),
}) => {
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
        styles.header,
        {paddingTop},
        isDarkMode ? darkStyles.container : lightStyles.container,
      ]}>
      <TouchableOpacity style={styles.backBtn} onPress={onPress}>
        <Text style={styles.backBtnText}>{back}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
      <View style={{width: moderateScale(55)}} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.mainThemesColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: verticalScale(40),
  },
  backBtn: {
    paddingHorizontal: moderateScale(10),
    padding: verticalScale(5),
  },
  label: {
    flex: 1,
    color: colors.white,
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '700',
    paddingBottom: verticalScale(5),
  },
  backBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: scale(14),
  },
});

export default CustomHeaderComponents;
