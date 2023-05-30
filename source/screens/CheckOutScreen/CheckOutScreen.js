import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert, StyleSheet, Text, View, Image} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {CardField, useStripe} from '@stripe/stripe-react-native';

import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import navigationStrings from '../../constant/navigationStrings';
import createPaymentIntent from '../../apis/StripeAPI';
import styles from './styles';

const CheckOutScreen = ({navigation, route}) => {
  const {itemTitle, itemPrice, itemImage} = route.params;

  const [cardInfo, setCardInfo] = useState(null);

  const {confirmPayment} = useStripe();

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

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

  const fetchCardDetails = cardDetails => {
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };

  const onPay = async () => {
    let apidata = {
      amount: 50 * 100,
      currency: 'INR',
    };
    try {
      const res = await createPaymentIntent(apidata);
      console.log('Payment is successful', res);

      if (res?.data?.paymentIntent) {
        let confirmPaymentIntent = confirmPayment(res?.data?.paymentIntent, {
          paymentMethodType: 'Card',
        });
        console.log('confirm Payment is successful', confirmPaymentIntent);
        Alert.alert('Payment is successfully added');
      }
    } catch (error) {
      console.log('Error while adding the payment', error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? darkStyles.container : lightStyles.container,
      ]}>
      <CustomHeaderComponents
        back={'back'}
        label={'Payment'}
        paddingTop={moderateScale(40)}
        onPress={() => {
          navigation.navigate(navigationStrings.HOME);
        }}
      />

      <View
        style={[
          styles.DisplayDetailsView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <Image
          source={{uri: itemImage}}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.itemTitle,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          {itemTitle}
        </Text>
        <Text
          style={[
            styles.itemPrice,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          {itemPrice}
        </Text>
      </View>
      <View
        style={[
          styles.cardView,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <CardField
          style={[
            styles.cardField,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
            cvc: '123',
            expiry: 'MM / YY',
          }}
          cardStyle={{
            textColor: isDarkMode ? '#ffffff' : '#000000',
            cursorColor: isDarkMode ? '#ffffff' : '#000000',
            backgroundColor: isDarkMode ? '#000000' : '#ffffff',
            fontSize: scale(14),
            fontWeight: '500',
            placeholderColor: isDarkMode ? '#ffffff' : '#000000',
            textErrorColor: '#ff0000',
            borderColor: isDarkMode ? '#ffffff' : '#000000',
            fontFamily: 'NunitoSans-SemiBold',
          }}
          onCardChange={fetchCardDetails}
        />
      </View>

      <ButtonCustomComponents
        buttonText={'Pay'}
        onPress={onPay}
        disabled={!cardInfo}
      />
    </View>
  );
};

export default CheckOutScreen;
