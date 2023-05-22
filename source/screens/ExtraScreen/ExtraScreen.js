import {View, Button, SafeAreaView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import {moderateScale, scale} from 'react-native-size-matters';

const ExtraScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
          onConfirm={date => {
            setOpen(false);
            setDate(date);
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

      <View></View>
    </SafeAreaView>
  );
};

export default ExtraScreen;
