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
    paddingTop: moderateScale(50),
  },

  SignupImage: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(30),
  },
  WelcomeTextView: {
    paddingTop: moderateScale(20),
    alignItems: 'center',
  },
  WelcomeText: {
    fontSize: scale(20),
    fontWeight: 'bold',
    fontFamily: 'NunitoSans-SemiBold',
    textTransform: 'capitalize',
  },
  buttonStyle: {
    paddingTop: moderateScale(50),
  },
  errorStyle: {
    fontSize: scale(13),
    color: '#ff0000',
    marginTop: moderateScale(4),
    fontFamily: 'NunitoSans-SemiBold',
  },
});

export default styles;
