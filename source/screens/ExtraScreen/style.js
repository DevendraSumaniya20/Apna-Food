import {moderateScale, scale} from 'react-native-size-matters';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  buttonView: {
    marginVertical: moderateScale(10),
  },
  dateView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(20),
  },
  dateText: {
    fontSize: scale(18),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    textAlign: 'center',
    width: moderateScale(250),
    paddingVertical: moderateScale(10),
  },
  selectedDateText: {
    fontSize: scale(16),
    textAlign: 'center',
  },
  imageMainView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePhotoView: {
    textAlign: 'center',
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    marginTop: moderateScale(20),
  },
  imageGalleryView: {
    textAlign: 'center',
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    marginTop: moderateScale(20),
  },
  imageMultipleGalleryView: {
    textAlign: 'center',
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  imagePhotoText: {
    textAlign: 'center',
    padding: moderateScale(4),
    fontSize: scale(14),
    fontFamily: 'NunitoSans-Bold',
  },
  imageGalleryText: {
    textAlign: 'center',
    padding: moderateScale(4),
    fontSize: scale(14),
    fontFamily: 'NunitoSans-Bold',
  },
  imageMultipleGalleryText: {
    textAlign: 'center',
    padding: moderateScale(4),
    fontSize: scale(14),
    fontFamily: 'NunitoSans-Bold',
  },
  flatListMainView: {
    marginTop: moderateScale(10),
    paddingBottom: moderateScale(100),
  },
  flatListSubView: {
    alignItems: 'center',
    padding: moderateScale(10),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    margin: moderateScale(10),
  },
  deleteButtonView: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(5),
  },
  imagePathText: {
    color: '#000',
    marginTop: moderateScale(20),
    fontFamily: 'NunitoSans-Bold',
  },
  deleteText: {
    fontSize: scale(16),
    fontFamily: 'NunitoSans-Bold',
  },

  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideo: {
    width: '100%',
    height: moderateScale(300),
    marginBottom: moderateScale(10),
  },
  remoteVideo: {
    width: '100%',
    height: moderateScale(300),
    marginBottom: moderateScale(10),
  },
  input: {
    height: moderateScale(40),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(20),
  },
  ButtonStyles: {
    backgroundColor: '#73a7f0',
    margin: moderateScale(5),
    marginHorizontal: moderateScale(20),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  buttonTextVideoCall: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#a8550c',
    padding: moderateScale(5),
    alignItems: 'center',
    fontSize: scale(16),
  },
});

export default styles;
