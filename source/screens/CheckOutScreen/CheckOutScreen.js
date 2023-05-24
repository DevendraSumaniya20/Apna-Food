import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';
import styles from './styles';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import navigationStrings from '../../constant/navigationStrings';

const CheckOutScreen = ({navigation}) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const route = useRoute();
  const itemTitle = route.params?.itemTitle || '';
  const itemPrice = route.params?.itemPrice || '';

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

  const CheckOutPayment = () => {
    var options = {
      description: 'Credits towards consultation',
      image: require('../../assets/images/PayMentLogo.png'),
      currency: 'INR',
      key: 'rzp_test_Lm7ibPqVuPkBtp',
      amount: `500`,
      name: 'Apna food',
      order_id: '',
      prefill: {
        email: 'Devendra2525@gmail.com',
        contact: '9876541232',
        name: 'Devendra sumaniya',
      },
      theme: {color: '#584742'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
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
      <View
        style={[
          styles.PaymentTouchableView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <TouchableOpacity onPress={CheckOutPayment}>
          <Text
            style={[
              styles.PayNowText,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckOutScreen;
