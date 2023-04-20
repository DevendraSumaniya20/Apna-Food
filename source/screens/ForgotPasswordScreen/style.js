import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/color/colors';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  submain: {
    paddingHorizontal: '5%',
  },

  ForgotPasswordText: {
    fontSize: scale(30),
    alignSelf: 'center',
    color: colors.mainThemesColor,
    fontWeight: `bold`,
    fontFamily: 'NunitoSans-Bold',
  },

  ForgotPasswordView: {
    marginTop: moderateScale(200),
  },
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
    color: '#d94b4a',
    marginTop: moderateScale(4),
    fontFamily: 'NunitoSans-Light',
    fontWeight: '600',
  },
  submitView: {
    marginTop: moderateScale(100),
    width: moderateScale(300),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
