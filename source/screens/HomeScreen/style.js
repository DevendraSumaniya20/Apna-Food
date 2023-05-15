import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import colors from '../../assets/color/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  dataMainView: {
    flex: 1,
    paddingTop: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistInnerView: {
    borderRadius: moderateScale(5),
    borderColor: 'red',
    borderWidth: 2,
    marginTop: moderateScale(14),
  },
});

export default styles;
