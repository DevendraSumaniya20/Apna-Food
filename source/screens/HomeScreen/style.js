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
  },
  image: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: moderateScale(10),
  },

  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.locationBackGroundColor,
    borderRadius: moderateScale(5),
    padding: moderateScale(8),
  },
  locationIcon: {
    height: moderateScale(30),
    width: moderateScale(30),
  },

  subMain: {
    flexDirection: 'row',
    margin: moderateScale(10),
    backgroundColor: colors.HomeScreenViewColor,
    padding: moderateScale(10),
    borderRadius: moderateScale(15),
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

  imageTitile: {
    fontSize: scale(16),
    fontWeight: '600',
    color: colors.black,
    fontFamily: 'NunitoSans-ExtraBold',
    textTransform: 'capitalize',
  },
});

export default styles;
