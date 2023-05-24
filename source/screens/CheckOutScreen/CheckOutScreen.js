import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import RazorpayCheckout from 'react-native-razorpay';

const CheckOutScreen = () => {
  const route = useRoute();
  const itemTitle = route.params?.itemTitle || '';
  const itemPrice = route.params?.itemPrice || '';

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
        email: 'Devendra@gmail.com',
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
    <View
      style={{
        flex: 1,
        paddingTop: moderateScale(65),
      }}>
      <Text>Item Name: {itemTitle}</Text>
      <Text>Item Price: {itemPrice}</Text>
      <View style={{paddingTop: moderateScale(50)}}>
        <TouchableOpacity onPress={CheckOutPayment}>
          <Text>Pay Now `${itemPrice}`</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckOutScreen;
