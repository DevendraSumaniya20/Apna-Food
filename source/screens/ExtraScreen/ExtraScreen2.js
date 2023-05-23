import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DemoSectionlist from '../../components/Sectionlist';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {moderateScale} from 'react-native-size-matters';
import navigationStrings from '../../constant/navigationStrings';

const ExtraScreen2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeaderComponents
        paddingTop={moderateScale(32)}
        back={'Back'}
        label={'SectionList'}
        onPress={() => {
          navigation.navigate(navigationStrings.LOGIN);
        }}
      />
      <DemoSectionlist />
    </View>
  );
};

export default ExtraScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
