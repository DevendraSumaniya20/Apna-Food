import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import navigationStrings from '../../constant/navigationStrings';

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
      <Text>FirebaseScreen</Text>
    </View>
  );
};

export default FirebaseScreen;
