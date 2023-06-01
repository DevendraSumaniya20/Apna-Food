import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import navigationStrings from '../../constant/navigationStrings';
import {scale} from 'react-native-size-matters';

const FirebaseScreen = ({navigation}) => {
  return (
    <View>
      <CustomHeaderComponents
        back={'back'}
        label={'Firebase'}
        onPress={() => {
          navigation.navigate(navigationStrings.HOME);
        }}
      />
      <Text style={{fontSize: scale(50), color: '#854712'}}>
        FirebaseScreen
      </Text>
    </View>
  );
};

export default FirebaseScreen;
