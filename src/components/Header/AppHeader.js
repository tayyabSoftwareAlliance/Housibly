import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
  WP,
  size,
  colors,
  family,
  appLogos,
} from '../../shared/exporter';

export const AppHeader = ({ rightIcon = false, onPressIcon, img }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        <Image
          resizeMode="contain"
          source={appLogos.appLogo}
          style={styles.logoIconStyle}
        />
        <Text style={styles.logoTxtStyle}>Housibly</Text>
      </View>
      {rightIcon && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPressIcon}>
          <Image
            resizeMode="contain"
            source={{ uri: img }}
            style={styles.personImgStyle}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: WP('1.5'),
    paddingHorizontal: WP('3.85'),
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconStyle: {
    width: WP('6.4'),
    height: WP('6'),
  },
  logoTxtStyle: {
    left: WP('2.3'),
    color: colors.b1,
    fontSize: size.xxlarge,
    fontFamily: family.Gilroy_Bold,
  },
  personImgStyle: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.g1,
    resizeMode: 'cover',
  },
});
