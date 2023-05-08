import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  I18nManager,
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
import RNRestart from 'react-native-restart';

const isAr = false;

const LoginScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const {t, i18n} = useTranslation();
  const selectLanguageCode = i18n.language;

  const LANGUAGES = [
    {code: 'en', label: 'English'},
    {code: 'fr', label: 'Français'},
    {code: 'ar', label: 'Arabic'},
  ];

  const isArabicSelected = false;
  const rtlText = {
    textAlign: isArabicSelected || I18nManager.isRTL ? 'right' : 'left',
  };

  const rtlSelectedText = {
    textAlign: isArabicSelected || I18nManager.isRTL ? 'left' : 'right',
    writingDirection: isArabicSelected || I18nManager.isRTL ? 'rtl' : 'ltr',
  };

  const setLanguage = async code => {
    if (code === 'en' || code === 'fr') {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
    } else if (code === 'ar') {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
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
      setEmailError(t('error:EmailError'));
    } else if (!emailRegex.test(email)) {
      setEmailError(t('error:EmailProper'));
    } else if (email.length > emailMaxLength) {
      setEmailError(t('error:EmailLength'));
    } else if (!password) {
      setPasswordError(t('error:PasswordError'));
    } else if (password.length < 5) {
      setPasswordError(t('error:PasswordLessCharacters'));
    } else if (!passwordRegex.test(password)) {
      setPasswordError(t('error:PasswordRegex'));
    } else if (password.length > passwordMaxLength) {
      setPasswordError(t('error:PasswordLength'));
    } else if (email === 'Devendra@gmail.com' && password === 'D123456789@d') {
      setEmailError('');
      setPasswordError('');
      navigation.navigate(navigationStrings.HOME);
    }
  };
  return (
    <>
      <View style={styles.main}>
        <CustomHeaderComponents paddingTop={moderateScale(10)} />
        <ImageBackground
          source={ImagePath.FoodApp}
          style={styles.imageBackground}
        />
        <View style={styles.mainStyle}>
          <View style={styles.TextinputWithLabelView}>
            <TextinputWithLabel
              onChangeText={item => setEmail(item)}
              value={email}
              setValue={setEmail}
              placeholder={t('common:EnterAnEmailorPhone')}
              placeholderTextColor={colors.blackOpacity30}
              style={[rtlText, isAr && styles.arSliderTextAlign]}
            />
            <View>
              {emailError && (
                <Text
                  style={[
                    styles.errorStyle,
                    rtlText,
                    isAr && styles.arSliderTextAlign,
                  ]}>
                  {t('common:EmailError')}
                  {/* {emailError} */}
                </Text>
              )}
            </View>

            <TextinputWithLabel
              value={password}
              setValue={setPassword}
              placeholder={t('common:EnteraPassword')}
              placeholderTextColor={colors.blackOpacity30}
              secureTextEntry={isVisible}
              rightIcon={!isVisible ? ImagePath.showEye : ImagePath.hideEye}
              onPressRight={() => {
                setIsVisible(!isVisible);
              }}
              onChangeText={item => setPassword(item)}
              style={[rtlText, isAr && styles.arSliderTextAlign]}
            />
          </View>
          <View>
            {passwordError && (
              <Text
                style={[
                  styles.errorStyle,
                  rtlText,
                  isAr && styles.arSliderTextAlign,
                ]}>
                {t('common:PasswordError')}
                {/* {passwordError} */}
              </Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.forgotView,
              rtlText,
              isAr && styles.arSliderTextAlign,
            ]}
            onPress={() =>
              navigation.navigate(navigationStrings.FORGOTPASSWORD)
            }>
            <Text style={[styles.forgotText, rtlText]}>
              {t('common:ForgetPassword')}
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonStyle}>
            <ButtonCustomComponents
              buttonText={t('common:Login')}
              onPress={() => LoginValidation()}
              style={[rtlSelectedText, isAr && styles.arSliderTextAlign]}
            />
          </View>
        </View>
        <View>
          <View
            style={[
              selectLanguageCode === 'ar' ? styles.rtlText : null,
              [isAr && styles.arSliderTextAlign],
              {alignItems: 'center'},
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
                    // RNRestart.restart();
                  }}>
                  <Text
                    style={[
                      selectedLanguage ? styles.selectedText : styles.text,
                      rtlSelectedText,
                    ]}>
                    {lang.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={[styles.bottomView, isAr && styles.arSliderTextAlign]}>
          <Text style={[styles.newAccountText, rtlText]}>
            {t('common:DontHaveanAccount')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.HOME);
            }}>
            <View style={styles.bottomSubView}>
              <Text style={[styles.signUpText, rtlText]}>
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
