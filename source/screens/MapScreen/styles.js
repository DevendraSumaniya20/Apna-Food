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
    justifyContent: 'center',
    alignItems: 'center',
  },

  CustomHeaderComponentsView: {
    flex: 1,
  },

  map: {
    width: '100%',
    height: '100%',
  },
  MapTopscreen: {
    backgroundColor: colors.white,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: 'white',
  },
  MapShopImg: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  TextTopTitle: {
    fontSize: scale(14),
    fontFamily: 'NunitoSans-bold',
    margin: moderateScale(10),
  },
  MapTopscreenSecondView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ratingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  CalloutArrow: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    width: 5,
    height: 5,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.white,
  },
});

export default styles;
