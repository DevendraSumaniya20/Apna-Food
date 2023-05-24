import {moderateScale, scale} from 'react-native-size-matters';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  PaymentImageView: {
    width: scale(80),
    height: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: moderateScale(30),
    borderRadius: scale(10),
  },
  PaymentImage: {
    width: scale(60),
    height: scale(60),
  },

  PaymentTitleView: {
    alignItems: 'center',
    paddingTop: moderateScale(10),
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
    borderWidth: 1,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    marginTop: moderateScale(60),
  },
  PaymentTitleText: {
    fontSize: scale(18),
  },
  PaymentPriceView: {
    alignItems: 'center',
    paddingTop: moderateScale(10),
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  PaymentPriceText: {
    fontSize: scale(14),
  },
  PaymentTouchableView: {
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    marginTop: moderateScale(180),
  },
  PayNowText: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});

export default styles;
