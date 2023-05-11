import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import colors from '../assets/color/colors';
import {useSelector} from 'react-redux';

const ButtonCustomComponents = ({
  buttonText,
  buttonStyle,
  color = '#fff',
  fontWeight = '800',
  fontSize = scale(16),
  onPress = () => {},
}) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.buttonStyle,
          buttonStyle,
          isDarkMode
            ? {backgroundColor: '#fff', color: '#000'}
            : {backgroundColor: '#000', color: '#fff'},
        ]}>
        <Text
          style={[
            styles.buttonText,
            {color, fontWeight, fontSize},
            isDarkMode
              ? {backgroundColor: '#fff', color: '#000'}
              : {backgroundColor: '#000', color: '#fff'},
          ]}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: verticalScale(50),
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
