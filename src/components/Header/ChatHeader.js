import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  WP,
  size,
  colors,
  family,
  appImages,
  appIcons,
  platformOrientedCode,
} from '../../shared/exporter';
import {Icon} from 'react-native-elements';

export const ChatHeader = ({rightIcon = false, onPressIcon}) => {
  const navigation = useNavigation();

  return (
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              source={appIcons.backArrow}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <Image
            resizeMode="contain"
            source={appImages.person3}
            style={styles.personImgStyle}
          />
          <Text style={styles.nameTxtStyle}>Aspen Franci</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressIcon}>
          <Icon
            name={'dots-three-horizontal'}
            type={'entypo'}
            size={22}
            color={colors.b1}
          />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: WP('1'),
    paddingHorizontal: WP('3.85'),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingTop: platformOrientedCode(WP('4'), WP('2')),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: WP('5'),
    height: WP('5'),
  },
  personImgStyle: {
    width: WP('8'),
    height: WP('8'),
    marginHorizontal: WP('3'),
  },
  nameTxtStyle: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
});
