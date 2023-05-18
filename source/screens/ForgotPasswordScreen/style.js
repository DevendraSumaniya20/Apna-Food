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
    paddingTop: moderateScale(60),
  },
  forgotImg: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(30),
  },

  ForgotPasswordText: {
    fontSize: scale(30),
    alignSelf: 'center',
    color: colors.mainThemesColor,
    fontWeight: `bold`,
    fontFamily: 'NunitoSans-Bold',
  },

  ForgotPasswordView: {},
  ForgotPasswordTextDesc: {
    color: colors.black,
    lineHeight: moderateScale(20),
    textAlign: 'center',
  },

  ForgotPasswordTextDescView: {
    marginTop: moderateScale(8),
  },

  MainContentView: {
    paddingTop: moderateScale(30),
  },

  textInputView: {
    borderColor: colors.blackOpacity10,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    width: moderateScale(320),
  },

  errorStyleView: {
    marginTop: moderateScale(8),
    marginBottom: moderateScale(20),
  },

  errorStyle: {
    fontSize: scale(13),
    color: '#ff0000',
    marginTop: moderateScale(4),
    fontFamily: 'NunitoSans-SemiBold',
  },
});

export default styles;
