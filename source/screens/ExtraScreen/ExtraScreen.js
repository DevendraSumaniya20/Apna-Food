import React, {useState} from 'react';
import {
  View,
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {moderateScale, scale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import styles from './style';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {useTranslation} from 'react-i18next';
import navigationStrings from '../../constant/navigationStrings';

const ExtraScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const {t} = useTranslation();

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      color: '#000000',
      borderColor: '#000',
    },
  });

  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#fff',
    },
  });

  const takePhotoFromGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        waitAnimationEnd: true,
        useFrontCamera: true,
      });
      setSelectedImages([image]);
    } catch (error) {
      console.error(error);
    }
  };

  const takeMultiplePhotoFromGallery = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
      });
      setSelectedImages([...images]);
    } catch (error) {
      console.error(error);
    }
  };

  const takePhotoFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      setSelectedImages([image]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteImage = index => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <SafeAreaView
      style={[
        styles.main,
        isDarkMode ? darkStyles.container : lightStyles.container,
      ]}>
      <CustomHeaderComponents
        paddingTop={moderateScale(32)}
        back={t('common:Back')}
        label={t('common:Extra')}
        onPress={() => {
          navigation.navigate(navigationStrings.LOGIN);
        }}
      />

      <View
        style={[
          styles.buttonView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <View
          style={[
            styles.dateView,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text
              style={[
                styles.dateText,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              Add Your Favorite Date
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          androidVariant="iosClone"
          open={open}
          date={date}
          title={'Select the date'}
          textColor={isDarkMode ? '#fff' : '#000'}
          onConfirm={selectedDate => {
            setOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: '5%',
            marginVertical: moderateScale(20),
          }}>
          <Text
            style={[
              styles.selectedDateText,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            Your Selected Date is: {date.toDateString()}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.imageMainView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <View
          style={[
            styles.imagePhotoView,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <TouchableOpacity onPress={takePhotoFromCamera}>
            <Text
              style={[
                styles.imagePhotoText,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              Take a Photo
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.imageGalleryView,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <TouchableOpacity onPress={takePhotoFromGallery}>
            <Text
              style={[
                styles.imageGalleryText,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              Photo From Gallery
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.imageMultipleGalleryView,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <TouchableOpacity onPress={takeMultiplePhotoFromGallery}>
            <Text
              style={[
                styles.imageMultipleGalleryText,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              Get Multiple Photos From Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.flatListMainView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <FlatList
          data={selectedImages}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={[
                styles.flatListSubView,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              <Image
                source={{uri: item.path}}
                style={{width: 150, height: 150}}
              />
              <Text
                style={[
                  styles.imagePathText,
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}>
                {item.path ? item.path.split('/').pop() : ''}
              </Text>
              <TouchableOpacity
                style={[
                  styles.deleteButtonView,
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}
                onPress={() => deleteImage(index)}>
                <Text
                  style={[
                    styles.deleteText,
                    isDarkMode ? darkStyles.container : lightStyles.container,
                  ]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{alignItems: 'center'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExtraScreen;
