import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },

  submain: {
    paddingHorizontal: '5%',
  },
  forgotPasswordView: {
    alignItems: 'center',
    paddingTop: moderateScale(30),
  },
  forgotImg: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(30),
  },

  ForgotPasswordText: {
    fontSize: scale(30),
    alignSelf: 'center',
    fontWeight: `bold`,
    fontFamily: 'NunitoSans-Bold',
  },

  ForgotPasswordView: {
    fontFamily: 'NunitoSans-SemiBold',
  },
  ForgotPasswordTextDesc: {
    lineHeight: moderateScale(20),
    textAlign: 'center',
  },

  ForgotPasswordTextDescView: {
    marginTop: moderateScale(8),
  },

  MainContentView: {
    paddingTop: moderateScale(25),
  },

  textInputView: {
    borderWidth: 1,
    borderRadius: moderateScale(10),
    fontFamily: 'NunitoSans-SemiBold',
  },

  errorStyleView: {
    marginTop: moderateScale(4),
    marginBottom: moderateScale(20),
  },

  errorStyle: {
    fontSize: scale(13),
    color: '#ff0000',
    marginTop: moderateScale(4),
    fontFamily: 'NunitoSans-SemiBold',
  },
  buttonStyle: {
    marginTop: moderateScale(1),
  },
});

export default styles;
