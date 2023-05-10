import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import colors from '../../assets/color/colors';
import ButtonCustomComponents from '../../components/ButtonCustomComponents';

import navigationStrings from '../../constant/navigationStrings';
import TextinputWithLabel from '../../components/TextinputWithLabel';
import CustomHeaderComponents from '../../components/CustomHeaderComponents';
import {moderateScale, scale} from 'react-native-size-matters';
import ImagePath from '../../constant/ImagePath';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [showError, setShowError] = useState();

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

  const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleForgotPassword = () => {
    if (email?.length === 0) {
      setShowError(t('error:EmailError'));
    } else if (email?.length > 50) {
      setShowError(t('error:Email_To_Long'));
    } else if (!EmailRegex.test(email)) {
      setShowError(t('error:EmailError'));
    } else {
      setShowError('');
      navigation.navigate(navigationStrings.HOME);
    }
  };

  const isAr = i18n.language === 'ar';
  const textAlign = isAr ? 'right' : 'left';

  return (
    <View
      style={[
        styles.main,
        isDarkMode ? darkStyles.container : lightStyles.container,
      ]}>
      <CustomHeaderComponents
        back={t('common:Back')}
        onPress={() => {
          navigation.navigate(navigationStrings.LOGIN);
        }}
        label={t('common:Forgot_Password')}
      />

      <View
        style={[
          styles.submain,
          isDarkMode ? darkStyles.container : lightStyles.container,
        ]}>
        <View style={styles.forgotPasswordView}>
          <Image
            source={ImagePath.ForgotPasswordImg}
            style={styles.forgotImg}
          />
        </View>
        <View style={styles.ForgotPasswordView}>
          <Text
            style={[
              styles.ForgotPasswordText,
              isAr && textAlign,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            {t('common:Forgot_Password')}
          </Text>
        </View>
        <View style={styles.ForgotPasswordTextDescView}>
          <Text
            style={[
              styles.ForgotPasswordTextDesc,
              isAr && textAlign,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            {t('common:ForgotPasswordTextDesc')}
          </Text>
        </View>
        <View
          style={[
            styles.MainContentView,
            isAr && textAlign,
            isDarkMode ? darkStyles.container : lightStyles.container,
          ]}>
          <TextinputWithLabel
            onchangeText={item => {
              setEmail(item);
            }}
            value={email}
            setValue={setEmail}
            placeholder={t('common:Forgot_Password_Placeholder_EmailText')}
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
            textAlign={isAr ? 'right' : 'left'}
          />
        </View>
        <View style={styles.errorStyleView}>
          <Text
            style={[
              styles.errorStyle,
              isAr && textAlign,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            {showError}
          </Text>
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <View
            style={[
              styles.buttonStyle,
              isAr && textAlign,
              isDarkMode ? darkStyles.container : lightStyles.container,
            ]}>
            <ButtonCustomComponents
              buttonText={t('common:Forgot_Password_Submit')}
              onPress={handleForgotPassword}
              fontSize={scale(16)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
