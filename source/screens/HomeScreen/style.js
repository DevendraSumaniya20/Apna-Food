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
  },
  flatlistColumn: {
    flexDirection: 'row',
  },
  offlineText: {
    marginBottom: moderateScale(16),
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
    backgroundColor: 'red',
    padding: moderateScale(5),
    alignItems: 'center',
  },

  onlineMessageContainer: {
    backgroundColor: 'green',
    padding: moderateScale(5),
    alignItems: 'center',
  },
});

export default styles;
