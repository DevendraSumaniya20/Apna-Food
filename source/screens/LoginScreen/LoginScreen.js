import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ImagePath from '../../constant/ImagePath';
import TextinputWithLabel from '../../components/TextinputWithLabel';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';
import navigationStrings from '../../constant/navigationStrings';
import {moderateScale} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {toggleTheme} from '../../store/themeSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Moon, Sun} from '../../constant/iconPath';

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
      setEmailError(t('common:EmailError'));
    } else if (!emailRegex.test(email)) {
      setEmailError(t('common:EmailProper'));
    } else if (email.length > emailMaxLength) {
      setEmailError(t('common:EmailLength'));
    } else if (!password) {
      setPasswordError(t('common:PasswordError'));
    } else if (password.length < 5) {
      setPasswordError(t('common:PasswordLessCharacters'));
    } else if (!passwordRegex.test(password)) {
      setPasswordError(t('common:PasswordRegex'));
    } else if (password.length > passwordMaxLength) {
      setPasswordError(t('common:PasswordLength'));
    } else if (email === 'Devendra@gmail.com' && password === 'D123456789@d') {
      setEmailError('');
      setPasswordError('');
      navigation.navigate(navigationStrings.HOME);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View
          style={[
            styles.main,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <ImageBackground
            source={ImagePath.FoodApp}
            style={styles.imageBackground}
          />
          <View
            style={{
              padding: moderateScale(10),
              backgroundColor: isDarkMode ? 'black' : 'white',
              flexDirection: 'row-reverse',
            }}>
            <TouchableOpacity onPress={handleToggle}>
              {isDarkMode ? (
                <Moon
                  height={30}
                  width={30}
                  fill={isDarkMode ? '#fff' : '#000'}
                />
              ) : (
                <Sun
                  height={30}
                  width={30}
                  fill={isDarkMode ? '#000' : '#fff'}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.mainStyle}>
            <View style={styles.TextinputWithLabelView}>
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

              <View style={styles.buttonStyle}>
                <ButtonCustomComponents
                  buttonText={t('common:Login')}
                  onPress={() => {
                    LoginValidation();
                  }}
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
                navigation.navigate(navigationStrings.SIGNUP);
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
          <View
            style={[isDarkMode ? darkStyles.container : lightStyles.container]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.EXTRASCREEN);
              }}>
              <Text
                style={[
                  isDarkMode ? darkStyles.container : lightStyles.container,
                ]}>
                Go to ExtraScreen
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
