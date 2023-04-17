import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import colors from '../assets/color/colors';

const ButtonCustomComponents = ({
  buttonText,
  buttonStyle,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonStyle}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainThemesColor,
  },
  buttonText: {
    fontSize: scale(16),
    color: colors.white,
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat',
  },
});

export default ButtonCustomComponents;
