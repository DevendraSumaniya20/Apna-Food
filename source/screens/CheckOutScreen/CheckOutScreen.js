import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {CardField, useStripe} from '@stripe/stripe-react-native';

import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import navigationStrings from '../../constant/navigationStrings';
import styles from './styles';

const CheckOutScreen = ({navigation}) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const route = useRoute();
  const itemTitle = route.params?.itemTitle || '';
  const itemPrice = route.params?.itemPrice || '';
  const itemImage = route.params?.itemImage || '';

  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      color: '#000000',
      borderColor: '#000000',
    },
  });

  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#ffffff',
    },
  });

  const {confirmPayment} = useStripe();

  const CheckOutPayment = async () => {
    try {
      const {error} = await confirmPayment({
        clientSecret: '',
        paymentMethodId: '',
      });

      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else {
        Alert.alert('Payment Successful');
      }
    } catch (error) {
      Alert.alert('Payment Error', error.message);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.main,
        isDarkMode ? darkStyles.container : lightStyles.container,
      ]}>
      <CustomHeaderComponents
        paddingTop={moderateScale(32)}
        back={'Back'}
        label={'Payment Details'}
        onPress={() => {
          navigation.navigate(navigationStrings.HOME);
        }}
      />
      <View
        style={[
          styles.PaymentTitleView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <View
          style={[
            styles.PaymentImageView,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <Image
            resizeMode="contain"
            source={{uri: itemImage}}
            style={styles.PaymentImage}
          />
        </View>
        <Text
          style={[
            styles.PaymentTitleText,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          {itemTitle}
        </Text>
      </View>
      <View
        style={[
          styles.PaymentPriceView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <Text
          style={[
            styles.PaymentPriceText,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          ${itemPrice}
        </Text>
      </View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 424',
        }}
        cardStyle={{
          backgroundColor: isDarkMode ? '#000000' : '#ffffff',
          textColor: isDarkMode ? '#ffffff' : '#000000',
        }}
        style={[
          styles.PaymentTouchableView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}></CardField>
      <TouchableOpacity onPress={CheckOutPayment}>
        <Text
          style={[
            styles.PayNowText,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          Pay Now
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CheckOutScreen;
