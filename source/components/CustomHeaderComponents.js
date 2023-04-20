import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import colors from '../assets/color/colors';

const CustomHeaderComponents = ({
  label,
  onPress,
  back,
  paddingTop = moderateScale(40),
}) => {
  return (
    <View style={[styles.header, {paddingTop}]}>
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
    paddingTop: verticalScale(30),
  },
  backBtn: {
    paddingHorizontal: moderateScale(10),
  },
  label: {
    flex: 1,
    color: colors.white,
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '700',
  },
  backBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: scale(14),
  },
});

export default CustomHeaderComponents;
