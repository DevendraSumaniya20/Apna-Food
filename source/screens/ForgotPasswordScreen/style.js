import {version} from 'react';
import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  ForgotPasswordText: {
    fontSize: scale(30),
    alignSelf: 'center',
    color: '#000',
    fontWeight: `bold`,
    fontFamily: 'NunitoSans-Bold',
  },

  ForgotPasswordView: {
    paddingTop: moderateScale(250),
  },
  ForgotPasswordTextDesc: {
    color: colors.black,
    letterSpacing: scale(1),
  },

  ForgotPasswordTextDescView: {
    paddingTop: moderateScale(20),
  },

  textInputView: {
    borderColor: colors.blackOpacity10,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    width: moderateScale(320),
  },

  errorStyleView: {
    paddingTop: moderateScale(14),
    alignItems: 'center',
  },

  errorStyle: {
    fontSize: scale(13),
    color: '#d94b4a',
    marginTop: moderateScale(4),
    fontFamily: 'NunitoSans-Light',
    fontWeight: '600',
  },
  submitView: {
    paddingTop: moderateScale(100),
    width: moderateScale(300),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainThemesColor,
  },
});

export default styles;
