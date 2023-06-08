import {moderateScale, scale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subView: {
    marginTop: moderateScale(30),
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
});

export default styles;
