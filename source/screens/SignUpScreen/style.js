import {StyleSheet, I18nManager} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  arSliderTextAlign: {
    textAlign: 'right',
  },
  SignUpView: {
    alignItems: 'center',
    paddingTop: moderateScale(10),
  },

  SignupImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(30),
  },
  SignUpMainView: {
    paddingHorizontal: '5%',
  },
  WelcomeTextView: {
    paddingTop: moderateScale(22),
    alignItems: 'center',
  },
  WelcomeText: {
    fontSize: scale(20),
    fontWeight: 'bold',
    fontFamily: 'NunitoSans-SemiBold',
    textTransform: 'capitalize',
  },
  buttonStyle: {
    paddingTop: moderateScale(30),
    paddingHorizontal: '5%',
  },
  errorStyle: {
    fontSize: scale(13),
    color: '#ff0000',
    marginTop: moderateScale(4),
    fontFamily: 'NunitoSans-SemiBold',
  },
});

export default styles;
