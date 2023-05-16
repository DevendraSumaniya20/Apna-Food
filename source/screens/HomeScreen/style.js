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
  FlatlistTopMain: {
    flexDirection: 'column',
    width: '80%',
  },
  flatlistInnerView: {
    paddingTop: moderateScale(10),
    flexDirection: 'row',
  },
  flatlistSubMain: {
    flexDirection: 'row',
  },
  flatlistPriceView: {
    flexDirection: 'column',
  },
  flatListText: {
    fontSize: scale(18),
  },
  flatListTitle: {
    fontSize: scale(16),
  },
  flatListPrice: {
    fontSize: scale(14),
  },
});

export default styles;
