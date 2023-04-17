import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import colors from '../assets/color/colors';

const CustomHeaderComponents = ({label, onPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={onPress}>
        <Text style={styles.backBtnText}>back</Text>
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.mainThemesColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: moderateScale(25),
    height: verticalScale(50),
  },
  backBtn: {
    paddingHorizontal: moderateScale(10),
  },
  label: {
    flex: 1,
    color: colors.white,
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '900',
  },
  backBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: scale(16),
  },
});

export default CustomHeaderComponents;
