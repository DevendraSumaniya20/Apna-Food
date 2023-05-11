import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/color/colors';

const TextinputWithLabel = ({
  label,
  placeholder,
  onChangeText,
  placeholderTextColor,
  props,
  secureTextEntry,
  rightIcon,
  onPressRight,
  value,
  setValue,
  textAlign,
}) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const containerStyles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#fff' : '#000',
      borderBottomWidth: 1,
      tintColor: isDarkMode ? '#fff' : '#000',
    },
  });

  const inputStyles = StyleSheet.create({
    inlineStyle: {
      paddingVertical: moderateScale(7),
      paddingLeft: moderateScale(1),
      paddingTop: verticalScale(5),
      fontSize: scale(14),
      flex: 1,
      fontFamily: 'NunitoSans-Bold',
      color: isDarkMode ? '#fff' : '#000',
    },
  });

  const labelStyles = StyleSheet.create({
    labelTextStyle: {
      fontSize: scale(14),
      marginTop: moderateScale(14),
      fontFamily: 'NunitoSans-SemiBold',
      color: isDarkMode ? '#fff' : '#000',
    },
  });
  const placeholderTextColorStyle = StyleSheet.create({
    placeholderTextColorStyle: {
      fontFamily: 'NunitoSans-SemiBold',
      color: isDarkMode ? '#fff' : '#000',
    },
  });

  return (
    <View style={[styles.inputStyle, containerStyles.container]}>
      <Text
        style={[
          styles.labelTextStyle,
          labelStyles.labelTextStyle,
          placeholderTextColorStyle.placeholderTextColorStyle,
        ]}>
        {label}
      </Text>

      <View style={styles.flexView}>
        <TextInput
          placeholder={placeholder}
          style={[styles.inlineStyle, inputStyles.inlineStyle]}
          textAlign={textAlign}
          {...props}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          value={value}
          setValue={setValue}
        />
        {!!rightIcon ? (
          <TouchableOpacity onPress={onPressRight}>
            <Ionicons name={rightIcon} size={20} color={placeholderTextColor} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default TextinputWithLabel;

const styles = StyleSheet.create({
  inputStyle: {
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    paddingTop: verticalScale(6),
  },
  inlineStyle: {
    fontFamily: 'NunitoSans-Bold',
  },
  labelTextStyle: {
    fontFamily: 'NunitoSans-SemiBold',
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
});
