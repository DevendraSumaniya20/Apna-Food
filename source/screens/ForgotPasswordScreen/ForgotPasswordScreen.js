import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
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

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [showError, setShowError] = useState();

  const {t, i18n} = useTranslation();
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

  return (
    <ScrollView>
      <View style={styles.main}>
        <CustomHeaderComponents
          back={'Back'}
          onPress={() => {
            navigation.navigate(navigationStrings.LOGIN);
          }}
          label={t('common:Forgot_Password')}
        />

        <View style={styles.submain}>
          <View style={styles.forgotPasswordView}>
            <Image
              source={ImagePath.ForgotPasswordImg}
              style={styles.forgotImg}
            />
          </View>
          <View style={styles.ForgotPasswordView}>
            <Text style={styles.ForgotPasswordText}>
              {t('common:Forgot_Password')}
            </Text>
          </View>
          <View style={styles.ForgotPasswordTextDescView}>
            <Text style={styles.ForgotPasswordTextDesc}>
              {t('common:ForgotPasswordTextDesc')}
            </Text>
          </View>
          <View style={styles.MainContentView}>
            <TextinputWithLabel
              onchangeText={item => {
                setEmail(item);
              }}
              value={email}
              setValue={setEmail}
              placeholder={t('common:Forgot_Password_Placeholder_EmailText')}
              placeholderTextColor={colors.blackOpacity30}
            />
          </View>
          <View style={styles.errorStyleView}>
            <Text style={styles.errorStyle}>{showError}</Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <View style={styles.buttonStyle}>
              <ButtonCustomComponents
                buttonText={t('common:Forgot_Password_Submit')}
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
