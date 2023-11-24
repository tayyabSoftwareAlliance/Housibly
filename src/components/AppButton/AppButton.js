import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {WP, size, colors, family, appIcons} from '../../shared/exporter';

const AppButton = ({
  title,
  onPress,
  width = '100%',
  height = WP('11.7'),
  bgColor = colors.p2,
  textColor = colors.white,
  style,
  icon,
  textStyle,
  borderRadius = 40,
  borderColor,
  shadowColor = colors.p1,
  fontSize = size.large,
  marginVertical,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.buttonStyle(
        width,
        height,
        bgColor,
        borderRadius,
        borderColor,
        shadowColor,
        marginVertical,
      )}>
      {icon && <Image source={icon} style={[styles.imgStyle, style]} />}
      <Text style={[styles.buttonTextStyle(textColor, fontSize), textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: (
    width,
    height,
    bgColor,
    borderRadius,
    borderColor,
    shadowColor,
    marginVertical,
  ) => {
    return {
      width: width,
      borderRadius: borderRadius || 40,
      height: height,
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: bgColor,
      shadowColor: shadowColor || colors.white,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
      borderWidth: 1,
      marginVertical: marginVertical || 5,
      borderColor: borderColor || colors.p1,
    };
  },
  imgStyle: {
    marginRight: 15,
  },
  buttonTextStyle: (textColor, fontSize) => {
    return {
      color: textColor,
      fontSize: fontSize,
      fontFamily: family.Gilroy_SemiBold,
    };
  },
});

export {AppButton};
