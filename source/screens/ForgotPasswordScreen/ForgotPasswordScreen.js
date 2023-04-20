import {
  Alert,
  ScrollView,
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
import {scale} from 'react-native-size-matters';

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
    <ScrollView>
      <View style={styles.main}>
        <CustomHeaderComponents
          back={'Back'}
          onPress={() => {
            navigation.navigate(navigationStrings.LOGIN);
          }}
          label="Forgot Password"
        />
        <View style={styles.submain}>
          <View style={styles.ForgotPasswordView}>
            <Text style={styles.ForgotPasswordText}>Forgot Password</Text>
          </View>
          <View style={styles.ForgotPasswordTextDescView}>
            <Text style={styles.ForgotPasswordTextDesc}>
              Please Enter associated Email to verify your account
            </Text>
          </View>
          <View style={styles.MainContentView}>
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
            <View style={styles.buttonStyle}>
              <ButtonCustomComponents
                buttonText="Submit"
                onPress={handleForgotPassword}
                fontSize={scale(16)}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
