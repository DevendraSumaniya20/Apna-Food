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
  flatlistColumn: {
    flexDirection: 'row',
  },

  flatListTitle: {
    fontSize: scale(14),
    fontWeight: 'bold',
    width: moderateScale(220),
  },
  flatListPrice: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  flatListMainTitle: {
    marginTop: moderateScale(12),
  },
});

export default styles;
