import {moderateScale, scale} from 'react-native-size-matters';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  dataMainView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row-reverse',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
  },

  flatListImage: {
    width: moderateScale(60),
    height: moderateScale(80),
  },
  flatlistFlext: {
    flexDirection: 'row',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(8),
    borderWidth: moderateScale(1),
    alignItems: 'center',
    fontFamily: 'NunitoSans-SemiBold',
  },

  flatlistSubMain: {
    padding: moderateScale(10),
    borderRadius: moderateScale(14),
    borderWidth: 1,
    marginEnd: moderateScale(24),
  },

  placeholderText: {
    textAlign: 'center',
    fontSize: scale(16),
    color: 'red',
    fontFamily: 'NunitoSans-SemiBold',
  },
  flatlistColumn: {
    flexDirection: 'row',
  },
  offlineText: {
    marginBottom: moderateScale(16),
    fontFamily: 'NunitoSans-SemiBold',
  },

  flatListTitle: {
    fontSize: scale(14),
    width: moderateScale(220),
    fontFamily: 'NunitoSans-Bold',
  },
  flatListPrice: {
    fontSize: scale(14),
    fontFamily: 'NunitoSans-Bold',
  },
  flatListMainTitle: {
    marginTop: moderateScale(12),
    fontFamily: 'NunitoSans-Bold',
  },
  offlineMessageContainer: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderWidth: 0.2,
    borderRadius: moderateScale(8),
    position: 'absolute',
    bottom: moderateScale(0),
    left: '35%',
  },

  onlineMessageContainer: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderWidth: 0.2,
    borderRadius: moderateScale(8),
    position: 'absolute',
    bottom: moderateScale(0),
    left: '35%',
  },
  onlineMessageText: {
    fontSize: scale(12),
    textAlign: 'center',
    fontFamily: 'NunitoSans-SemiBold',
  },
  offlineMessageText: {
    fontSize: scale(14),
    textAlign: 'center',
    fontFamily: 'NunitoSans-SemiBold',
  },
});

export default styles;
