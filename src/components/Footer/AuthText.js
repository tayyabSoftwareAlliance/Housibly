import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, family, size, WP} from '../../shared/exporter';

export const AuthFooter = ({title, subtitle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.txtStyle}>
        {title} <Text style={styles.subTxtStyle}>{subtitle}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txtStyle: {
    alignSelf: 'center',
    paddingVertical: WP('4'),
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    color: colors.b1,
  },
  subTxtStyle: {
    color: colors.p2,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
    textDecorationLine: 'underline',
  },
});
