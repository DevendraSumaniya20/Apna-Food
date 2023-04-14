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
    backgroundColor: colors.HomeScreenBackGroundColor,
    margin: moderateScale(5),
  },

  subMain: {
    flexDirection: 'row',
    backgroundColor: colors.HomeScreenViewColor,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});

export default styles;
