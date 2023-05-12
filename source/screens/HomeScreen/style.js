import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import colors from '../../assets/color/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(10),
  },

  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.locationBackGroundColor,
    borderRadius: moderateScale(8),
    padding: moderateScale(8),
  },
  locationIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
  },

  subMain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.HomeScreenViewColor,
    padding: moderateScale(12),
    margin: verticalScale(10),
    borderRadius: moderateScale(7),
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: moderateScale(8),
      width: moderateScale(1),
    },
    shadowOpacity: moderateScale(0.1),
    gap: moderateScale(30),
  },

  imageContainer: {
    paddingRight: moderateScale(20),
  },

  imageTitile: {
    fontSize: scale(14),
    fontWeight: '500',
    color: colors.black,
    fontFamily: 'NunitoSans-SemiBold',
    textTransform: 'capitalize',
  },
  starIcon: {
    width: moderateScale(12),
    height: moderateScale(12),
    marginRight: moderateScale(5),
  },
  ratingContainer: {
    marginTop: moderateScale(8),
    flexDirection: 'row',
  },
  titleAndRatingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  FlatListDataStyle: {
    flex: 1,
  },

  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessageText: {
    fontSize: scale(16),
    color: 'red',
    textAlign: 'center',
  },
  noDataMessageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataMessageText: {
    fontSize: scale(16),
    color: 'gray',
    textAlign: 'center',
  },
  userContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
});

export default styles;
