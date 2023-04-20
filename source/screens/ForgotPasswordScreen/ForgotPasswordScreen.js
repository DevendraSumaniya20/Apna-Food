import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import colors from '../../assets/color/colors';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import navigation from '../../navigation';
import navigationStrings from '../../constant/navigationStrings';
import TextinputWithLabel from '../../components/TextinputWithLabel';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [showError, setShowError] = useState();

  const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleForgotPassword = () => {
    if (email?.length === 0) {
      setShowError('Please fill the Email first');
    } else if (email?.length > 50) {
      setShowError('your Email must be to long');
    } else if (!EmailRegex.test(email)) {
      setShowError('Please Fill correct Email');
    } else {
      setShowError('');
      navigation.navigate(navigationStrings.HOME);
    }
  };

  return (
    <View style={styles.main}>
      <CustomHeaderComponents
        onPress={() => {
          navigation.navigate(navigationStrings.LOGIN);
        }}
        label="Forgot Password"
      />
      <View style={styles.ForgotPasswordView}>
        <Text style={styles.ForgotPasswordText}>ForgotPassword</Text>
      </View>
      <View style={styles.ForgotPasswordTextDescView}>
        <Text style={styles.ForgotPasswordTextDesc}>
          Please Enter your Here youe account associated Email to verify your
          account
        </Text>
      </View>
      <View>
        <TextinputWithLabel
          onchangeText={item => {
            setEmail(item);
          }}
          value={email}
          setValue={setEmail}
          placeholder="Enter an Email "
          placeholderTextColor={colors.blackOpacity30}
        />
      </View>
      <View style={styles.errorStyleView}>
        <Text style={styles.errorStyle}>{showError}</Text>
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <ButtonCustomComponents
          buttonStyle={styles.buttonStyle}
          buttonText="Submit"
          onPress={handleForgotPassword}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
