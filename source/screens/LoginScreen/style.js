import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';

import colors from '../../assets/color/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  imageBackground: {
    height: moderateScale(200),
    width: '100%',
  },
  mainStyle: {
    paddingHorizontal: '5%',
    paddingVertical: verticalScale(44),
  },
  forgotView: {
    alignSelf: 'flex-end',
    marginVertical: moderateScale(30),
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
  },

  newAccountText: {
    fontSize: scale(14),
    color: colors.blackOpacity80,
    fontWeight: '500',
    fontFamily: 'NunitoSans-ExtraLightItalic',
  },
  signUpText: {
    fontWeight: 'bold',
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
});

export default styles;
