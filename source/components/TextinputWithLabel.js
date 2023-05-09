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
import colors from '../assets/color/colors';

let isAr = false;

const TextinputWithLabel = ({
  label,
  placeholder,
  onchangeText,
  placeholderTextColor,
  props,
  secureTextEntry,
  rightIcon,
  onPressRight,
  value,
  setValue,
  textAlign,
}) => {
  return (
    <View style={styles.inputStyle}>
      <Text style={styles.labelTextStyle}>{label} </Text>

      <View style={styles.flexView}>
        <TextInput
          placeholder={placeholder}
          style={styles.inlineStyle}
          textAlign={textAlign}
          {...props}
          onChangeText={onchangeText}
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
            <Image source={rightIcon} style={styles.image} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default TextinputWithLabel;

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    paddingTop: verticalScale(6),
    color: colors.black,
  },
  inlineStyle: {
    paddingVertical: moderateScale(7),
    paddingLeft: moderateScale(1),
    paddingTop: verticalScale(5),
    fontSize: scale(14),
    flex: 1,
    fontFamily: 'NunitoSans-Bold',
    color: colors.black,
  },
  labelTextStyle: {
    color: colors.blackOpacity50,
    fontSize: scale(14),
    marginTop: moderateScale(14),
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
    tintColor: colors.blackOpacity80,
  },
});
