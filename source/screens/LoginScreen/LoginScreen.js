/* eslint-disable react/self-closing-comp */
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Button,
  Pressable,
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
import {useTranslation} from 'react-i18next';

const LoginScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const selectLanguageCode = i18n.language;

  const LANGUAGES = [
    {code: 'en', label: 'English'},
    {code: 'fr', label: 'Français'},
  ];

  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  const LoginValidation = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailMaxLength = 50;
    const passwordMaxLength = 30;
    if (!email) {
      setEmailError(t('error:EmailError'));
      alert(t('error:EmailError'));
    } else if (!emailRegex.test(email)) {
      setEmailError(t('error:EmailProper'));
      alert(t('error:EmailProper'));
    } else if (email.length > emailMaxLength) {
      setEmailError(t('error:EmailLength'));
      alert(t('error:EmailLength'));
    } else if (!password) {
      setPasswordError(t('error:PasswordError'));
      alert(t('error:PasswordError'));
    } else if (password.length < 5) {
      setPasswordError(t('error:PasswordLessCharacters'));
      alert(t('error:PasswordLessCharacters'));
    } else if (!passwordRegex.test(password)) {
      setPasswordError(t('error:PasswordRegex'));
      alert(t('error:PasswordRegex'));
    } else if (password.length > passwordMaxLength) {
      setPasswordError(t('error:PasswordLength'));
      alert(t('error:PasswordLength'));
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
          style={styles.imageBackground}></ImageBackground>
        <View style={styles.mainStyle}>
          <View style={styles.TextinputWithLabelView}>
            <TextinputWithLabel
              onchangeText={item => {
                setEmail(item);
              }}
              value={email}
              setValue={setEmail}
              placeholder={t(`common:EnterAnEmailorPhone`)}
              placeholderTextColor={colors.blackOpacity30}
            />
            <View>
              {emailError && (
                <Text style={styles.errorStyle}>
                  {t('common:EmailError')}
                  {/* {emailError} */}
                </Text>
              )}
            </View>

            <TextinputWithLabel
              value={password}
              setValue={setPassword}
              placeholder={t(`common:EnteraPassword`)}
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
          <View>
            {passwordError && (
              <Text style={styles.errorStyle}>
                {t('common:PasswordError')}
                {/* {passwordError} */}
              </Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.forgotView}
            onPress={() =>
              navigation.navigate(navigationStrings.FORGOTPASSWORD)
            }>
            <Text style={styles.forgotText}>{t('common:ForgetPassword')}</Text>
          </TouchableOpacity>
          <View style={styles.buttonStyle}>
            <ButtonCustomComponents
              buttonText={t(`common:Login`)}
              onPress={() => LoginValidation()}
            />
          </View>
        </View>
        <View>
          <View style={{alignItems: 'center'}}>
            {LANGUAGES.map(language => {
              const selectedLanguage = language.code === selectLanguageCode;
              return (
                <Pressable
                  key={language.code}
                  style={{marginTop: moderateScale(10)}}
                  disabled={selectedLanguage}
                  onPress={() => {
                    setLanguage(language.code);
                  }}>
                  <Text
                    style={[
                      selectedLanguage ? styles.selectedText : styles.text,
                    ]}>
                    {language.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.newAccountText}>
            {t('common:DontHaveanAccount')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.HOME);
            }}>
            <View style={styles.bottomSubView}>
              <Text style={styles.signUpText}>{t('common:SignUp')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
