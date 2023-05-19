import {scale, moderateScale} from 'react-native-size-matters';
import colors from '../../assets/color/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: moderateScale(20),
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.mainThemesColor,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
  },
  buttonText: {
    fontSize: scale(16),
    color: '#fff',
    fontFamily: 'NunitoSans-Bold',
    textTransform: 'uppercase',
  },
});

export default styles;
