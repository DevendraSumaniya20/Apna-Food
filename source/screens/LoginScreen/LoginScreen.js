import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  I18nManager,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import ImagePath from '../../constant/ImagePath';

import TextinputWithLabel from '../../components/TextinputWithLabel';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import colors from '../../assets/color/colors';
import navigationStrings from '../../constant/navigationStrings';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {moderateScale} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {toggleTheme} from '../../store/themeSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [isAr, setIsAr] = useState(false);

  const {t, i18n} = useTranslation();
  const selectLanguageCode = i18n.language;

  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

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

  const LANGUAGES = [
    {code: 'en', label: 'English'},
    {code: 'fr', label: 'Français'},
    {code: 'ar', label: 'Arabic'},
  ];

  const setLanguage = async code => {
    if (code === 'en' || code === 'fr') {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      setIsAr(false);
    } else if (code === 'ar') {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      setIsAr(true);
    } else {
      throw new Error('Invalid language code');
    }
    try {
      await i18n.changeLanguage(code);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

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
      setPasswordError('Please Enter the At least More characters');
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
    <>
      <View
        style={[
          styles.main,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <CustomHeaderComponents paddingTop={moderateScale(10)} />
        <ImageBackground
          source={ImagePath.FoodApp}
          style={styles.imageBackground}
        />

        <View style={styles.mainStyle}>
          <View style={styles.TextinputWithLabelView}>
            <TextinputWithLabel
              textAlign={isAr ? 'right' : 'left'}
              value={email}
              setValue={setEmail}
              placeholder={t('common:EnterAnEmailorPhone')}
              placeholderTextColor={
                isDarkMode ? colors.whiteOpacity80 : colors.blackOpacity80
              }
              style={{
                ...(isAr && {textAlign: 'right'}),
              }}
            />

            <View>
              {emailError && (
                <Text
                  style={[
                    styles.errorStyle,
                    isAr && styles.arSliderTextAlign,
                    isDarkMode ? '#000' : '#fff',
                  ]}>
                  {t('error:EmailError')}
                </Text>
              )}
            </View>

            <TextinputWithLabel
              textAlign={isAr ? 'right' : 'left'}
              value={password}
              setValue={setPassword}
              placeholder={t('common:EnteraPassword')}
              placeholderTextColor={
                isDarkMode ? colors.whiteOpacity80 : colors.blackOpacity80
              }
              secureTextEntry={isVisible}
              rightIcon={
                !isVisible
                  ? isDarkMode
                    ? ImagePath.showEyeWhite
                    : ImagePath.showEye
                  : isDarkMode
                  ? ImagePath.hideEyeWhite
                  : ImagePath.hideEye
              }
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
              {passwordError && (
                <Text
                  style={[
                    styles.errorStyle,
                    isAr && styles.arSliderTextAlign,
                    isDarkMode ? '#000' : '#fff',
                  ]}>
                  {t('common:PasswordError')}
                </Text>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.forgotView, isAr && styles.arSliderTextAlign]}
              onPress={() =>
                navigation.navigate(navigationStrings.FORGOTPASSWORD)
              }>
              <Text
                style={[
                  styles.forgotText,
                  isAr && styles.arSliderTextAlign,
                  isDarkMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                {t('common:ForgetPassword')}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                paddingTop: 10,
                backgroundColor: isDarkMode ? 'black' : 'white',
              }}>
              <TouchableOpacity onPress={handleToggle}>
                <Ionicons name="sunny-outline" color="red" size={30} />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
              <ButtonCustomComponents
                buttonText={t('common:Login')}
                onPress={() => LoginValidation()}
              />
            </View>
          </View>
        </View>

        <View>
          <View
            style={[
              selectLanguageCode === 'ar' && {alignItems: 'center'},
              isDarkMode && styles.darkMode,
            ]}>
            {LANGUAGES.map(lang => {
              const selectedLanguage = lang.code === selectLanguageCode;
              return (
                <Pressable
                  key={lang.code}
                  style={{marginTop: moderateScale(10)}}
                  disabled={selectedLanguage}
                  onPress={() => {
                    setLanguage(lang.code);
                  }}>
                  <Text
                    style={[
                      selectedLanguage ? styles.selectedText : styles.text,
                      isDarkMode ? {color: '#fff'} : {color: '#000'},
                    ]}>
                    {lang.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View
          style={[
            styles.bottomView,
            isAr && styles.arSliderTextAlign,
            isDarkMode
              ? {backgroundColor: '#000', color: '#fff'}
              : {backgroundColor: '#fff', color: '#000'},
          ]}>
          <Text
            style={[
              styles.newAccountText,
              isAr && styles.arSliderTextAlign,
              isDarkMode
                ? {backgroundColor: '#000', color: '#fff'}
                : {backgroundColor: '#fff', color: '#000'},
            ]}>
            {t('common:DontHaveanAccount')} {''}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.HOME);
            }}>
            <View style={styles.bottomSubView}>
              <Text
                style={[
                  styles.signUpText,
                  isAr && styles.arSliderTextAlign,

                  isDarkMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                {t('common:SignUp')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
