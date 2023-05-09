import colors from '../../assets/color/colors';
import {StyleSheet, I18nManager} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  arSliderTextAlign: {
    textAlign: 'right',
  },

  imageBackground: {
    height: moderateScale(200),
  },
  mainStyle: {
    paddingHorizontal: '5%',
  },

  TextinputWithLabelView: {
    paddingTop: moderateScale(40),
  },

  forgotView: {
    alignSelf: 'flex-end',
    marginVertical: moderateScale(25),
  },
  forgotText: {
    fontSize: scale(16),
    color: colors.mainThemesColor,
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
    color: colors.blackOpacity80,
    fontWeight: '500',
    fontFamily: 'NunitoSans-ExtraLightItalic',
  },
  signUpText: {
    fontWeight: '600',
    fontSize: scale(16),
    color: colors.mainThemesColor,
    textTransform: 'capitalize',
    fontFamily: 'Montserrat',
  },
  errorStyle: {
    fontSize: scale(13),
    color: '#d94b4a',
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
    color: colors.mainThemesColor,
    textAlign: 'center',
  },
  text: {
    fontSize: scale(16),
    color: 'black',
    paddingVertical: moderateScale(5),
    textAlign: 'center',
  },
});

export default styles;
