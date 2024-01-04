import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { colors, WP, family, size, appIcons } from '../../shared/exporter';

export const ChatPopupModal = ({ image, title, subtitle,buttontitle, show, onPressHide,buttonLoader,onButtonPress }) => {
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.crossIconView}
          onPress={() => onPressHide()}>
          <Image
            resizeMode="contain"
            source={appIcons.crossIcon}
            style={styles.crossIconStyle}
          />
        </TouchableOpacity>
        <Image source={image} style={styles.imgStyle} />
        <Text style={styles.nameTxtStyle}>{title || 'N/A'}</Text>
        <Text style={styles.removeTxtStyle}>{subtitle}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={onButtonPress}>
          {buttonLoader ?
            <ActivityIndicator color={colors.white} /> :
            <Text style={styles.btnTxtStyle}>{buttontitle}</Text>
          }
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 8,
    paddingTop: WP('3.5'),
    backgroundColor: 'white',
    marginHorizontal: WP('5'),
    paddingHorizontal: WP('3.5'),
  },
  crossIconView: {
    width: WP('5'),
    height: WP('5'),
    alignSelf: 'flex-end',
  },
  crossIconStyle: {
    width: WP('2'),
    height: WP('4'),
    alignSelf: 'flex-end',
  },
  iconContainer: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.g11,
  },
  imgStyle: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: 15,
    alignSelf: 'center',
  },
  nameTxtStyle: {
    color: colors.b1,
    fontSize: size.h6,
    alignSelf: 'center',
    paddingTop: WP('4'),
    fontFamily: family.Gilroy_SemiBold,
    textTransform: 'capitalize'
  },
  companyTxtStyle: {
    color: colors.b1,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: size.tiny,
    paddingTop: WP('1.5'),
    fontFamily: family.Gilroy_SemiBold,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: WP('2.5'),
    justifyContent: 'center',
  },
  smallTxtStyle: {
    color: colors.g23,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  bedIconStyle: {
    width: 14,
    height: 9,
    marginRight: 3,
  },
  bathIconStyle: {
    width: 11,
    height: 11,
    marginLeft: 8,
    marginRight: 4,
  },
  starIconStyle: {
    width: WP('3'),
    height: WP('3'),
  },
  ratingTxtStyle: {
    top: 1.2,
    paddingLeft: 5,
    color: colors.g17,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  removeTxtStyle: {
    color: colors.b1,
    marginTop: WP(4),
    alignSelf: 'center',
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  buttonStyle: {
    borderRadius: 15,
    width: WP('28.7'),
    height: WP('7.8'),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WP(5),
    marginBottom: WP(6),
    justifyContent: 'center',
    backgroundColor: colors.r1,
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
});
