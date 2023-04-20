import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import ImagePath from '../../constant/ImagePath';
import styles from './style';
import TextinputWithLabel from '../../components/TextinputWithLabel';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import colors from '../../assets/color/colors';
import navigationStrings from '../../constant/navigationStrings';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {moderateScale} from 'react-native-size-matters';
import DeviceInfo from 'react-native-device-info';

const LoginScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const LoginValidation = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailMaxLength = 50;
    const passwordMaxLength = 30;
    if (!email) {
      setEmailError('Please Enter the Email');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please Enter the Proper Email');
    } else if (email.length > emailMaxLength) {
      setEmailError(`Email must be Less than ${emailMaxLength} characters`);
    } else if (!password) {
      setPasswordError('Please Enter the Password');
    } else if (password.length < 5) {
      setPasswordError(`Please Enter the At least More characters`);
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        ' Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
      );
    } else if (password.length > passwordMaxLength) {
      setPasswordError(
        `Password must be less than ${passwordMaxLength} characters`,
      );
    } else if (email === 'Devendra@gmail.com' && password === 'D123456789@d') {
      setEmailError('');
      setPasswordError('');

      navigation.navigate(navigationStrings.HOME);
    }
  };

  return (
    <View style={styles.main}>
      <CustomHeaderComponents paddingTop={moderateScale(20)} />
      <ImageBackground
        source={ImagePath.FoodApp}
        style={styles.imageBackground}></ImageBackground>
      <View style={styles.mainStyle}>
        <View style={styles.TextinputWithLabelView}>
          <TextinputWithLabel
            onchangeText={item => {
              setEmail(item);
            }}
            value={email}
            setValue={setEmail}
            placeholder="Enter an Email or Phone"
            placeholderTextColor={colors.blackOpacity30}
          />
        </View>
        <Text style={styles.errorStyle}>{emailError}</Text>
        <View style={styles.TextinputWithLabelView}>
          <TextinputWithLabel
            value={password}
            setValue={setPassword}
            placeholder="Enter a Password"
            placeholderTextColor={colors.blackOpacity30}
            secureTextEntry={isVisible}
            rightIcon={!isVisible ? ImagePath.showEye : ImagePath.hideEye}
            onPressRight={() => {
              setIsVisible(!isVisible);
            }}
            onchangeText={item => {
              setPassword(item);
            }}
          />
        </View>
        <Text style={styles.errorStyle}>{passwordError}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.forgotView}
          onPress={() => navigation.navigate(navigationStrings.FORGOTPASSWORD)}>
          <Text style={styles.forgotText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <View style={styles.buttonStyle}>
          <ButtonCustomComponents
            buttonText="Login"
            onPress={() => LoginValidation()}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.newAccountText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationStrings.HOME);
          }}>
          <View style={styles.bottomSubView}>
            <Text style={styles.signUpText}>Sign up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
