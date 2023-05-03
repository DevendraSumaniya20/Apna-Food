import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import colors from '../../assets/color/colors';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
    backgroundColor: '#007AFF',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
  },
  buttonText: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#fff',
  },
  text1: {
    marginTop: moderateScale(50),
    fontSize: scale(12),
    textAlign: 'center',
  },
  text2: {
    fontSize: scale(12),
    textAlign: 'center',
  },
});

export default styles;
