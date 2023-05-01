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
  errorText: {
    color: '#ff0000',
  },

  CustomHeaderComponentsView: {
    flex: 1,
    justifyContent: 'center',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  indicator: {
    paddingTop: moderateScale(5),
    backgroundColor: colors.white,
    borderRadius: moderateScale(5),
    alignItems: 'center',
    backgroundColor: colors.mainThemesColor,
  },
  coordinateText: {
    fontSize: scale(15),
    color: colors.white,
    fontWeight: '600',
  },

  MapTopscreen: {
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    padding: verticalScale(12),
    flex: 1,
    gap: moderateScale(15),
  },
  MapShopImg: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  TextTopTitle: {
    fontSize: scale(14),
    fontFamily: 'NunitoSans-bold',
  },
  MapTopscreenSecondView: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  ratingStyle: {
    flexDirection: 'row',
    marginTop: moderateScale(7),
  },

  starIcon: {
    width: moderateScale(13),
    height: moderateScale(13),
    marginRight: moderateScale(5),
  },

  CalloutArrow: {
    position: 'absolute',
    bottom: moderateScale(-8),
    alignSelf: 'center',
    width: moderateScale(5),
    height: moderateScale(5),
    borderLeftWidth: moderateScale(8),
    borderRightWidth: moderateScale(8),
    borderTopWidth: moderateScale(8),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.white,
  },
  FetchingDataText: {
    fontSize: scale(16),
    color: '#33C379',
  },
});

export default styles;
