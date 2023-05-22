import React, {useState} from 'react';
import {
  View,
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {moderateScale, scale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';

const ExtraScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

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
    <SafeAreaView style={{flex: 1}}>
      <View style={{marginVertical: moderateScale(10)}}>
        <Button title="Add Your Favorite Date" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          androidVariant="iosClone"
          open={open}
          date={date}
          title={'Select the date'}
          textColor={'#258'}
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
          <Text style={{fontSize: scale(16), color: '#650235'}}>
            Your Selected Date is: {date.toDateString()}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={takePhotoFromCamera}>
          <Text>Take a Photo</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={takePhotoFromGallery}>
          <Text>Photo From Gallery</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={takeMultiplePhotoFromGallery}>
          <Text>Get Multiple Photos From Gallery</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectedImages}
        renderItem={({item, index}) => (
          <View key={index} style={{alignItems: 'center'}}>
            <Image
              source={{uri: item.path}}
              style={{width: 200, height: 200}}
            />
            <Text style={{color: '#000', marginTop: moderateScale(20)}}>
              {item.path ? item.path.split('/').pop() : ''}
            </Text>
            <TouchableOpacity
              style={{
                borderColor: '#000',
                borderWidth: 1,
                borderRadius: 20,
                color: '#652358',
                marginTop: moderateScale(10),
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(5),
              }}
              onPress={() => deleteImage(index)}>
              <Text
                style={{
                  fontSize: scale(18),
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </SafeAreaView>
  );
};

export default ExtraScreen;
