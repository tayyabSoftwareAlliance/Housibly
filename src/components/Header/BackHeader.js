import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {WP, size, colors, family, appIcons} from '../../shared/exporter';

export const BackHeader = ({
  title,
  boxIcon,
  subtitle,
  rightIcon,
  isBox = false,
  txtCenter = false,
  txtSize = size.h6,
  txtFamily = family.Gilroy_Bold,
  tintColor = colors.b1,
  onPressRight,
  containerStyle
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.mainContainer,containerStyle]}>
      <View style={styles.mainRowContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.rowContainer}>
          <Image
            resizeMode="contain"
            source={appIcons.backArrow}
            style={[styles.iconStyle, {tintColor: tintColor}]}
          />
          {title && (
            <Text
              style={styles.titleTxtStyle(
                isBox,
                txtCenter,
                txtSize,
                txtFamily,
              )}>
              {title}
            </Text>
          )}
        </TouchableOpacity>
        <View style={styles.center}>
          {subtitle && <Text style={styles.subStyle}>{subtitle}</Text>}
        </View>
        <View>{rightIcon}</View>
        {isBox && (
          <TouchableOpacity
            onPress={onPressRight}
            activeOpacity={0.7}
            style={styles.boxStyle}>
            {boxIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP('3.85'),
  },
  mainRowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: WP('5'),
    height: WP('5'),
  },
  titleTxtStyle: (isBox, isCenter, txtSize, txtFamily) => {
    return {
      width: isBox ? '80%' : '88%',
      left: WP('3.6'),
      color: colors.b1,
      fontSize: txtSize,
      fontFamily: txtFamily,
      textAlign: isCenter ? 'center' : 'left',
    };
  },
  center: {
    paddingRight: 20,
  },
  subStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
    color: colors.b1,
  },
  boxStyle: {
    borderRadius: 8,
    width: WP('8.2'),
    height: WP('8.2'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.p2,
  },
});
