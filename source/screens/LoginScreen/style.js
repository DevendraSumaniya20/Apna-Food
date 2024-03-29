import colors from '../../assets/color/colors';
import {StyleSheet, I18nManager} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  arSliderTextAlign: {
    textAlign: 'right',
    fontFamily: 'NunitoSans-SemiBold',
  },

  isDarkModeView: {
    height: moderateScale(20),
  },
  imageBackground: {
    height: moderateScale(200),
    borderRadius: moderateScale(20),
    borderWidth: 1,
  },
  mainStyle: {
    paddingHorizontal: '5%',
  },

  TextinputWithLabelView: {
    paddingTop: moderateScale(8),
  },

  forgotView: {
    alignSelf: 'flex-end',
    marginVertical: moderateScale(20),
  },
  forgotText: {
    fontSize: scale(16),
    fontFamily: 'NunitoSans-Bold',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
  },

  newAccountText: {
    fontSize: scale(14),
    fontWeight: '500',
    fontFamily: 'NunitoSans-ExtraLightItalic',
  },
  signUpText: {
    fontWeight: '600',
    fontSize: scale(16),
    textTransform: 'capitalize',
    fontFamily: 'NunitoSans-SemiBold',
  },
  errorStyle: {
    fontSize: scale(13),
    color: '#ff0000',
    marginTop: moderateScale(4),
    fontFamily: 'NunitoSans-SemiBold',
  },
  bottomSubView: {
    flexDirection: 'row',
    borderColor: 'blue',
  },
  selectedText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'NunitoSans-SemiBold',
  },
  text: {
    fontSize: scale(16),
    color: 'black',
    paddingVertical: moderateScale(5),
    textAlign: 'center',
    fontFamily: 'NunitoSans-SemiBold',
  },
  darkMode: {
    backgroundColor: '#000',
    color: '#fff',
  },
});

export default styles;
