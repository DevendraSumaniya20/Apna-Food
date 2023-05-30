import {moderateScale, scale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DisplayDetailsView: {
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(5),
    alignItems: 'center',
    borderWidth: 1,
    padding: moderateScale(25),
    borderRadius: moderateScale(8),
  },
  itemTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    paddingBottom: moderateScale(25),
    marginTop: moderateScale(10),
  },
  itemPrice: {
    fontSize: scale(16),
    fontWeight: '700',
  },
  itemImage: {
    height: moderateScale(100),
    width: moderateScale(100),
  },

  cardField: {
    padding: moderateScale(20),
  },
  cardView: {
    borderBottomWidth: 1,
    marginBottom: moderateScale(30),
    marginTop: moderateScale(30),
  },
});

export default styles;
