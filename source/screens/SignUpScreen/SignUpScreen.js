import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {moderateScale} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import TextinputWithLabel from '../../components/TextinputWithLabel';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import navigationStrings from '../../constant/navigationStrings';
import ImagePath from '../../constant/ImagePath';

import firebase from '../../auth/FirebaseAuth';

const SignUpScreen = ({navigation}) => {
  const [isAr, setIsAr] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [username, setUsername] = useState();
  const [usernameError, setUsernameError] = useState();
  const [isVisible, setIsVisible] = useState(true);

  const {t, i18n} = useTranslation();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  });

  const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      color: '#ffffff',
    },
  });

  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyAXhdAy3iEt_HdNAW4RnYa3DN_1E7Ki-lI',
      authDomain: 'apna-food-c8049.firebaseapp.com',
      projectId: 'apna-food-c8049',
      storageBucket: 'apna-food-c8049.appspot.com',
      messagingSenderId: '80890309219',
      appId: '1:80890309219:web:5f80ac9abf90d4e6b26656',
      measurementId: 'G-2HZPMWP96H',
    });
  }

  const LoginValidation = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const emailMaxLength = 50;
    const passwordMaxLength = 30;
    const usernameMaxLength = 50;

    setEmailError('');
    setPasswordError('');
    setUsernameError('');

    if (!email) {
      setEmailError(t('common:EmailError'));
    } else if (!emailRegex.test(email)) {
      setEmailError(t('common:EmailProper'));
    } else if (email.length > emailMaxLength) {
      setEmailError(t('common:EmailLength'));
    } else if (!password) {
      setPasswordError(t('common:PasswordError'));
    } else if (password.length < 3) {
      setPasswordError(t('common:PasswordLessCharacters'));
    } else if (!passwordRegex.test(password)) {
      setPasswordError(t('common:PasswordRegex'));
    } else if (password.length > passwordMaxLength) {
      setPasswordError(t('common:PasswordLength'));
    } else if (!username) {
      setUsernameError(t('common:usernameError'));
    } else if (username.length > usernameMaxLength) {
      setUsernameError(t('common:usernameMaxlength'));
    } else {
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        const {user} = userCredential;
        console.log('User registered:', user);
        navigation.navigate(navigationStrings.HOME);
      } catch (error) {
        console.log('User registration error:', error);
      }
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View
          style={[
            styles.main,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <CustomHeaderComponents
            paddingTop={moderateScale(50)}
            back={t('common:Back')}
            label={t('common:SignUp')}
            onPress={() => {
              navigation.navigate(navigationStrings.LOGIN);
            }}
          />
          <View style={styles.SignUpView}>
            <Image source={ImagePath.SingUpImage} style={styles.SignupImage} />
          </View>
          <View
            style={[
              styles.WelcomeTextView,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            <Text
              style={[
                styles.WelcomeText,
                isDarkMode ? darkStyles.container : lightStyles.container,
              ]}>
              {t('common:SignUpWelcomeText')}
            </Text>
          </View>
          <View style={styles.SignUpMainView}>
            <TextinputWithLabel
              textAlign={isAr ? 'right' : 'left'}
              value={email}
              onChangeText={setEmail}
              placeholder={t('common:EnterAnEmailorPhone')}
              placeholderTextColor={isDarkMode ? '#fff' : '#000'}
              style={{
                ...(isAr && {textAlign: 'right'}),
              }}
            />

            <View>
              {emailError ? (
                <Text
                  style={[
                    styles.errorStyle,
                    isAr && styles.arSliderTextAlign,
                    isDarkMode ? '#000' : '#fff',
                  ]}>
                  {emailError}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.successStyle,
                    isAr && styles.arSliderTextAlign,
                    isDarkMode ? '#000' : '#fff',
                  ]}>
                  {''}
                </Text>
              )}
            </View>

            <TextinputWithLabel
              textAlign={isAr ? 'right' : 'left'}
              value={password}
              placeholder={t('common:EnteraPassword')}
              placeholderTextColor={isDarkMode ? '#fff' : '#000'}
              secureTextEntry={isVisible}
              rightIcon={isVisible ? 'eye-off-outline' : 'eye-outline'}
              style={{
                flexDirection: (isAr && 'row-reverse') || 'row',
                ...(isAr && {justifyContent: 'flex-end'}),
              }}
              onPressRight={() => {
                setIsVisible(!isVisible);
              }}
              onChangeText={item => setPassword(item)}
            />

            <View>
              {passwordError ? (
                <Text
                  style={[
                    styles.errorStyle,
                    isAr && styles.arSliderTextAlign,
                    isDarkMode ? '#000' : '#fff',
                  ]}>
                  {passwordError}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.successStyle,
                    isAr && styles.arSliderTextAlign,
                    isDarkMode ? '#000' : '#fff',
                  ]}>
                  {''}
                </Text>
              )}
            </View>
            <TextinputWithLabel
              textAlign={isAr ? 'right' : 'left'}
              value={username}
              onChangeText={setUsername}
              placeholder={t('common:username')}
              placeholderTextColor={isDarkMode ? '#fff' : '#000'}
              style={{
                ...(isAr && {textAlign: 'right'}),
              }}
            />

            <View>
              {usernameError ? (
                <Text
                  style={[
                    styles.errorStyle,
                    isAr && styles.arSliderTextAlign,
                    isDarkMode ? '#000' : '#fff',
                  ]}>
                  {usernameError}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.successStyle,
                    isAr && styles.arSliderTextAlign,
                    isDarkMode ? '#000' : '#fff',
                  ]}>
                  {''}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.buttonStyle}>
            <ButtonCustomComponents
              buttonText={t('common:SignUp')}
              onPress={() => {
                LoginValidation();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUpScreen;
