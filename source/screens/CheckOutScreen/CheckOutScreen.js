import {CardField, useStripe, createToken} from '@stripe/stripe-react-native';

import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import navigationStrings from '../../constant/navigationStrings';
import createPaymentIntent from '../../apis/StripeAPI';

const CheckOutScreen = ({navigation, route}) => {
  const {itemTitle, itemPrice, itemImage} = route.params;

  const [cardInfo, setCardInfo] = useState(null);

  const {confirmPayment} = useStripe();

  const fetchCardDetails = cardDetails => {
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };

  const onPay = async () => {
    let apidata = {
      amount: 50,
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
    <View style={{flex: 1}}>
      <CustomHeaderComponents
        back={'back'}
        label={'Payment'}
        paddingTop={moderateScale(40)}
        onPress={() => {
          navigation.navigate(navigationStrings.HOME);
        }}
      />

      <View>
        <Text>Item Title: {itemTitle}</Text>
        <Text>Item Price: {itemPrice}</Text>
        <Image source={{uri: itemImage}} />
      </View>
      <View style={{paddingTop: moderateScale(25)}}>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderColor: '#ff0000',
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 16,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            placeholderColor: '#999999',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            fetchCardDetails(cardDetails);
          }}
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
